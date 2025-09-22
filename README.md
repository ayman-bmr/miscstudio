# 🎮 Misc Studio

**Misc Studio** is a platform for building and managing applications and games.  
It uses **Next.js**, **Prisma**, **Supabase**, and **PostgreSQL** for a modern full-stack experience.

---

## ✨ Features
- 🚀 Full-stack web app built with **Next.js**
- 🗄️ **Prisma ORM** for database access
- 🐘 **PostgreSQL** hosted on **Supabase**
- 🎨 Manage apps and games
- 🔐 Secure authentication with Supabase

---

## 🛠️ Tech Stack
- **Frontend:** Next.js
- **Backend / ORM:** Prisma
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase

---
## 🛠️ Database Schema

```mermaid
erDiagram
    Game {
      int id PK
      string title_en
      string description_en
      string title_ar
      string description_ar
      string image
      string link
      datetime createdAt
      datetime updatedAt
    }

    Admin {
      string id PK
      string email UNIQUE
      string password
      string name
      datetime createdAt
    }


## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/misc-studio.git
cd misc-studio
