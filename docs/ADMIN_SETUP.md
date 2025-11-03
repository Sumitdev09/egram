# Admin Setup Instructions

## Creating an Admin Account

For security reasons, admin credentials cannot be hardcoded. Instead, follow these steps:

### Step 1: Create a Regular Account
1. Go to the signup page
2. Create an account with your email (e.g., `admin@admin.com`)
3. Set any password you want (remember it!)

### Step 2: Make the Account an Admin

Open your Lovable Cloud database and run this SQL query:

```sql
SELECT public.set_user_as_admin('admin@admin.com');
```

Replace `admin@admin.com` with the email you used to sign up.

### Step 3: Login

Now when you login with that email:
- **Admin accounts** → Redirected to `/admin` (Admin Panel)
- **Regular users** → Redirected to `/dashboard` (Citizen Portal)

## How It Works

- When you login, the system checks your role in the `user_roles` table
- If you have the `admin` role, you're redirected to the admin panel
- If you're a regular `citizen`, you're redirected to the dashboard
- All other users are automatically assigned the `citizen` role on signup

## Security

✅ **Secure**: No hardcoded credentials
✅ **Database-driven**: Roles stored in secure database
✅ **Flexible**: Can make any user an admin
✅ **Auditable**: All role changes are tracked

---

**Need to access the database?**

Use the Cloud Database tool in your Lovable project.
