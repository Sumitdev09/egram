# E-Grampanchayat - Digital Governance Portal# Welcome to your Lovable project



<div align="center">## Project info

  <img src="./public/placeholder.svg" alt="E-Grampanchayat Logo" width="200"/>

  **URL**: https://lovable.dev/projects/4c4217c0-3ec6-4e07-a5af-fa1151c33620

  [![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)

  [![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)## How can I edit this code?

  [![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

  [![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)There are several ways of editing your application.

  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>**Use Lovable**



---Simply visit the [Lovable Project](https://lovable.dev/projects/4c4217c0-3ec6-4e07-a5af-fa1151c33620) and start prompting.



## 📋 Table of ContentsChanges made via Lovable will be committed automatically to this repo.



- [About the Project](#about-the-project)**Use your preferred IDE**

- [Features](#features)

- [Tech Stack](#tech-stack)If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

- [Project Structure](#project-structure)

- [Getting Started](#getting-started)The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

  - [Prerequisites](#prerequisites)

  - [Installation](#installation)Follow these steps:

  - [Running the Project](#running-the-project)

- [Admin Setup](#admin-setup)```sh

- [Database Migrations](#database-migrations)# Step 1: Clone the repository using the project's Git URL.

- [Environment Variables](#environment-variables)git clone <YOUR_GIT_URL>

- [Available Scripts](#available-scripts)

- [Deployment](#deployment)# Step 2: Navigate to the project directory.

- [Documentation](#documentation)cd <YOUR_PROJECT_NAME>

- [Contributing](#contributing)

# Step 3: Install the necessary dependencies.

---npm i



## 🎯 About the Project# Step 4: Start the development server with auto-reloading and an instant preview.

npm run dev

**E-Grampanchayat** is a comprehensive digital governance platform designed to simplify village administration and citizen services. The platform bridges the gap between rural governance and modern technology, enabling:```



- **Citizens** to access government services digitally**Edit a file directly in GitHub**

- **Village Administrators** to manage services efficiently

- **Transparent** and **accountable** governance through digital records- Navigate to the desired file(s).

- Click the "Edit" button (pencil icon) at the top right of the file view.

### Key Objectives- Make your changes and commit the changes.



✅ Digitize village governance processes  **Use GitHub Codespaces**

✅ Provide 24/7 access to government services  

✅ Reduce paperwork and manual processing  - Navigate to the main page of your repository.

✅ Improve transparency and accountability  - Click on the "Code" button (green button) near the top right.

✅ Enable data-driven decision making  - Select the "Codespaces" tab.

- Click on "New codespace" to launch a new Codespace environment.

---- Edit files directly within the Codespace and commit and push your changes once you're done.



## ✨ Features## What technologies are used for this project?



### 👥 Citizen PortalThis project is built with:



- **🆔 Certificate Services**- Vite

  - Birth certificates- TypeScript

  - Death certificates- React

  - Income certificates- shadcn-ui

  - Caste certificates- Tailwind CSS

  - Residence certificates

  - Track application status## How can I deploy this project?



- **💰 Property Tax Management**Simply open [Lovable](https://lovable.dev/projects/4c4217c0-3ec6-4e07-a5af-fa1151c33620) and click on Share -> Publish.

  - View property tax details

  - Online payment integration## Can I connect a custom domain to my Lovable project?

  - Payment history

  - Download receiptsYes, you can!



- **📢 Grievance Management**To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

  - File complaints online

  - Track grievance statusRead more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

  - Receive updates
  - View resolution history

- **📰 Announcements & Notifications**
  - Village announcements
  - Event notifications
  - Government schemes
  - Important updates

- **👤 Profile Management**
  - Update personal information
  - View service history
  - Manage documents

### 🔐 Admin Panel

- **📊 Dashboard**
  - Real-time statistics
  - Service overview
  - Performance metrics

- **📝 Certificate Management**
  - Review applications
  - Approve/reject certificates
  - Download/print certificates

- **💳 Tax Administration**
  - Manage property records
  - Tax collection tracking
  - Generate reports

- **🎯 Grievance Handling**
  - Review complaints
  - Assign to departments
  - Track resolution
  - Communication with citizens

- **📣 Announcement System**
  - Create announcements
  - Schedule notifications
  - Manage content

---

## 🛠 Tech Stack

### Frontend
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Accessible components
- **React Router** - Navigation
- **React Query** - Data fetching & caching
- **Lucide React** - Icons

### Backend & Services
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Storage

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Type checking

---

## 📁 Project Structure

```
egram/
├── public/                      # Static assets
│   ├── index.html              # HTML entry point
│   ├── favicon.ico             # App icon
│   ├── robots.txt              # SEO configuration
│   └── placeholder.svg         # Placeholder images
│
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── auth/              # Authentication components
│   │   │   └── AuthGuard.tsx  # Protected route wrapper
│   │   └── layout/            # Layout components
│   │       ├── DashboardLayout.tsx
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── pages/                 # Page components
│   │   ├── Index.tsx          # Landing page
│   │   ├── Auth.tsx           # Login/Signup
│   │   ├── AdminLogin.tsx     # Admin login
│   │   ├── Dashboard.tsx      # Citizen dashboard
│   │   ├── Certificates.tsx   # Certificate services
│   │   ├── PropertyTax.tsx    # Tax management
│   │   ├── Grievances.tsx     # Grievance portal
│   │   ├── Announcements.tsx  # Announcements
│   │   ├── NotFound.tsx       # 404 page
│   │   └── admin/             # Admin pages
│   │       ├── Dashboard.tsx
│   │       ├── Certificates.tsx
│   │       ├── PropertyTax.tsx
│   │       ├── Grievances.tsx
│   │       └── Announcements.tsx
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── client.ts          # Supabase client
│   │   ├── utils.ts           # Helper functions
│   │   └── types.ts           # TypeScript types
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.tsx     # Mobile detection
│   │   └── use-toast.ts       # Toast notifications
│   │
│   ├── App.tsx                # Main app component
│   ├── App.css                # Global styles
│   ├── main.tsx               # Entry point
│   ├── index.css              # Base CSS
│   └── vite-env.d.ts          # Vite type definitions
│
├── supabase/                  # Supabase configuration
│   └── migrations/            # Database migrations
│       └── *.sql              # Migration files
│
├── docs/                      # Documentation
│   ├── ADMIN_SETUP.md         # Admin setup guide
│   ├── ADMIN_LOGIN_SETUP.md   # Admin login guide
│   ├── HOW_TO_LOGIN.md        # User login guide
│   └── QUICK_ADMIN_SETUP.md   # Quick setup guide
│
├── .env                       # Environment variables (not in git)
├── .gitignore                 # Git ignore rules
├── components.json            # shadcn/ui config
├── config.toml                # App configuration
├── eslint.config.js           # ESLint configuration
├── package.json               # Dependencies
├── postcss.config.js          # PostCSS config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
├── tsconfig.app.json          # App TypeScript config
├── tsconfig.node.json         # Node TypeScript config
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **bun** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up](https://supabase.com/)

Check your installations:
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
git --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sumitdev09/egram.git
   cd egram
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   > 📝 **Note:** Get these from your Supabase project settings → API

4. **Set up the database**
   
   Run the migrations in your Supabase dashboard:
   ```bash
   # Go to Supabase Dashboard → SQL Editor
   # Run the migration files in supabase/migrations/ folder
   ```

### Running the Project

#### Development Mode

```bash
npm run dev
```

The application will start at: **http://localhost:8080**

#### Production Build

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

---

## 🔐 Admin Setup

To create an admin account and access the admin panel:

### Quick Setup

1. **Sign up** as a regular user at `/auth`
   - Use email: `admin@example.com` (or any email)
   - Set a strong password

2. **Make the user an admin** in Supabase:
   - Go to Supabase Dashboard → SQL Editor
   - Run:
     ```sql
     SELECT public.set_user_as_admin('admin@example.com');
     ```

3. **Login** at `/admin/login`
   - Use the credentials from step 1
   - You'll be redirected to the admin dashboard

### Role-Based Access

- **Admin users** → Redirected to `/admin` (Admin Panel)
- **Regular users** → Redirected to `/dashboard` (Citizen Portal)
- All new signups are assigned the `citizen` role by default

📖 For detailed instructions, see [docs/ADMIN_SETUP.md](./docs/ADMIN_SETUP.md)

---

## 🗄 Database Migrations

Database migrations are located in `supabase/migrations/`. They set up:

- User authentication tables
- Role-based access control
- Certificate management system
- Property tax records
- Grievance tracking
- Announcements system
- Row Level Security (RLS) policies

To apply migrations:
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and run each migration file in order

---

## 🌍 Environment Variables

Required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | ✅ Yes |

Optional variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_TITLE` | Application title | E-Grampanchayat |
| `VITE_APP_DESCRIPTION` | Application description | Digital Governance Portal |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at port 8080 |
| `npm run build` | Build for production |
| `npm run build:dev` | Build with development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Deploy to GitHub Pages

See the [deployment documentation](./docs) for detailed instructions.

---

## 📚 Documentation

Additional documentation available in the `docs/` folder:

- **[ADMIN_SETUP.md](./docs/ADMIN_SETUP.md)** - Detailed admin setup guide
- **[ADMIN_LOGIN_SETUP.md](./docs/ADMIN_LOGIN_SETUP.md)** - Admin login configuration
- **[HOW_TO_LOGIN.md](./docs/HOW_TO_LOGIN.md)** - User login instructions
- **[QUICK_ADMIN_SETUP.md](./docs/QUICK_ADMIN_SETUP.md)** - Quick start guide

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

**Copyright © 2025 Sumit Yadav**

Open source libraries and frameworks used:
- React - MIT License
- TypeScript - Apache 2.0 License
- Vite - MIT License
- Tailwind CSS - MIT License
- shadcn/ui - MIT License
- Supabase - Apache 2.0 License

---

## 🙏 Acknowledgments

- UI Components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Backend by [Supabase](https://supabase.com)
- Built with React, TypeScript, and Vite

---

## 👨‍💻 Developer

**Sumit Yadav**

- GitHub: [@Sumitdev09](https://github.com/Sumitdev09)
- Project: [E-Grampanchayat](https://github.com/Sumitdev09/egram)

---

## 📞 Support

For support and queries:

- 📧 Email: support@egrampanchayat.com
- 🐛 Issues: [GitHub Issues](https://github.com/Sumitdev09/egram/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Sumitdev09/egram/discussions)

---

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [./docs](./docs)
- **Repository**: [GitHub](https://github.com/Sumitdev09/egram)

---

<div align="center">
  <strong>Made with ❤️ by Sumit Yadav</strong>
  <br/>
  <sub>Empowering Rural Governance through Technology</sub>
  <br/>
  <sub>Digital India Initiative</sub>
</div>
