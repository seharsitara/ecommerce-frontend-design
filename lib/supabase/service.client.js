// lib/supabase/service.client.js

import { createClient } from "@supabase/supabase-js";

export async function serviceAuthClient() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return client;
}