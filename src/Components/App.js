import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [memes, setMemes] = useState([]);

  const updateCaptions = (e, index) => {
    let text = e.target.value || '';

    setCaptions(
      captions.map((c, i) => {
        if (i === index) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then((res) => {
      res.json().then((res) => {
        const response = res.data.memes;
        setMemes(response);
      });
    });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes]);

  return (
    <>
      <button onClick={() => setMemeIndex((prev) => prev + 1)}>
        Next Meme
      </button>
      {captions.map((c, index) => (
        <input onChange={(e) => updateCaptions(e, index)} key={index} />
      ))}
      {memes.length && <img src={memes[memeIndex].url} alt='MEME' />}
    </>
  );
};

export default App;
