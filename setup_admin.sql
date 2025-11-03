-- Admin Setup Script for E-Grampanchayat
-- Run this in Supabase SQL Editor after signing up

-- Step 1: Check if user exists (replace with your email)
SELECT email, id FROM auth.users WHERE email = 'admin@example.com';

-- Step 2: Make user admin (replace with your email)
-- This uses the function from migrations
SELECT public.set_user_as_admin('admin@example.com');

-- Step 3: Verify admin role was set
SELECT u.email, ur.role 
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE u.email = 'admin@example.com';

-- If you see role = 'admin', you're all set! ✅

-- Optional: View all admin users
SELECT u.email, ur.role, ur.created_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin';
