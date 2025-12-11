import { Schema, model, models } from "mongoose";
import { z } from "zod";

const localizedString = z.object({
  locale: z.string().min(2),
  value: z.string().min(1),
});

const contentBlock = z.object({
  id: z.string().min(1),
  type: z.enum(["rich-text", "gallery", "stat", "cta", "video", "faq"]),
  order: z.number().int().nonnegative(),
  headline: z.array(localizedString).optional(),
  body: z.array(localizedString).optional(),
  props: z.record(z.any()).optional(),
  media: z
    .array(
      z.object({
        id: z.string(),
        url: z.string().url(),
        type: z.enum(["image", "video"]),
        altText: z.string().optional(),
      })
    )
    .optional(),
});

const section = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  layout: z.enum(["grid", "hero", "two-column", "free"]),
  position: z.number().int().nonnegative(),
  theme: z.record(z.union([z.string(), z.number()])).optional(),
  blocks: z.array(contentBlock).min(1),
});

const page = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  status: z.enum(["draft", "published"]),
  heroMediaId: z.string().optional(),
  seo: z
    .object({
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().url().optional(),
    })
    .optional(),
  sections: z.array(section).min(1),
  summaryEmbedding: z.array(z.number()).optional(),
  publishedAt: z.string().optional(),
});

export const upsertContentSchema = z.object({
  body: page,
});

const LocalizedStringSchema = new Schema(
  {
    locale: String,
    value: String,
  },
  { _id: false }
);

const ContentBlockSchema = new Schema(
  {
    id: String,
    type: String,
    order: Number,
    headline: [LocalizedStringSchema],
    body: [LocalizedStringSchema],
    props: Schema.Types.Mixed,
    media: [
      {
        id: String,
        url: String,
        type: String,
        altText: String,
        focalPoint: {
          x: Number,
          y: Number,
        },
      },
    ],
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    title: String,
    layout: String,
    position: Number,
    theme: Schema.Types.Mixed,
    blocks: [ContentBlockSchema],
  },
  { _id: false }
);

const PageContentSchema = new Schema(
  {
    pageSlug: { type: String, unique: true, index: true },
    sections: [SectionSchema],
    updatedAt: { type: Date, default: Date.now },
    summaryEmbedding: [Number],
  },
  { timestamps: true }
);

export const PageContentModel =
  models.PageContent ?? model("PageContent", PageContentSchema, "page_content");
