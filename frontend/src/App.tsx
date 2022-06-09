import React from 'react';
import { styled } from "@mui/system";
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import Features from './components/Features';

const Hero = styled("div")({
  minHeight: "100vh",
  backgroundImage: `url(${import.meta.env.VITE_PUBLIC_URL + "/assets/background.jpg"})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const App = () => {
  return (
    <Hero>
        <CssBaseline />
        <Header />
        <Features />
    </Hero>
  );
}

export default App;