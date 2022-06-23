import { styled } from "@mui/system";
import {CssBaseline} from "@mui/material";
// import {MainAppBar} from "../components/Header";
import FoodDetails, {Food} from "../components/FoodDetails";
import {Hero} from "./MainPage";
import axios from "../api/axios";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";

const FlexedHero = styled(Hero)({
  display: "flex",
  justifyContent: "center",
});

const FoodDetailsPage = () => {
  // TODO: development only remove later
  const tempData = { "name": "banan", "photo": "https://www.lovemysalad.com/sites/default/files/styles/home_carousel_item_768/public/banaan-large.jpg?itok=qRLZa1EH", "description": "asdkfalsjdfk;ljds", "calories": 123, "sugar": 69, "salt": 4, "carbs": 22, "proteins": 1, "fats": 2, "saturated_fats": 1, "fiber": 69, "id": "314reajfo34u" };

  const [food, setFood] = useState<Food>(tempData);
  let { id } = useParams();
  try {
    useEffect(() => {
      axios
        .get(`/food/${id}`)
        .then((response) => {
          // console.log(response.data)
          setFood(response?.data?.data)
        });
    })
  } catch (err) {
    // <Navigate to="/" />
    console.log(err)
  }

  return (
    <FlexedHero>
      <CssBaseline />
      {/*<MainAppBar />*/}
      <FoodDetails food={food}/>
    </FlexedHero>
  );
};

export default FoodDetailsPage;
