-- Create user_roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'citizen');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL DEFAULT 'citizen',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  certificate_type TEXT NOT NULL CHECK (certificate_type IN ('birth', 'death', 'income', 'residence')),
  applicant_name TEXT NOT NULL,
  details JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  application_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  processed_date TIMESTAMP WITH TIME ZONE,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create property_tax table
CREATE TABLE public.property_tax (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  property_number TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  property_address TEXT NOT NULL,
  property_type TEXT NOT NULL,
  area_sqft NUMERIC NOT NULL,
  tax_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('paid', 'unpaid', 'partial')),
  due_date DATE NOT NULL,
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.property_tax ENABLE ROW LEVEL SECURITY;

-- Create grievances table
CREATE TABLE public.grievances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in-progress', 'resolved', 'rejected')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  submitted_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_date TIMESTAMP WITH TIME ZONE,
  admin_remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.grievances ENABLE ROW LEVEL SECURITY;

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  published_by UUID NOT NULL,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, full_name)
  VALUES (NEW.id, NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'citizen');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for certificates
CREATE POLICY "Users can view own certificates"
  ON public.certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own certificates"
  ON public.certificates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all certificates"
  ON public.certificates FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update certificates"
  ON public.certificates FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for property_tax
CREATE POLICY "Users can view own property tax"
  ON public.property_tax FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own property tax"
  ON public.property_tax FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all property tax"
  ON public.property_tax FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update property tax"
  ON public.property_tax FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for grievances
CREATE POLICY "Users can view own grievances"
  ON public.grievances FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own grievances"
  ON public.grievances FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all grievances"
  ON public.grievances FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update grievances"
  ON public.grievances FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for announcements
CREATE POLICY "Everyone can view announcements"
  ON public.announcements FOR SELECT
  USING (true);

CREATE POLICY "Admins can create announcements"
  ON public.announcements FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update announcements"
  ON public.announcements FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete announcements"
  ON public.announcements FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();