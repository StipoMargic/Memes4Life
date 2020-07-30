import React, { useEffect, useState } from 'react';
import './App.css';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [memes, setMemes] = useState([]);

  const history = useHistory();

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

  const postMeme = async () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append('username', 'stipo12');
    formData.append('password', 'abcd1234');
    formData.append('template_id', currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    try {
      const response = await (
        await fetch('https://api.imgflip.com/caption_image', {
          method: 'POST',
          body: formData,
        })
      ).json();

      history.push(`/meme?url=${response.data.url}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch('https://api.imgflip.com/get_memes')
      ).json();

      setMemes(response.data.memes);
    })();
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
      <button onClick={() => postMeme()}>Make meme</button>
      {captions.map((c, index) => (
        <input onChange={(e) => updateCaptions(e, index)} key={index} />
      ))}
      {memes.length && <img src={memes[memeIndex].url} alt='MEME' />}
    </>
  );
};

export default Home;
