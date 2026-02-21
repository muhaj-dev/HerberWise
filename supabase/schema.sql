-- =====================
-- CATEGORIES
-- =====================
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- CONDITIONS
-- =====================
CREATE TABLE conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  emoji text,
  category_id uuid NOT NULL REFERENCES categories(id),
  created_at timestamptz DEFAULT now()
);

-- =====================
-- HERBS
-- =====================
CREATE TABLE herbs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  latin_name text,
  description text,
  traditional_uses text,
  preparation_dosage text,
  safety_warnings text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- HERB TAGS
-- =====================
CREATE TABLE herb_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  herb_id uuid NOT NULL REFERENCES herbs(id) ON DELETE CASCADE,
  tag text NOT NULL
);

-- =====================
-- HERB <-> CONDITION MAPPING
-- =====================
CREATE TABLE herb_conditions (
  herb_id uuid NOT NULL REFERENCES herbs(id) ON DELETE CASCADE,
  condition_id uuid NOT NULL REFERENCES conditions(id) ON DELETE CASCADE,
  PRIMARY KEY (herb_id, condition_id)
);

-- =====================
-- USER PROFILES
-- (extends Supabase auth.users)
-- =====================
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role text NOT NULL DEFAULT 'user', -- 'user' | 'admin'
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================
-- COMMENTS
-- =====================
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  herb_id uuid REFERENCES herbs(id) ON DELETE CASCADE,
  condition_id uuid REFERENCES conditions(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT comment_target CHECK (
    (herb_id IS NOT NULL AND condition_id IS NULL) OR
    (herb_id IS NULL AND condition_id IS NOT NULL)
  )
);

-- =====================
-- REMEDY REQUESTS
-- =====================
CREATE TABLE remedy_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  condition_name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending', -- 'pending' | 'reviewing' | 'completed' | 'declined'
  admin_notes text,
  created_at timestamptz DEFAULT now()
);
