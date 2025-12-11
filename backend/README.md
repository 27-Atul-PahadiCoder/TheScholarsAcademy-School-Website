# Admin Backend

A modular Express + TypeScript API that powers the dynamic admin panel for the school website. Every page (hero, sections, media, CTAs, etc.) is editable from the admin UI and persisted across SQL, Mongo, and a vector database for discovery features.

## Folder layout

```
backend/
├─ package.json          # Backend dependencies
├─ tsconfig.json         # TypeScript build config
├─ src/
│  ├─ app.ts             # Express app wiring
│  ├─ server.ts          # Bootstrap + DB connections
│  ├─ config/            # env, database, storage clients
│  ├─ middleware/        # auth, validation, error handling
│  ├─ modules/
│  │  ├─ admin/          # login + seed endpoints
│  │  ├─ content/        # page/section CRUD services
│  │  └─ media/          # uploads + asset catalog
│  ├─ routes/            # API router composition
│  ├─ utils/             # logger + helpers
│  └─ workflows/         # sync job (SQL ⇄ Mongo ⇄ Vector)
└─ docs/
   └─ database-design.md # SQL/NoSQL/vector schemas
```

## Environment variables

| Variable             | Description                             |
| -------------------- | --------------------------------------- |
| `PORT`               | API port (default `4000`)               |
| `SQL_DATABASE_URL`   | PostgreSQL connection string            |
| `MONGODB_URI`        | Mongo connection string                 |
| `PINECONE_API_KEY`   | Vector DB API key                       |
| `PINECONE_INDEX`     | Vector index name                       |
| `PINECONE_NAMESPACE` | Namespace for all embeddings            |
| `JWT_SECRET`         | Signing key for admin tokens            |
| `MEDIA_UPLOAD_DIR`   | Local upload folder (default `uploads`) |
| `CDN_BASE_URL`       | Optional CDN prefix for assets          |
| `ADMIN_UI_ORIGIN`    | Comma separated origins allowed by CORS |

## Scripts

```bash
cd backend
npm install
npm run dev    # ts-node-dev with live reload
npm run build  # emits dist/
npm start      # runs compiled server
```

## API surface

| Method | Path                 | Description                               |
| ------ | -------------------- | ----------------------------------------- |
| `POST` | `/api/admin/login`   | Issue JWT token for admin panel           |
| `POST` | `/api/admin/seed`    | Create default admin user (protect later) |
| `GET`  | `/api/content`       | List pages with status metadata           |
| `GET`  | `/api/content/:slug` | Fetch composed page (SQL + Mongo)         |
| `PUT`  | `/api/content/:slug` | Upsert content, sections, embeddings      |
| `GET`  | `/api/media`         | List uploaded assets                      |
| `POST` | `/api/media/upload`  | Upload + persist media metadata           |

All content/media endpoints require the `Authorization: Bearer <token>` header with an admin JWT.

## Admin workflow

1. Admin logs in → receives JWT.
2. UI fetches `/api/content` to hydrate page list.
3. Editing a page issues `PUT /api/content/:slug` with structured sections/blocks. The service writes to PostgreSQL, MongoDB, and the vector store in one request.
4. File uploads stream through Multer to `MEDIA_UPLOAD_DIR`, and metadata is stored in `media_assets` for reuse.
5. Background jobs (see `workflows/contentSync.ts`) can rebuild embeddings or reconcile data if any store drifts.

## Next steps

- Build the admin UI screens that call these endpoints.
- Wire up real embedding generation (OpenAI, Azure, Cohere) before calling the vector client.
- Decide on auth hardening (RBAC scopes, refresh tokens, audit logs).
- Add queue-based change events if you need guaranteed sync between SQL, Mongo, and the vector index.
