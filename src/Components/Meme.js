import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';

const Meme = () => {
  const [copied, setCopied] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');
  const clipboard = useClipboard();

  const copyURL = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  return (
    <>
      {url && <img src={url} alt='meme' />}
      <button onClick={copyURL}>
        {copied ? 'URL is in clipboard' : 'Click to copy'}
      </button>
    </>
  );
};

export default Meme;
