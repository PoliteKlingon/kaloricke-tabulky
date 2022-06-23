import {styled} from "@mui/system";
import {FC, useEffect, useState} from "react";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import axios from "../../api/axios";

export interface Food {
  name: string,
  // photo: string,
  description: string,
  calories: number,
  proteins: number,
  carbs: number,
  fats: number,
  fiber: number,
  salt: number,
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
  display: "flex",
  flexDirection: "column",
});

const PaddedDiv = styled(Box)({
  padding: "1.25rem",
  // display: "flex",
  // flexDirection: "row",
});

/**
const CategoryDiv = styled(PaddedDiv)({
  fontSize: "0.75rem",
}); **/

const InfoDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "1.25rem"
});

// const FoodImg = styled("img")({
//   maxHeight: "10rem",
//   width: "auto",
// });

const ValuesDiv = styled("div")({
  fontSize: "1.25rem",
});

const AddButton = styled(Button)({
  variant: "contained",
  backgroundColor: "#eb9b34",
  color: "white",
  ":hover": {
    backgroundColor: "#edc48c",
  },
});


const getValueMultiplied = (value: number, multiplier: number) => {
  return (value * multiplier/100).toFixed(2).replace(/[.,]00$/, "")
};

const saveFood = async (food:Food, grams:number) => {
  try {
    const body = JSON.stringify({
      foodId: food.id,
      date: "23.6.2022",
      grams: {grams},
      mealType: "lunch",
    });
    console.log(body);
    axios
      .post("/diary", body, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${auth.ssid}`
        }
      })
      .then((result) => {
        console.log(body)
        // handleClose();
        // setFoodName("");
      }).catch((e) => {
      console.log(e)
    });
  } catch (e) {
    console.log(e);
  }
}


const FoodDetails:FoodDetailsType = ({food}) => {
  const [amount, setAmount] = useState(100);

  return (
      <Container>
        <InfoDiv>
          <PaddedDiv>
            <PaddedDiv>
              <strong>{food.name}</strong>
            </PaddedDiv>
            <PaddedDiv sx={{display:"flex", flexDirection: "row", alignItems: "baseline", gap: "0.5rem"}}>
              <Typography>
                Množství
              </Typography>
              <TextField
                defaultValue={100}
                variant="standard"
                margin="none"
                onChange={(amount) => {setAmount(+amount.target.value)}}
              />
              x&nbsp;1g
              <AddButton
                onClick={() => {saveFood(food, amount)}}
              >
                Zapsat potravinu do jídelnčku
              </AddButton>
            </PaddedDiv>
          </PaddedDiv>
          {/*<FoodImg src={food.photo} alt={food.name}/>*/}
        </InfoDiv>
        <PaddedDiv>
          <Grid container>
            <Grid item xs={4}>
              Energicka hodnota
              <ValuesDiv>
                {getValueMultiplied(food.calories, amount)} kcal
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Bíloviny
              <ValuesDiv>
                {getValueMultiplied(food.proteins, amount)} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Sacharidy
              <ValuesDiv>
                {getValueMultiplied(food.carbs, amount)} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Tuky
              <ValuesDiv>
                {getValueMultiplied(food.fats, amount)} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Vláknina
              <ValuesDiv>
                {getValueMultiplied(food.fiber, amount)} g
              </ValuesDiv>
            </Grid>
          </Grid>
        </PaddedDiv>
        <PaddedDiv>
          <Table sx={{width: "50%"}}>
            <TableHead>
              Nutricni hodnoty na 100g
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  Bílkoviny
                </TableCell>
                <TableCell>
                  {food.proteins} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Sacharidy
                </TableCell>
                <TableCell>
                  {food.carbs} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Tuky
                </TableCell>
                <TableCell>
                  {food.fats} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Vláknina
                </TableCell>
                <TableCell>
                  {food.fiber} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Sul
                </TableCell>
                <TableCell>
                  {food.salt} g
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>

        </PaddedDiv>
      </Container>
    )
};

export default FoodDetails;
