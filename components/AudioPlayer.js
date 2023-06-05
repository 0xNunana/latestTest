import React, { useEffect } from 'react';

const AudioPlayer = ({ src }) => {


  return <audio src={src} controls className='w-full' autoPlay />;
};
export default AudioPlayer