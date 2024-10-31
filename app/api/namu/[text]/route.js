// app/api/namu/route.js
import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function GET(request, { params }) {
  const { text } = await params;
  const url = `https://namu.wiki/w/${text}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  });

  const htmlString = await response.text();

  // JSDOM으로 HTML 문자열을 파싱하여 DOM 생성
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  // 데이터 추출 (예: 페이지 제목과 특정 요소)
  const title = document.querySelector('meta[property="og:title"]').getAttribute('content');

  const img = document.querySelector('meta[property="og:image"]').getAttribute('content');

  return NextResponse.json({ title, img });
}
