import {styled} from "@mui/system";
import {FC, useEffect, useState, useContext} from "react";
import {
  Box,
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid, MenuItem, Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import axios from "../../api/axios";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import AuthContext from "../../context/AuthProvider";
import { Navigate } from "react-router-dom"
import TripleProgressBar from "../Utils/TripleProgressBar";

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
  borderRadius: "15px",
  fontFamily: "nunito",
  backgroundColor: "white",
  margin: "2% 15%",
  padding: "0.75%",
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
  flexDirection: "column",
  // gap: "0",
  // justifyContent: "space-between",
  // padding: "1.25rem"
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

// @ts-ignore
const DetailsWindow = ({amount, food}) => {
  const [mealType, setMealType] = useState("lunch")
  const [date, setDate] = useState(new Date())

  // @ts-ignore
  const { auth } = useContext(AuthContext);

  const saveFood = async (food:Food, grams:number, mealType: string, date: string) => {
    console.log(auth);
    try {
      const body = JSON.stringify({
        foodId: food.id,
        date: date,
        grams: grams,
        mealType: mealType,
      });
      console.log(body);
      axios
        .post("/diary", body, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.ssid}`
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

  const dateString =
    String(date?.getFullYear()) +
    "-" +
    // @ts-ignore
    String(date?.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date?.getDate()).padStart(2, "0") + "T10:00:00";

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-around"}
      gap={"1rem"}
    >
      <Select
        value={mealType}
        label="mealType"
        onChange={
          (event) => setMealType(event.target.value)}
      >
        <MenuItem value={"breakfast"}>Snídaně</MenuItem>
        <MenuItem value={"morningsnack"}>Dopolední svačina</MenuItem>
        <MenuItem value={"lunch"}>Oběd</MenuItem>
        <MenuItem value={"afternoonsnack"}>Odpolední svačina</MenuItem>
        <MenuItem value={"dinner"}>Večeře</MenuItem>
      </Select>
      <DatePicker
        disableFuture
        label="Vyberte den"
        openTo="day"
        value={date}
        // @ts-ignore
        onChange={(event) => setDate(event)}
        renderInput={(params: any) => <TextField {...params} />}
      />
      <Button onClick={() => saveFood(food, amount, mealType, dateString)}>
        submit
      </Button>
    </Box>
  )
};


const FoodDetails:FoodDetailsType = ({food}) => {
  const [amount, setAmount] = useState<number>(100);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleCloseSubmit = () => {
  //   setOpen(false);
  // };

  const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // @ts-ignore
  const { auth } = useContext(AuthContext);

  return (
      <Container>
        {(auth.ssid == null || auth.ssid == "") && <Navigate to='/login'  />}
        <InfoDiv>
          <PaddedDiv>
            <strong>{food.name}</strong>
          </PaddedDiv>
          <PaddedDiv
            sx={{
              display:"flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "0.5rem",
              justifyContent: "space-between",
          }}>
            <PaddedDiv sx={{display:"flex", flexDirection: "row", alignItems: "baseline", gap: "0.5rem", padding:"0"}}>
              <Typography>
                Množství
              </Typography>
              <TextField
                defaultValue={100}
                variant="standard"
                margin="none"
                onChange={(amount) => {setAmount(+amount.target.value)}}
              />
              <div>
                x&nbsp;1g
              </div>
            </PaddedDiv>
            <PaddedDiv>
              <AddButton
                onClick={handleClickOpen}
              >
                {isDesktop ? "Zapsat potravinu do jídelnčku" : "Zapsat"}
              </AddButton>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  Vyberte typ jídla a datum
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pro uložení jídla do jídelníčku, prosím vyberte datum konzumace a druh
                  </DialogContentText>
                  <DetailsWindow amount={amount} food={food}/>
                </DialogContent>
              </Dialog>
            </PaddedDiv>
          </PaddedDiv>
          {/*<FoodImg src={food.photo} alt={food.name}/>*/}
        </InfoDiv>
        <PaddedDiv>
          <Grid container>
            <Grid item xs={isDesktop ? 4 : 12}>
              Energicka hodnota
              <ValuesDiv>
                {getValueMultiplied(food.calories, amount)} kcal
              </ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Bíloviny
              <ValuesDiv>
                {getValueMultiplied(food.proteins, amount)} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Sacharidy
              <ValuesDiv>
                {getValueMultiplied(food.carbs, amount)} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Tuky
              <ValuesDiv>
                {getValueMultiplied(food.fats, amount)} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Vláknina
              <ValuesDiv>
                {getValueMultiplied(food.fiber, amount)} g
              </ValuesDiv>
            </Grid>
          </Grid>
        </PaddedDiv>
        <PaddedDiv>
          <Table sx={{width: isDesktop ? "50%" : "100%"}}>
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
          <div>
            {/*<TripleProgressBar params={food}/>*/}

          </div>
        </PaddedDiv>
      </Container>
    )
};

export default FoodDetails;
