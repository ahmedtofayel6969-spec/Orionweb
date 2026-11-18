# Orion Quest Live Exam

A bilingual university examination management platform built with React, TypeScript, Vite and Supabase.

## Current repository status

This commit establishes the frontend foundation and Orion visual identity:
- Deep Red / White brand palette with Dark Mode
- Bangla / English language toggle (Bangla default)
- Responsive administration dashboard shell
- React Router and TanStack Query setup
- Supabase client configured through environment variables
- TypeScript and Vite build configuration

**Important:** This is the initial application foundation, not a completed production examination system. Authentication, role enforcement, academic management, question bank persistence, live exam delivery, server-authoritative timing, autosave, evaluation, result approval and audit logging still require implementation and security testing before real student use.

## Requirements

- Node.js 20+
- npm
- A Supabase project for backend features

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`. Never expose a Supabase service-role key in browser code.

## Build

```bash
npm run typecheck
npm run build
```

## Deployment

Deploy the frontend to Vercel and configure the same two public Supabase environment variables in the Vercel project settings. Database schema, Row Level Security policies and server-side Edge Functions must be deployed separately before enabling authenticated exam workflows.

## Product requirements

See the original project specification: Orion Quest Live Exam Master Software Development Prompt.