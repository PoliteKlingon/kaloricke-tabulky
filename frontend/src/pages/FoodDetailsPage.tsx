import { styled } from "@mui/system";
import {CssBaseline, Typography} from "@mui/material";
import Header from "../components/Header";
import Features from "../components/Features";
import {Hero} from "./MainPage";
import {FC} from "react";

interface FoodDetailsPageProps {
    calories?: number
}

type FoodDetailsPageType = FC<FoodDetailsPageProps>;

const FoodDetailsPage:FoodDetailsPageType = ({calories}) => {
  return (
    <Hero>
      <CssBaseline />
      <Header />
      <Typography sx={{}}>{calories}</Typography>
    </Hero>
  );
};

export default FoodDetailsPage;
