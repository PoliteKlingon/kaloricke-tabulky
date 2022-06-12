import {styled} from "@mui/system";
import {FC} from "react";
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

const FoodImg = styled("img")({
  maxHeight: "10rem",
  width: "auto",

});

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


const FoodDetails:FoodDetailsType = ({food}) => {
  return (
      <Container>
        <InfoDiv>
          <PaddedDiv>
            <PaddedDiv>
              {food.name}
            </PaddedDiv>
            <PaddedDiv sx={{display:"flex", flexDirection: "row", alignItems: "baseline", gap: "0.5rem"}}>
              <Typography>
                Množství
              </Typography>
              <TextField
                label={100}
                variant="standard"
                margin="none"
              />
              x 1g
              <AddButton>
                Zapsat potravinu do jídelnčku
              </AddButton>
            </PaddedDiv>
          </PaddedDiv>
          <FoodImg src={food.photo} alt={food.name}/>
        </InfoDiv>
        <PaddedDiv>
          <Grid container>
            <Grid item xs={4}>
              Energicka hodnota
              <ValuesDiv>
                {food.caloric_value} kcal
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Bíloviny
              <ValuesDiv>
                {food.proteins} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Sacharidy
              <ValuesDiv>
                {food.carbs} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Tuky
              <ValuesDiv>
                {food.fats} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={2}>
              Vláknina
              <ValuesDiv>
                {food.fiber} g
              </ValuesDiv>
            </Grid>
          </Grid>
        </PaddedDiv>
        <PaddedDiv>
          <Table>
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
                  Cukry
                </TableCell>
                <TableCell>
                  {food.sugar} g
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
                  Nasýcene tuky
                </TableCell>
                <TableCell>
                  {food.saturated_fats} g
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
