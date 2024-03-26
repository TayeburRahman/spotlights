import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Section2 = () => {
  const sentence = 'AI Productivity Tools ✔  AI Video Generators ✔ AI Text Generators ✔ AI Image Generators ✔ AI Art Generators ✔ AI Audio Generators ✔ Misc AI Tools ✔ AI Code Generators ✔';
  const [marqueeText, setMarqueeText] = useState(sentence);

  useEffect(() => {
    // Function to continuously append the sentence
    const updateMarqueeText = () => {
      setMarqueeText(prevText => prevText + sentence);
    };

    // Update the marquee text at regular intervals (adjust the interval as needed)
    const intervalId = setInterval(updateMarqueeText, 1000);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // E
  return (
    <div className="dark:bg-[#ffffff] try-it-e dark:mt-14">
      <div className='text-center align-center try-it'>
        <h1 className='text-6xl  max-md:text-[2rem] text-center capitalize font-medium mt-5 line-2 dark:text-black dark:font-semibold dark:text-[4rem] dark:max-md:text-[2.5rem]'>
          {/* ✨Hey, you have an Product ?  */}
          ✨Hey, you have an Ai Product ?
        </h1>
        <p className='m-10 dark:text-black dark:font-medium dark:max-md:text-[14px]'>Use Ai Spotlights to get listed on the largest AI tools Directory<br /> Showcase your products powerful features to get a head from the competition </p>
        <marquee behavior="scroll" direction="right">{marqueeText}{marqueeText}</marquee>
        <marquee behavior="scroll" direction="left">{marqueeText}{marqueeText}</marquee>
        <button><Link to='/submit-tools'>Submit your Tool</Link></button>
      </div>
    </div>
  )
}

export default Section2