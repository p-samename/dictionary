'use client';
import { useState } from 'react';

export default function Home() {
  const [namu, setNamu] = useState();
  const [inputText, setInputText] = useState('');
  const getData = async (value) => {
    try {
      setNamu('');
      const encodedValue = encodeURI(value);
      const response = await fetch(`/api/namu/${encodedValue}`);
      const data = await response.json();
      setNamu(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>test</h1>

      <div className="mt-[12px]">
        <input className="" onChange={(e) => setInputText(e.target.value)} type="text" />
        <button onClick={() => getData(inputText)}>전송</button>
      </div>

      {namu && (
        <div>
          <img src={namu.img} alt="" />
        </div>
      )}
    </>
  );
}
