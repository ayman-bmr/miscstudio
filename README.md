# Misc Studio - Official Website



A modern, multi-language website for **Misc Studio**, a creative studio specializing in developing innovative applications and games. This platform showcases our portfolio with full English and Arabic support.

Built with **Next.js**, **Prisma**, **PostgreSQL**, and deployed on **Supabase**.

**Live Demo:** [https://miscstudio.vercel.app](https://miscstudio.vercel.app) <!-- Replace with your actual live URL -->

## 🌟 Features

*   **Next.js 14 App Router:** High-performance React framework with excellent SEO capabilities
*   **Full Bilingual Support:** Complete English/Arabic localization for games and content
*   **Responsive Design:** Optimized for all devices and screen sizes
*   **Dynamic Game Portfolio:** Showcase Misc Studio's games with multi-language descriptions
*   **Admin Panel:** Secure content management system for adding/editing games
*   **Type-Safe Development:** Full TypeScript integration with Prisma ORM
*   **Modern UI:** Clean, professional design tailored for gaming studio presentation

## 🛠️ Tech Stack

*   **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
*   **Backend:** Next.js API Routes
*   **ORM:** Prisma
*   **Database:** PostgreSQL (hosted on Supabase)
*   **Authentication:** Next-Auth.js
*   **Internationalization:** Next.js i18n (or your chosen solution)
*   **Deployment:** Vercel (Frontend) / Supabase (Database)
*   **Storage:** Supabase Storage (for game images and media)

## 📋 Prerequisites

Before running this project, ensure you have installed:
*   **Node.js** (version 18.17 or later)
*   **npm**, **yarn**, or **pnpm**
*   **Git**

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/misc-studio-website.git
cd misc-studio-website
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Configuration

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```

2.  Update `.env` with your Supabase credentials:

```env
# Database
DATABASE_URL="postgresql://postgres:[password]@[host].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-nextauth-key"
NEXTAUTH_URL="http://localhost:3000"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

### 4. Database Setup

1.  **Initialize Database:**
    ```bash
    npx prisma db push
    ```

2.  **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```

3.  **(Optional) Seed with Sample Data:**
    ```bash
    npx prisma db seed
    ```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Schema

The database is designed with multi-language support and secure admin management:

```prisma
model Game {
  id             Int      @id @default(autoincrement())
  title_en       String   // English game title
  title_ar       String   // Arabic game title
  description_en String   // English description
  description_ar String   // Arabic description
  image          String   // Game cover image URL
  link           String?  // Optional game download/link URL
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed password
  name      String?  // Admin display name
  createdAt DateTime @default(now())
}
```

### Key Schema Features:
- **Multi-language Game Content:** Separate fields for English and Arabic titles/descriptions
- **Flexible Media Storage:** Support for game images and external links
- **Secure Authentication:** Hashed password storage for admin accounts
- **Automatic Timestamps:** Created/updated timestamps for all records

## 📁 Project Structure

```
misc-studio-website/
├── app/
│   ├── [lang]/                   # Multi-language routes (en, ar)
│   │   ├── games/               # Game listing and detail pages
│   │   ├── admin/               # Admin dashboard
│   │   └── page.tsx             # Homepage
│   ├── api/
│   │   ├── games/               # Game CRUD API
│   │   ├── auth/                # Authentication endpoints
│   │   └── admin/               # Admin management API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── games/                   # Game-specific components
│   ├── admin/                   # Admin panel components
│   └── layout/                  # Layout components (Header, Footer)
├── lib/
│   ├── prisma.ts                # Prisma client instance
│   ├── auth.ts                  # Authentication configuration
│   ├── i18n.ts                  # Internationalization setup
│   └── utils.ts                 # Utility functions
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Sample data
├── public/
│   ├── images/                  # Static images
│   └── locales/                 # Translation files
└── types/                       # TypeScript definitions
```

## 🎮 Admin Features

The admin panel allows authorized users to:
- Add new games with bilingual content
- Edit existing game information
- Upload game images
- Manage game links and metadata
- View all games in a centralized dashboard

### Accessing Admin Panel:
1. Navigate to `/admin/login`
2. Use your admin credentials
3. Manage content through the intuitive dashboard

## 🌍 Multi-language Support

The website supports both English and Arabic:
- **Language Switching:** Easy toggle between English and Arabic
- **RTL Support:** Proper right-to-left layout for Arabic content
- **Localized URLs:** Language-specific routing (`/en/games`, `/ar/games`)
- **Dynamic Content:** Database-driven translations for game information

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1.  Push your code to GitHub
2.  Connect your repository to [Vercel](https://vercel.com)
3.  Add environment variables in Vercel dashboard
4.  Deploy with one click

### Environment Variables for Production:

Ensure these are set in your production environment:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
```

## 🤝 Contributing

We welcome contributions to improve Misc Studio's website:

1.  Fork the repository
2.  Create a feature branch: `git checkout -b feature/new-feature`
3.  Commit changes: `git commit -m 'Add new feature'`
4.  Push to branch: `git push origin feature/new-feature`
5.  Submit a pull request

## 📄 License

This project is the official website of Misc Studio. All rights reserved.



---

**Crafting exceptional gaming experiences - Misc Studio**
