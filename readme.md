# 📚 Sistem Informasi Komunitas Sahabat Belajar

Platform manajemen komunitas lengkap dengan fitur artikel, event, dan akuntansi terintegrasi.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.3+
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand + TanStack Query

### Backend & Database
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### Development & Deployment
- **Package Manager**: pnpm
- **Version Control**: Git + GitHub
- **CI/CD**: Vercel
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Testing Library

---

## 📁 Struktur Project

```
komunitas-sahabat-belajar/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth pages (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── admin/             # Admin panel
│   │   ├── articles/          # Article management
│   │   ├── events/            # Event management
│   │   └── accounting/        # Accounting system
│   ├── (public)/              # Public pages
│   │   ├── articles/          # Public article listing
│   │   ├── events/            # Public event listing
│   │   └── about/
│   ├── api/                   # API routes
│   │   ├── auth/
│   │   ├── articles/
│   │   └── events/
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/                # React components
│   ├── ui/                    # shadcn/ui components
│   ├── forms/                 # Form components
│   ├── layouts/               # Layout components
│   └── features/              # Feature-specific components
│       ├── articles/
│       ├── events/
│       └── accounting/
├── lib/                       # Utility libraries
│   ├── supabase/             # Supabase clients
│   │   ├── client.ts         # Browser client
│   │   ├── server.ts         # Server client
│   │   └── middleware.ts     # Auth middleware
│   ├── db/                   # Database utilities
│   │   ├── schema.ts         # Drizzle schema
│   │   └── queries.ts        # Database queries
│   ├── validations/          # Zod schemas
│   └── utils.ts              # Helper functions
├── hooks/                     # Custom React hooks
├── types/                     # TypeScript type definitions
├── public/                    # Static assets
├── supabase/                  # Supabase configuration
│   ├── migrations/           # Database migrations
│   ├── functions/            # Edge Functions
│   └── seed.sql              # Initial data
├── .env.local                # Environment variables
├── .env.example              # Environment variables template
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── package.json
└── README.md
```

---

## 🛠️ Setup Development

### Prerequisites

- Node.js 18.17 atau lebih baru
- pnpm 8.0 atau lebih baru
- Git
- Akun Supabase (gratis)
- Akun Vercel (gratis, optional)

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/your-username/komunitas-sahabat-belajar.git
cd komunitas-sahabat-belajar
```

2. **Install Dependencies**
```bash
pnpm install
```

3. **Setup Environment Variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Setup Database**

Login ke Supabase CLI:
```bash
npx supabase login
```

Link project:
```bash
npx supabase link --project-ref your-project-ref
```

Run migrations:
```bash
npx supabase db push
```

Atau jalankan manual di Supabase SQL Editor dengan file `supabase/migrations/001_initial_schema.sql`

5. **Run Development Server**
```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Schema

### Core Tables

#### Users & Authentication
- `users` - User profiles (extends Supabase auth.users)
- `roles` - User roles (Admin, Editor, Member, Accountant)

#### Content Management
- `articles` - Article posts
- `article_categories` - Article categories
- `article_tags` - Article tags
- `article_tag_relations` - Many-to-many relationship

#### Event Management
- `events` - Event information
- `event_registrations` - Event registration & attendance

#### Accounting System
- `accounts` - Chart of Accounts
- `general_journals` - Journal entries
- `journal_details` - Journal entry details
- `ledgers` - General ledger
- `accounting_periods` - Fiscal periods

### Views
- `trial_balance` - Trial balance report
- `income_statement` - Income statement
- `balance_sheet` - Balance sheet
- `article_summary_by_author` - Article statistics
- `event_summary` - Event summary with revenue

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **User Registration**
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: {
      full_name: 'John Doe',
    }
  }
})
```

2. **User Login**
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})
```

3. **OAuth Login (Google)**
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${location.origin}/auth/callback`,
  },
})
```

### Row Level Security (RLS)

Database dilindungi dengan RLS policies:

- **Articles**: Users dapat melihat artikel published atau milik sendiri
- **Events**: Public dapat melihat, organizer dapat mengelola
- **Journals**: Hanya Admin dan Accountant yang dapat akses

### Role-Based Access Control

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(...)
  const { data: { user } } = await supabase.auth.getUser()
  
  // Check user role
  const { data: userData } = await supabase
    .from('users')
    .select('role:roles(role_name)')
    .eq('id', user?.id)
    .single()
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (userData?.role?.role_name !== 'Admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
}
```

---

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Selalu gunakan TypeScript, hindari `any`
- **Components**: Gunakan functional components dengan hooks
- **Naming**: 
  - Components: PascalCase (`ArticleCard.tsx`)
  - Functions: camelCase (`getUserData()`)
  - Constants: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **File Organization**: Group by feature, bukan by type

### Component Structure

```typescript
'use client' // jika client component

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ArticleCardProps {
  title: string
  excerpt?: string
  author: string
}

