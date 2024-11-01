'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [namu, setNamu] = useState();
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);

  const getData = async (value) => {
    try {
      setNamu(null);
      setError(null);
      const encodedValue = encodeURI(value);
      const response = await fetch(`/api/namu/${encodedValue}`);

      // 응답 상태 코드 확인
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setNamu(data);
    } catch (err) {
      console.log(err);
      setError('데이터를 불러오는 데 실패했습니다.');
    }
  };

  return (
    <>
      <h1>test</h1>

      <div className="mt-[12px]">
        <input className="" onChange={(e) => setInputText(e.target.value)} type="text" value={inputText} />
        <button onClick={() => getData(inputText)}>전송</button>
      </div>

      {error && <p>{error}</p>}

      {namu && (
        <div className="w-max h-max">
          <h1>{namu.title}</h1>

          <Image width={500} height={500} src={namu.img} alt={namu.title} />
        </div>
      )}
    </>
  );
}
