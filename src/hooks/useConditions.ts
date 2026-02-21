"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Condition } from "@/types";

export function useConditions(category?: string) {
  const supabase = createClient();

  return useQuery<Condition[]>({
    queryKey: ["conditions", category],
    queryFn: async () => {
      let query = supabase
        .from("conditions")
        .select("*, category:categories(*)");

      if (category) {
        query = query.eq("categories.slug", category);
      }

      const { data, error } = await query.order("name");

      if (error) throw error;

      // Filter out conditions where category join returned null (when filtering by category)
      if (category) {
        return (data as Condition[]).filter((c) => c.category !== null);
      }

      return data as Condition[];
    },
  });
}
