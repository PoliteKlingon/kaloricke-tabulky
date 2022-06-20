// @ts-ignore
import { useState, useEffect } from "react";
import CrossfadeImg from "react-crossfade-img";

const ChangingImage = (props: any) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, props.interval);
    return () => clearInterval(interval);
  }, []);

  return (
    <CrossfadeImg
      src={
        import.meta.env.VITE_PUBLIC_URL +
        "/assets/slideshow/" +
        props.slides[seconds % props.slides.length].name
      } // Image URL
      width="100%"
      height="100%"
      objectFit="cover"
      duration="1s"
    />
  );
};

export default ChangingImage;
