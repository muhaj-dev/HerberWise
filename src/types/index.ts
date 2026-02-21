export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
}

export interface Condition {
  id: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  category: Category;
}

export interface HerbTag {
  id: string;
  tag: string;
}

export interface Herb {
  id: string;
  name: string;
  slug: string;
  latin_name: string;
  description: string;
  traditional_uses: string;
  preparation_dosage: string;
  safety_warnings: string;
  is_published: boolean;
  herb_tags: HerbTag[];
  conditions?: Condition[];
}

export interface Profile {
  id: string;
  full_name: string;
  role: "user" | "admin";
  avatar_url: string | null;
}

export interface Comment {
  id: string;
  user_id: string;
  herb_id: string | null;
  condition_id: string | null;
  content: string;
  is_approved: boolean;
  created_at: string;
  profiles: { full_name: string };
}

export interface RemedyRequest {
  id: string;
  user_id: string;
  condition_name: string;
  description: string;
  status: "pending" | "reviewing" | "completed" | "declined";
  admin_notes: string | null;
  created_at: string;
}
