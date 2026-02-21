"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Condition, Herb } from "@/types";

interface ConditionWithHerbs extends Condition {
  herbs: Herb[];
}

export function useCondition(slug: string) {
  const supabase = createClient();

  return useQuery<ConditionWithHerbs>({
    queryKey: ["condition", slug],
    queryFn: async () => {
      // Get the condition with its category
      const { data: condition, error: condError } = await supabase
        .from("conditions")
        .select("*, category:categories(*)")
        .eq("slug", slug)
        .single();

      if (condError) throw condError;

      // Get linked herbs via herb_conditions
      const { data: herbLinks, error: linkError } = await supabase
        .from("herb_conditions")
        .select("herb_id")
        .eq("condition_id", condition.id);

      if (linkError) throw linkError;

      let herbs: Herb[] = [];
      if (herbLinks && herbLinks.length > 0) {
        const herbIds = herbLinks.map((link) => link.herb_id);
        const { data: herbData, error: herbError } = await supabase
          .from("herbs")
          .select("*, herb_tags(*)")
          .in("id", herbIds)
          .eq("is_published", true);

        if (herbError) throw herbError;
        herbs = herbData as Herb[];
      }

      return { ...condition, herbs } as ConditionWithHerbs;
    },
    enabled: !!slug,
  });
}
