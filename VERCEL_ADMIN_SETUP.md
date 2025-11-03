# Admin Login Setup for Vercel Deployment 🔐

Your website is live at: **https://egram-sepia.vercel.app/**

But you need to complete these steps to login to the admin panel:

---

## ⚠️ Issue: Cannot Login

**Reason**: Either Supabase is not connected OR admin user doesn't exist

---

## 🔧 Solution: Complete Setup (5 minutes)

### **Step 1: Set Up Supabase Environment Variables**

1. **Go to Vercel Dashboard**: https://vercel.com/sumitdev09/egram
2. **Click**: Settings → Environment Variables
3. **Add these variables**:

   ```
   Variable Name: VITE_SUPABASE_URL
   Value: [Your Supabase Project URL]
   
   Variable Name: VITE_SUPABASE_ANON_KEY
   Value: [Your Supabase Anon Key]
   ```

4. **Get Supabase Keys**:
   - Go to: https://supabase.com/dashboard
   - Select your project (or create new one)
   - Go to: Settings → API
   - Copy "Project URL" and "anon public" key

5. **Redeploy**:
   - After adding variables, click "Redeploy" in Vercel

---

### **Step 2: Set Up Supabase Database**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (or create new one)
3. **Go to**: SQL Editor
4. **Run these migrations** (copy from `supabase/migrations/` folder):

   **Migration 1**: Create tables
   ```sql
   -- Run: 20251103194247_b8407b5d-33aa-404d-82af-19fe95e7b1df.sql
   -- This creates user_roles, certificates, property_tax, grievances, announcements tables
   ```

   **Migration 2-5**: Run remaining migration files in order

---

### **Step 3: Create Admin User**

**Option A: Using SQL (Easiest)**

1. **First, sign up** on your website: https://egram-sepia.vercel.app/auth
   - Use email: `admin@example.com` (or your email)
   - Set password: `admin123` (or your password)

2. **Then, go to Supabase SQL Editor** and run:
   ```sql
   -- Replace 'admin@example.com' with the email you used
   SELECT public.set_user_as_admin('admin@example.com');
   ```

3. **Done!** Now login at: https://egram-sepia.vercel.app/admin/login

---

**Option B: Manual Database Update**

1. **Sign up** as regular user first
2. **Go to**: Supabase → Table Editor → `user_roles`
3. **Find your user** and change `role` from `citizen` to `admin`
4. **Login** at admin panel

---

## 🎯 Quick Test

After setup:

1. ✅ Go to: https://egram-sepia.vercel.app/admin/login
2. ✅ Enter your email and password
3. ✅ You should see the admin dashboard!

---

## 🔄 If Still Not Working

### Check 1: Verify Environment Variables
```bash
# In Vercel Dashboard, check if you see:
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...
```

### Check 2: Verify Database
- Go to Supabase → Table Editor
- Check if tables exist: `user_roles`, `profiles`, `certificates`, etc.

### Check 3: Verify Admin Role
```sql
-- In Supabase SQL Editor, run:
SELECT * FROM user_roles WHERE role = 'admin';
-- Should show your user
```

---

## 📞 Common Errors & Solutions

### Error: "Invalid login credentials"
- **Solution**: Make sure you signed up first at `/auth`
- **Solution**: Check if email/password are correct

### Error: "Access denied. Admin privileges required"
- **Solution**: Run `set_user_as_admin()` function in Supabase

### Error: Database connection failed
- **Solution**: Check environment variables in Vercel
- **Solution**: Make sure Supabase project is active

---

## 🎉 Success!

Once logged in, you can:
- ✅ View all users
- ✅ Approve certificates
- ✅ Manage tax records
- ✅ Handle grievances
- ✅ Create announcements

---

## 🔐 Default Test Credentials (After Setup)

```
Email: admin@example.com
Password: [The one you set during signup]
```

---

**Made with ❤️ by Sumit Yadav**
