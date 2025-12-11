import { v4 as uuid } from "uuid";
import { getSqlClient } from "../../config/sqlClient";
import { PageContentModel } from "./content.model";
import { ContentUpsertPayload, SectionInput } from "./content.types";
import { vectorOperations } from "../../config/vectorClient";
import { logger } from "../../utils/logger";

export class ContentService {
  async listPages() {
    const db = getSqlClient();
    return db
      .select("id", "slug", "title", "status", "updated_at")
      .from("pages");
  }

  async getPage(slug: string) {
    const db = getSqlClient();
    const page = await db("pages").where({ slug }).first();
    type PageContentDoc = {
      pageSlug: string;
      sections: SectionInput[];
      summaryEmbedding?: number[];
    };

    const contentDoc = await PageContentModel.findOne({ pageSlug: slug })
      .lean<PageContentDoc>()
      .exec();

    if (!page) {
      return null;
    }

    return {
      ...page,
      sections: contentDoc?.sections ?? [],
      summaryEmbedding: contentDoc?.summaryEmbedding ?? [],
    };
  }

  async upsertPage(payload: ContentUpsertPayload) {
    const db = getSqlClient();
    const timestamps = {
      updated_at: new Date().toISOString(),
      published_at:
        payload.status === "published" ? new Date().toISOString() : null,
    };

    const [pageRecord] = await db("pages")
      .insert({
        id: uuid(),
        slug: payload.slug,
        title: payload.title,
        status: payload.status,
        hero_media_id: payload.heroMediaId ?? null,
        seo: JSON.stringify(payload.seo ?? {}),
        ...timestamps,
      })
      .onConflict("slug")
      .merge({
        title: payload.title,
        status: payload.status,
        hero_media_id: payload.heroMediaId ?? null,
        seo: JSON.stringify(payload.seo ?? {}),
        ...timestamps,
      })
      .returning(["id", "slug", "title", "status", "updated_at"]);

    await PageContentModel.updateOne(
      { pageSlug: payload.slug },
      {
        $set: {
          sections: payload.sections,
          summaryEmbedding: payload.summaryEmbedding ?? [],
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    if (payload.summaryEmbedding && payload.summaryEmbedding.length) {
      await vectorOperations.upsert([
        {
          id: payload.slug,
          values: payload.summaryEmbedding,
          metadata: {
            slug: payload.slug,
            title: payload.title,
            status: payload.status,
          },
        },
      ]);
    }

    logger.info({ slug: payload.slug }, "Page saved");
    return pageRecord;
  }
}