export function ArticleCard({ title, excerpt, author }: ArticleCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  
  return (
    <article className="rounded-lg border p-4">
      <h3 className="text-xl font-bold">{title}</h3>
      {excerpt && <p className="text-gray-600">{excerpt}</p>}
      <p className="text-sm text-gray-500">By {author}</p>
      <Button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? 'Unlike' : 'Like'}
      </Button>
    </article>
  )
}
```

### Form Validation

Gunakan React Hook Form + Zod:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const articleSchema = z.object({
  title: z.string().min(3, 'Minimal 3 karakter'),
  content: z.string().min(100, 'Minimal 100 karakter'),
  category_id: z.number(),
})

type ArticleFormData = z.infer<typeof articleSchema>

export function ArticleForm() {
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  })
  
  const onSubmit = async (data: ArticleFormData) => {
    // Handle submission
  }
}
```

### Database Queries

Gunakan Drizzle ORM untuk type-safe queries:

```typescript
import { db } from '@/lib/db'
import { articles, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Get article with author
export async function getArticle(id: number) {
  return await db
    .select({
      id: articles.id,
      title: articles.title,
      content: articles.content,
      author: {
        name: users.full_name,
        email: users.email,
      }
    })
    .from(articles)
    .leftJoin(users, eq(articles.author_id, users.id))
    .where(eq(articles.id, id))
    .limit(1)
}
```

### Error Handling

```typescript
'use server'

import { z } from 'zod'

export async function createArticle(formData: FormData) {
  try {
    // Validate input
    const validated = articleSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    })
    
    // Business logic
    const { data, error } = await supabase
      .from('articles')
      .insert(validated)
    
    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: 'Something went wrong' }
  }
}
```

---

## 🧪 Testing

### Unit Testing

```bash
pnpm test
```

### E2E Testing (Playwright)

```bash
pnpm test:e2e
```

### Test Coverage

```bash
pnpm test:coverage
```

Example test:

```typescript
import { render, screen } from '@testing-library/react'
import { ArticleCard } from '@/components/ArticleCard'

describe('ArticleCard', () => {
  it('renders article title', () => {
    render(<ArticleCard title="Test Article" author="John Doe" />)
    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })
})
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push ke GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import di Vercel**
- Buka [vercel.com](https://vercel.com)
- Import GitHub repository
- Configure environment variables
- Deploy!

3. **Configure Supabase Integration**
- Di Vercel dashboard, tambahkan Supabase integration
- Environment variables akan otomatis sync

### Environment Variables di Vercel

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

### Database Migrations

```bash
# Generate migration
npx supabase db diff -f new_feature

# Apply migration
npx supabase db push
```

---

## 📊 Monitoring & Analytics

### Error Tracking
- Setup Sentry untuk error monitoring

### Analytics
- Vercel Analytics (built-in)
- Google Analytics (optional)

### Performance
- Vercel Speed Insights
- Lighthouse CI

---

## 🔧 Common Tasks

### Menambah Tabel Baru

1. Buat migration di `supabase/migrations/`
2. Update Drizzle schema di `lib/db/schema.ts`
3. Generate types: `pnpm db:generate`
4. Push migration: `npx supabase db push`

### Menambah Fitur Baru

1. Buat branch baru: `git checkout -b feature/nama-fitur`
2. Develop fitur
3. Testing
4. Commit & push
5. Create Pull Request

### Update Dependencies

```bash
pnpm update --latest
```

### Build Production

```bash
pnpm build
pnpm start
```

---

## 🐛 Troubleshooting

### Port sudah digunakan
```bash
# Kill process di port 3000
npx kill-port 3000
```

### Supabase connection error
- Cek environment variables
- Verifikasi project URL dan keys
- Cek RLS policies

### TypeScript errors
```bash
# Rebuild types
pnpm db:generate
pnpm typecheck
```

---

## 📚 Resources & Documentation

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)

### Community
- [GitHub Issues](https://github.com/your-repo/issues)
- Discord Server (link)
- Email: dev@sahabatbelajar.com

---

## 👥 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### Commit Convention

```
feat: Menambah fitur baru
fix: Memperbaiki bug
docs: Update dokumentasi
style: Format code
refactor: Refactor code
test: Menambah test
chore: Update dependencies
```

---

## 📄 License

MIT License - Copyright (c) 2026 Komunitas Sahabat Belajar

---

## 🙏 Credits

Dikembangkan dengan ❤️ oleh Tim Sahabat Belajar

**Maintainers:**
- Your Name (@username)

**Contributors:**
- [All Contributors](https://github.com/your-repo/graphs/contributors)