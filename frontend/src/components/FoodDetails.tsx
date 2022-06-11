import {styled} from "@mui/system";
import {FC} from "react";

interface Food {
  name: string,
  photo: string,
  description: string,
  caloric_value: number,
  sugar: number,
  salt: number,
  carbs: number,
  proteins: number,
  fats: number,
  saturated_fats: number,
  fiber: number,
  id: string
}

interface FoodDetailsProps {
  food: Food
}

type FoodDetailsType = FC<FoodDetailsProps>;

const Container = styled("div")({
  backgroundColor: "white",
  margin: "10%",
  minWidth: "60vw",
  display: "flex"
});

const FoodDetails:FoodDetailsType = ({food}) => {
  return (
      <Container>
        {food.name}
        bla cla dadkjfi fh YXH
      </Container>
    )
};

export default FoodDetails;
