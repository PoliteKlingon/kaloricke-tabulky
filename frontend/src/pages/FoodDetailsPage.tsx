import { styled } from "@mui/system";
import {CssBaseline} from "@mui/material";
import {MainAppBar} from "../components/Header";
import FoodDetails from "../components/FoodDetails";
import {Hero} from "./MainPage";

const FlexedHero = styled(Hero)({
  display: "flex",
  justifyContent: "center",
});

const FoodDetailsPage = () => {
  // TODO: development only remove later
  const tempData = { "name": "banan", "photo": "www.pornhub.com/asduixciyxuzcvb", "description": "asdkfalsjdfk;ljds", "caloric_value": 123, "sugar": 69, "salt": 4, "carbs": 22, "proteins": 1, "fats": 2, "saturated_fats": 1, "fiber": 69, "id": "314reajfo34u" }

  return (
    <FlexedHero>
      <CssBaseline />
      <MainAppBar />
      <FoodDetails food={tempData}/>
    </FlexedHero>
  );
};

export default FoodDetailsPage;
