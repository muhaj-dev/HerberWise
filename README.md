# HerbWise — Natural Herbal Remedies Platform

A full-stack Next.js application for discovering traditional herbal remedies. Built with TypeScript, Tailwind CSS, Supabase, TanStack Query, React Hook Form, and Zod.

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Install Dependencies

```bash
cd herbwise
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. In the Supabase SQL Editor, run the following files **in order**:
   - `supabase/schema.sql` — creates all tables and triggers
   - `supabase/rls.sql` — sets up Row Level Security policies
   - `supabase/seed.sql` — populates initial data (categories, conditions, herbs)

### 3. Configure Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — your Supabase service role key (for admin actions)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
herbwise/
├── supabase/              # SQL files for database setup
│   ├── schema.sql         # Tables and triggers
│   ├── rls.sql            # Row Level Security policies
│   └── seed.sql           # Initial seed data
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── find-a-remedy/     # Search & filter conditions
│   │   ├── conditions/        # Browse & detail pages
│   │   ├── herbs/             # Library & detail pages
│   │   ├── safety/            # Safety guidelines
│   │   ├── about/             # About & sources
│   │   ├── auth/              # Login, signup, logout
│   │   ├── dashboard/         # User dashboard
│   │   └── admin/             # Admin dashboard (layout, actions, sub-pages)
│   ├── components/        # React components
│   │   ├── ui/                # Reusable UI primitives
│   │   ├── layout/            # Navbar, Footer
│   │   ├── herbs/             # HerbCard
│   │   └── conditions/        # ConditionCard
│   ├── hooks/             # TanStack Query data hooks
│   ├── lib/               # Supabase clients, query config
│   └── types/             # TypeScript interfaces
├── middleware.ts          # Auth & route protection
└── tailwind.config.ts     # Design system tokens
```

## Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 14 (App Router) |
| Language  | TypeScript              |
| Styling   | Tailwind CSS            |
| Database  | Supabase (PostgreSQL)   |
| Auth      | Supabase Auth (SSR)     |
| Data      | TanStack Query          |
| Forms     | React Hook Form + Zod   |
| Icons     | Lucide React            |

## Admin Access

To access the admin dashboard at `/admin`, you need a user with `role = 'admin'` in the `profiles` table. After signing up, manually update your profile in the Supabase dashboard:

```sql
UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
```
