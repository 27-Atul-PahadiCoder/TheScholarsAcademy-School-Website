export type ContentBlockType =
  | "rich-text"
  | "gallery"
  | "stat"
  | "cta"
  | "video"
  | "faq";

export type LocalizedString = {
  locale: string;
  value: string;
};

export type MediaReference = {
  id: string;
  url: string;
  type: "image" | "video";
  altText?: string;
  focalPoint?: {
    x: number;
    y: number;
  };
};

export type ContentBlock = {
  id: string;
  type: ContentBlockType;
  order: number;
  headline?: LocalizedString[];
  body?: LocalizedString[];
  props?: Record<string, unknown>;
  media?: MediaReference[];
};

export type SectionInput = {
  id?: string;
  title: string;
  layout: "grid" | "hero" | "two-column" | "free";
  position: number;
  theme?: Record<string, string | number>;
  blocks: ContentBlock[];
};

export type PageInput = {
  slug: string;
  title: string;
  status: "draft" | "published";
  heroMediaId?: string;
  seo?: {
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
  sections: SectionInput[];
};

export type ContentUpsertPayload = PageInput & {
  publishedAt?: string;
  summaryEmbedding?: number[];
};
