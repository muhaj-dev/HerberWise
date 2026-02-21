"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Comment } from "@/types";

export function useComments(herbId?: string, conditionId?: string) {
  const supabase = createClient();

  return useQuery<Comment[]>({
    queryKey: ["comments", herbId, conditionId],
    queryFn: async () => {
      let query = supabase
        .from("comments")
        .select("*, profiles(full_name)")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (herbId) {
        query = query.eq("herb_id", herbId);
      }
      if (conditionId) {
        query = query.eq("condition_id", conditionId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!herbId || !!conditionId,
  });
}
