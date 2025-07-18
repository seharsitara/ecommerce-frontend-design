import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE! // ✅ Server-side secret
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, image_url, category } = body;

    // Validate input
    if (
      !name ||
      typeof name !== 'string' ||
      !category ||
      typeof category !== 'string' ||
      !image_url ||
      typeof image_url !== 'string' ||
      price === undefined ||
      price === null ||
      isNaN(Number(price))
    ) {
      return NextResponse.json({ error: 'Invalid or missing fields' }, { status: 400 });
    }

    const { error } = await supabase.from('products').insert([
      { name, price: Number(price), image_url, category },
    ]);

    if (error) {
      // Optionally log error for debugging
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product uploaded!' }, { status: 200 });
  } catch (err) {
    // Handle JSON parse errors or unexpected issues
    console.error('API error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}