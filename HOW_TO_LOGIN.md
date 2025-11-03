# ✅ SIMPLE SETUP - Create Admin Account

## Quick 2-Step Process:

### STEP 1: Create Account
1. Click **"Citizen Portal"** button (or go to `/auth`)
2. Click **"Sign Up"** tab
3. Fill in:
   - **Email**: `admin@admin.com`
   - **Password**: `admin`
   - **Name**: `Admin`
4. Click **"Create Account"**

### STEP 2: Make it Admin
1. Open Lovable Cloud Database (click button below)
2. Run this SQL query:
```sql
SELECT public.set_user_as_admin('admin@admin.com');
```

### DONE! ✅ Now Login as Admin:
1. Go to home page
2. Click **"Admin Login"** button (or go to `/admin/login`)
3. Login with:
   - **Email**: `admin@admin.com`
   - **Password**: `admin`

---

## ⚡ How The System Works:

### Two Separate Login Pages:

**1. Citizen Portal** (`/auth`)
- Regular users signup here
- Can create new accounts
- Auto-redirected to Dashboard after login

**2. Admin Login** (`/admin/login`)  
- **NO signup** - Login only!
- Checks if user has admin role
- Only admins can access
- Regular users blocked
- Auto-redirected to Admin Panel after login

### Smart Redirect System:
✅ Admin logs in → Goes to Admin Panel  
✅ Citizen logs in → Goes to Dashboard  
✅ Wrong portal? → Redirected to correct one

---

## 🔒 Security Features:
- No hardcoded passwords
- Database-driven authentication
- Role verification on every login
- Automatic session management
- Admin-only access control
