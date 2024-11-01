// app/api/namu/[text]/route.js
import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function GET(request, { params }) {
  const { text } = await params; // URL 경로의 'text' 파라미터를 추출
  const url = `https://namu.wiki/w/${text}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    const htmlString = await response.text();

    // JSDOM으로 HTML 문자열을 파싱하여 DOM 생성
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    // 데이터 추출 (예: 페이지 제목과 특정 요소)
    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || 'No title found';
    const img = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || 'No image found';

    // 정상적인 JSON 응답 반환
    return NextResponse.json({ title, img });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
