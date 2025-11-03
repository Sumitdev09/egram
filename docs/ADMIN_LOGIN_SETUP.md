# Quick Admin Setup - READ THIS!

## To Create Admin Account (Simple 2 Steps):

### Step 1: Sign Up
Go to: `/auth` (Citizen Portal)
- Email: `admin@admin.com`
- Password: `admin` (or any password you want)
- Click "Create Account"

### Step 2: Make it Admin
Open Lovable Cloud Database and run:
```sql
SELECT public.set_user_as_admin('admin@admin.com');
```

### Done! Now Login:
Go to: `/admin/login` (Admin Login page)
- Email: `admin@admin.com`  
- Password: `admin` (or whatever you set)

---

## How It Works:

**Two Separate Portals:**
1. **Citizen Portal** (`/auth`): Regular users can signup + login
2. **Admin Portal** (`/admin/login`): ONLY login, only for admins

**Security:**
- No hardcoded passwords (security best practice)
- Admin role stored in database
- Admin login page verifies admin role before allowing access
- Regular users cannot access admin panel

---

**Need database access?** Click below to open Cloud Database.
