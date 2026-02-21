-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE herbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE herb_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE herb_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE remedy_requests ENABLE ROW LEVEL SECURITY;

-- Public read for content tables
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read conditions" ON conditions FOR SELECT USING (true);
CREATE POLICY "Public read herbs" ON herbs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read herb_tags" ON herb_tags FOR SELECT USING (true);
CREATE POLICY "Public read herb_conditions" ON herb_conditions FOR SELECT USING (true);

-- Approved comments are public
CREATE POLICY "Public read approved comments" ON comments FOR SELECT USING (is_approved = true);

-- Authenticated users can insert comments
CREATE POLICY "Auth users insert comments" ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can manage their own remedy requests
CREATE POLICY "Auth users insert requests" ON remedy_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Auth users read own requests" ON remedy_requests FOR SELECT
  USING (auth.uid() = user_id);

-- Profiles: users can read and update their own
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Admin: full access via service role (handled server-side, not via RLS)
