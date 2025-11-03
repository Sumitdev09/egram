# SETUP ADMIN ACCOUNT - SIMPLE STEPS

## Quick Setup (2 Steps Only!)

### Step 1: Create Admin Account
1. Go to `/admin/login` page
2. Click on "Citizen Portal →" link at bottom
3. Sign up with:
   - **Email:** `admin@admin.com`
   - **Password:** `admin` (or any password you want)
   - **Name:** Admin

### Step 2: Make It Admin
Open Lovable Cloud Database and run this query:

```sql
SELECT public.set_user_as_admin('admin@admin.com');
```

### Done! 
Now you can login at `/admin/login` with:
- Email: `admin@admin.com`
- Password: `admin` (or whatever you set)

---

## How It Works

- **`/admin/login`** - Admin login page (checks admin role)
- **`/auth`** - Citizen login/signup page
- When admin logs in → Goes to Admin Panel
- When citizen logs in → Goes to Dashboard

## Security Note

For production, please change the password to something secure!
