# Database Design

This backend stores content in three synchronized tiers so the admin panel can edit every page while still supporting fast reads and discovery.

## 1. Relational store (PostgreSQL)

Holds canonical, strongly typed data for governance, audit, and relationships.

```sql
create table pages (
  id uuid primary key,
  slug text unique not null,
  title text not null,
  status text not null check (status in ('draft', 'published')),
  hero_media_id uuid references media_assets(id),
  seo jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz
);

create table sections (
  id uuid primary key,
  page_id uuid references pages(id) on delete cascade,
  title text not null,
  layout text not null,
  position integer not null,
  theme jsonb default '{}'::jsonb
);

create table media_assets (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  mime_type text not null,
  size bigint not null,
  url text not null,
  description text,
  created_at timestamptz default now()
);

create table admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  password_hash text not null,
  role text not null
);
```

Use triggers to keep `updated_at` fresh and to emit change events to the queue that drives the sync workflow.

## 2. Document store (MongoDB)

Allows flexible nested content without migrating SQL tables for every design tweak.

Collection: `page_content`

```json
{
  "pageSlug": "academics",
  "sections": [
    {
      "title": "Programs",
      "layout": "grid",
      "blocks": [
        {
          "id": "block-1",
          "type": "gallery",
          "order": 0,
          "headline": [{ "locale": "en", "value": "STEM" }],
          "media": [{ "id": "asset-1", "url": "/uploads/stem.jpg", "type": "image" }]
        }
      ]
    }
  ],
  "summaryEmbedding": [0.12, -0.08, ...],
  "updatedAt": ISODate("2025-12-10T08:00:00Z")
}
```

Mongo keeps the exact layout JSON consumed by the React pages, making dynamic rendering trivial.

## 3. Vector store (Pinecone / Qdrant / Weaviate)

Stores semantic embeddings of each page (and optionally each section/block) to power cross-page search, “related content”, and AI copilots for editors.

- **Namespace**: `school-content`
- **ID**: `slug` or `slug::sectionId`
- **Metadata**: `{ slug, title, sectionTitle, status }
- **Values**: 1536-dim embedding from OpenAI, Azure OpenAI, or Cohere

## Hybrid flow

1. Admin saves a page.
2. API writes metadata to PostgreSQL (`pages`, `sections`).
3. API writes full structured content to Mongo with the same slug.
4. Background job (or inline, for small updates) generates/accepts embeddings and upserts them into the vector index.
5. CDN path for every media asset is returned so the frontend can hydrate quickly.

`backend/src/workflows/contentSync.ts` contains a reference implementation of the sync job that replays data across the three stores.
