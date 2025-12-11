import { v4 as uuid } from "uuid";
import { getSqlClient } from "../../config/sqlClient";
import { MediaService } from "../media/media.service";
import type { GalleryPhoto, GalleryUpdatePayload } from "./gallery.types";

const TABLE = "page_gallery_items";

export class GalleryService {
  private mediaService = new MediaService();
  private tableReady = false;

  private async ensureTable() {
    if (this.tableReady) return;
    const db = getSqlClient();
    const hasTable = await db.schema.hasTable(TABLE);
    if (!hasTable) {
      await db.schema.createTable(TABLE, (table) => {
        table.uuid("id").primary();
        table.string("slug").notNullable().index();
        table
          .uuid("media_id")
          .notNullable()
          .references("id")
          .inTable("media_assets")
          .onDelete("CASCADE");
        table.string("media_url").notNullable();
        table.string("caption");
        table.integer("display_order").notNullable().defaultTo(0);
        table.boolean("is_active").notNullable().defaultTo(true);
        table
          .timestamp("created_at", { useTz: true })
          .notNullable()
          .defaultTo(db.fn.now());
        table
          .timestamp("updated_at", { useTz: true })
          .notNullable()
          .defaultTo(db.fn.now());
      });
    }
    this.tableReady = true;
  }

  private mapRow(row: any): GalleryPhoto {
    return {
      id: row.id,
      slug: row.slug,
      mediaId: row.media_id,
      mediaUrl: row.media_url,
      caption: row.caption,
      displayOrder: row.display_order,
      isActive: row.is_active,
      createdAt: row.created_at?.toISOString?.() ?? row.created_at,
      updatedAt: row.updated_at?.toISOString?.() ?? row.updated_at,
    };
  }

  async listPhotos(slug: string, opts?: { includeInactive?: boolean }) {
    await this.ensureTable();
    const db = getSqlClient();
    let query = db(TABLE).where({ slug }).orderBy("display_order", "asc");
    if (!opts?.includeInactive) {
      query = query.andWhere({ is_active: true });
    }
    const rows = await query.orderBy("created_at", "desc");
    return rows.map((row) => this.mapRow(row));
  }

  async addPhoto(slug: string, file: Express.Multer.File, caption?: string) {
    await this.ensureTable();
    const db = getSqlClient();
    const media = await this.mediaService.recordUpload(file, caption);

    const [{ next_order }] = await db(TABLE)
      .where({ slug })
      .max("display_order as next_order");

    const displayOrder = (next_order ?? -1) + 1;

    const [row] = await db(TABLE)
      .insert({
        id: uuid(),
        slug,
        media_id: media.id,
        media_url: media.url,
        caption: caption ?? media.description ?? null,
        display_order: displayOrder,
        is_active: true,
      })
      .returning("*");

    return this.mapRow(row);
  }

  async updatePhoto(
    slug: string,
    photoId: string,
    payload: GalleryUpdatePayload
  ) {
    await this.ensureTable();
    const db = getSqlClient();
    const patch: Record<string, unknown> = { updated_at: db.fn.now() };

    if (payload.caption !== undefined) {
      patch.caption = payload.caption;
    }
    if (payload.displayOrder !== undefined) {
      patch.display_order = payload.displayOrder;
    }
    if (payload.isActive !== undefined) {
      patch.is_active = payload.isActive;
    }

    const [row] = await db(TABLE)
      .where({ id: photoId, slug })
      .update(patch)
      .returning("*");

    return row ? this.mapRow(row) : null;
  }

  async deletePhoto(slug: string, photoId: string) {
    await this.ensureTable();
    const db = getSqlClient();
    const deleted = await db(TABLE).where({ id: photoId, slug }).del();
    return deleted > 0;
  }
}
