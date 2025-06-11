// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/website/sitemap`);
  const text = await res.text();
  console.log(text)

  return new NextResponse(text, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
