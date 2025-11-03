-- Fix security issues by removing the admin_users view
-- The view exposed auth.users data which is a security risk

DROP VIEW IF EXISTS public.admin_users;

-- The set_user_as_admin function is still available and secure
-- It can only be called from SQL queries in the database, not from the API