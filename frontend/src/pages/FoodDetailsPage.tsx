import { styled } from "@mui/system";
import {CssBaseline} from "@mui/material";
import {MainAppBar} from "../components/Header";
import FoodDetails from "../components/FoodDetails"
import {Hero} from "./MainPage";

const FlexedHero = styled(Hero)({
  display: "flex",
  justifyContent: "center",
});

type FoodDetailsPageType = FC<FoodDetailsPageProps>;

const FoodDetailsPage:FoodDetailsPageType = ({calories}) => {
  return (
    <FlexedHero>
      <CssBaseline />
    </FlexedHero>
  );
};

export default FoodDetailsPage;
