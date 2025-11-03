-- Insert admin user credentials helper
-- This will allow creating an admin account

-- First, create a function to set a user as admin (can only be called from SQL)
CREATE OR REPLACE FUNCTION public.set_user_as_admin(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Get user ID from email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;

  -- Check if admin role already exists
  IF EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = target_user_id AND role = 'admin'
  ) THEN
    RAISE NOTICE 'User % is already an admin', user_email;
    RETURN;
  END IF;

  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin');

  RAISE NOTICE 'User % has been set as admin', user_email;
END;
$$;

-- Create a view to check current admins (for convenience)
CREATE OR REPLACE VIEW public.admin_users AS
SELECT 
  u.id,
  u.email,
  u.created_at,
  ur.role
FROM auth.users u
INNER JOIN public.user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin';

COMMENT ON FUNCTION public.set_user_as_admin IS 'Sets a user as admin by their email address. Usage: SELECT set_user_as_admin(''email@example.com'');';