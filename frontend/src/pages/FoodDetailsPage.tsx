import { styled } from "@mui/system";
import {CssBaseline} from "@mui/material";
import {MainAppBar} from "../components/Header";
import FoodDetails from "../components/FoodDetails"

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
