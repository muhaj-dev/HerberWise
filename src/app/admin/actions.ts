"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
        setAll: () => {},
      },
    }
  );
}

export async function approveComment(commentId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("comments")
    .update({ is_approved: true })
    .eq("id", commentId);
  if (error) throw error;
  return { success: true };
}

export async function deleteComment(commentId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);
  if (error) throw error;
  return { success: true };
}

export async function updateRequestStatus(
  requestId: string,
  status: string,
  adminNotes: string
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("remedy_requests")
    .update({ status, admin_notes: adminNotes })
    .eq("id", requestId);
  if (error) throw error;
  return { success: true };
}

export async function updateUserRole(
  userId: string,
  role: "user" | "admin"
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);
  if (error) throw error;
  return { success: true };
}

export async function publishHerb(herbId: string, published: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("herbs")
    .update({ is_published: published })
    .eq("id", herbId);
  if (error) throw error;
  return { success: true };
}

export async function deleteHerb(herbId: string) {
  const supabase = createAdminClient();
  // Delete tags and condition links first (cascade should handle it but being explicit)
  await supabase.from("herb_tags").delete().eq("herb_id", herbId);
  await supabase.from("herb_conditions").delete().eq("herb_id", herbId);
  const { error } = await supabase.from("herbs").delete().eq("id", herbId);
  if (error) throw error;
  return { success: true };
}

export async function upsertHerb(
  herbData: {
    id?: string;
    name: string;
    slug: string;
    latin_name: string;
    description: string;
    traditional_uses: string;
    preparation_dosage: string;
    safety_warnings: string;
    is_published: boolean;
  },
  tags: string[],
  conditionIds: string[]
) {
  const supabase = createAdminClient();

  let herbId = herbData.id;

  if (herbId) {
    // Update existing herb
    const { error } = await supabase
      .from("herbs")
      .update({
        name: herbData.name,
        slug: herbData.slug,
        latin_name: herbData.latin_name,
        description: herbData.description,
        traditional_uses: herbData.traditional_uses,
        preparation_dosage: herbData.preparation_dosage,
        safety_warnings: herbData.safety_warnings,
        is_published: herbData.is_published,
      })
      .eq("id", herbId);
    if (error) throw error;
  } else {
    // Insert new herb
    const { data, error } = await supabase
      .from("herbs")
      .insert({
        name: herbData.name,
        slug: herbData.slug,
        latin_name: herbData.latin_name,
        description: herbData.description,
        traditional_uses: herbData.traditional_uses,
        preparation_dosage: herbData.preparation_dosage,
        safety_warnings: herbData.safety_warnings,
        is_published: herbData.is_published,
      })
      .select("id")
      .single();
    if (error) throw error;
    herbId = data.id;
  }

  // Sync tags
  await supabase.from("herb_tags").delete().eq("herb_id", herbId);
  if (tags.length > 0) {
    const tagInserts = tags.map((tag) => ({ herb_id: herbId, tag }));
    await supabase.from("herb_tags").insert(tagInserts);
  }

  // Sync condition links
  await supabase.from("herb_conditions").delete().eq("herb_id", herbId);
  if (conditionIds.length > 0) {
    const condInserts = conditionIds.map((cid) => ({
      herb_id: herbId,
      condition_id: cid,
    }));
    await supabase.from("herb_conditions").insert(condInserts);
  }

  return { success: true, herbId };
}

export async function upsertCondition(condData: {
  id?: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  category_id: string;
}) {
  const supabase = createAdminClient();

  if (condData.id) {
    const { error } = await supabase
      .from("conditions")
      .update({
        name: condData.name,
        slug: condData.slug,
        description: condData.description,
        emoji: condData.emoji,
        category_id: condData.category_id,
      })
      .eq("id", condData.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("conditions").insert({
      name: condData.name,
      slug: condData.slug,
      description: condData.description,
      emoji: condData.emoji,
      category_id: condData.category_id,
    });
    if (error) throw error;
  }

  return { success: true };
}

export async function deleteCondition(conditionId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("conditions")
    .delete()
    .eq("id", conditionId);
  if (error) throw error;
  return { success: true };
}
