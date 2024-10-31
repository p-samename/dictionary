import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    if (!text) {
      return NextResponse.json({ error: 'text parameter is required' }, { status: 400 });
    }

    const url = `https://namu.wiki/w/${text}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the page' }, { status: response.status });
    }

    const htmlString = await response.text();
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const img = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

    return NextResponse.json({ img, title });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
