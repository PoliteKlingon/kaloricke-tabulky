import { useEffect, useState, useContext } from "react";
import AddFoodModal from "./AddFoodModal";
import { Box, Button, CircularProgress, Collapse, Grid, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/system";
import AuthContext from "../../context/AuthProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "../../api/axios";

const AnimatedButton = styled(Button)({
  fontSize: 30,
  fontFamily: "Nunito",
  fontWeight: "bold",
  transition: "transform 0.5s",
  ":hover": {
    backgroundColor: "transparent",
    transform: "scale(1.3)",
  },
});

const RecordBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 1,
  m: 1,
  borderRadius: 3,
  border: "3px solid",
  width: "100%",
  borderColor: "#f7e9bc",
  fontSize: "1.5rem",
  fontFamily: "Nunito",
  fontWeight: "600",
  backgroundColor: "#faf5e6",
})

const MainMeals = ["Snídaně", "Dopolední svačina", "Oběd", "Odpolední svačina", "Večeře"];

const test = [
  {
    name: "AAA",
    calories: "100",
    type: "snídaně",
  },
  {
    name: "BBB",
    calories: "200",
    type: "snídaně",
  },
  {
    name: "CCC",
    calories: "300",
    type: "oběd",
  },
];

const getMeals = async (ssid: string) => {
  // TODO: get meals from server
  // await axios.get(`/api/meals/${ssid}`).then((res) => {})
  // .then((res) => {
  //   return [
  //     {
  //       name: "CCC",
  //       calories: "300",
  //       type: "oběd",
  //     },
  //   ];
  // }
  // )
  // .catch((err) => {
  //   alert("Nastala chyba při načítání jídla, prosím zkuste obnovit stránku")}
  //   );
}

const HomeContent = () => {
  // @ts-ignore
  const { auth } = useContext(AuthContext);
  const [slectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  console.log(showAddFoodModal);
  const [meals, setMeals] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const data = await getMeals(auth.ssid);
      //setMeals(data);
    }
    
    fetchMeals();
  }, [slectedDate]);

  const [calories, setCalories] = useState(0);

  const handleModalClose = () => {
    setShowAddFoodModal(false);
    //fetchRecords();
  };


  return (
    <>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        pt={2}
      >
        <Grid item xs={1} display="flex" justifyContent="center">
          <AnimatedButton
            variant="text"
            sx={{
              color: "#edc69f",
              ":active": {
                color: "#edd9be",
              },
            }}
            disableRipple
          >
            <ArrowBackIcon sx={{ fontSize: 60 }} />
          </AnimatedButton>
        </Grid>
        <Grid item xs={3} sm={5} display="flex" justifyContent="center">
          <DatePicker
            disableFuture
            label="Vyberte den"
            openTo="day"
            value={slectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
            inputFormat="dd.MM.yyyy"
          />
        </Grid>
        <Grid item xs={1} display="flex" justifyContent="center">
          <AnimatedButton
            variant="text"
            sx={{
              color: "#edc69f",
              ":active": {
                color: "#edd9be",
              },
            }}
            disableRipple
          >
            <ArrowForwardIcon sx={{ fontSize: 60 }} />
          </AnimatedButton>
        </Grid>
      </Grid>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        pt={5}
      >
        <Grid
          container
          item
          xs={5}
          direction="column"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {MainMeals.map((meal: string) => {
            return <FoodMilestone eaten={test} name={meal} />;
          })}
        </Grid>
        <Grid
          container
          item
          xs={2}
          direction="column"
          display="flex"
          alignItems="center"
        >
          <Grid item xs={2}>
            <TripleProgressBar
              desired={1000}
              value={2100}
              unit="kcal"
              size={200}
              main={true}
            />
          </Grid>
          <Grid container>
            <SingleNutrientbar
              name="Sacharidy"
              desired={1000}
              value={1600}
              unit="g"
              size={100}
              isMain={false}
            />
            <SingleNutrientbar
              name="Bílkoviny"
              desired={1000}
              value={875}
              unit="g"
              size={100}
              isMain={false}
            />
            <SingleNutrientbar
              name="Tuky"
              desired={1000}
              value={74}
              unit="g"
              size={100}
              isMain={false}
            />
            <SingleNutrientbar
              name="Vláknina"
              desired={1000}
              value={2870}
              unit="g"
              size={100}
              isMain={false}
            />
          </Grid>
          <Button onClick={() => setShowAddFoodModal(true)} variant="contained">
            Add food
          </Button>
          <AddFoodModal
            date={slectedDate}
            open={open}
            handleClose={handleModalClose}
          />
        </Grid>
      </Grid>
    </>
  );
}

const FoodMilestone = (params: any) => {
  return (
    <Grid container item sx={{ width: "100%" }} direction="column">
      <Grid item>
        <RecordBox
          component="span"
          sx={{
            p: 1,
            my: 1,
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{
              fontFaminy: "Nunito",
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            {params.name}
          </Typography>
          <AnimatedButton disableRipple>
            <AddIcon sx={{ color: "green", fontSize: "1.8rem" }} />
          </AnimatedButton>
        </RecordBox>
      </Grid>
      <Grid item>
        {params.eaten.map((item: any) => {
          if (item.type.toLowerCase() === params.name.toLowerCase()) {
            return <FoodRecord name={item.name} calories={item.calories} />;
          }
        })}
      </Grid>
    </Grid>
  )
}

const FoodRecord = (params: any) => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 1,
        mx: 1,
        fontSize: "1.5rem",
        fontFamily: "Nunito",
        fontWeight: "400",
      }}
    >
      <Typography
        sx={{
          fontFaminy: "Nunito",
          fontSize: "1rem",
          fontWeight: 400,
          px: 1,
          mx: 1,
        }}
      >
        {params.name}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            fontFaminy: "Nunito",
            fontSize: "1rem",
            fontWeight: 400,
            p: 1,
            m: 1,
          }}
        >
          {params.calories} kcal
        </Typography>
        <AnimatedButton disableRipple>
          <InfoOutlinedIcon sx={{ color: "gray", fontSize: "1.5 rem" }} />
        </AnimatedButton>
        <AnimatedButton disableRipple>
          <DeleteIcon sx={{ color: "gray", fontSize: "1.5 rem" }} />
        </AnimatedButton>
      </Box>
    </Box>
  );
}

const SingleNutrientbar = (params: any) => {
  return (
    <Grid
      item
      xs={6}
      display="grid"
      alignItems="center"
      justifyContent="center"
      pt={3}
    >
      <Typography textAlign="center" fontFamily="Nunito" fontWeight="bold">
        {params.name}
      </Typography>
      <TripleProgressBar
        desired={params.desired}
        value={params.value}
        unit={params.unit}
        size={params.size}
        main={params.isMain}
      />
      <Typography textAlign="center" fontFamily="Nunito" fontWeight="bold" pt="1rem">
        {params.value}
        {params.unit}
      </Typography>
      <Typography textAlign="center" fontFamily="Nunito">
        z {params.desired}
        {params.unit}
      </Typography>
    </Grid>
  );
}

const TripleProgressBar = (params: any) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex"}}>
      <CircularProgress
        variant="determinate"
        value={
          Math.round(
            Math.min(Math.max((params.value / params.desired) * 100, 0), 100) *
              10
          ) / 10
        }
        size={params.size}
        color="success"
        thickness={5}
      />
      <CircularProgress
        variant="determinate"
        value={
          (params.value / params.desired) * 100 < 100
            ? 0
            : Math.round(
                Math.min(
                  Math.max((params.value / params.desired) * 100 - 100, 0),
                  100
                ) * 10
              ) / 10
        }
        size={params.size}
        color="warning"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={
          (params.value / params.desired) * 100 < 200
            ? 0
            : Math.round(
                Math.min(
                  Math.max((params.value / params.desired) * 100 - 200, 0),
                  100
                ) * 10
              ) / 10
        }
        size={params.size}
        color="error"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {params.main ? (
          <>
            <Typography
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1.3rem"
            >
              {Math.round((params.value / params.desired) * 100 * 10) / 10}%
            </Typography>
            <Typography
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1.5rem"
              fontWeight="bold"
            >
              {params.value}
              {params.unit}
            </Typography>
            <Typography textAlign="center" fontFamily="Nunito" fontSize="1rem">
              z {params.desired} {params.unit}
            </Typography>
          </>
        ) : (
          <Typography textAlign="center" fontFamily="Nunito" fontSize="1.3rem">
            {Math.round((params.value / params.desired) * 100 * 10) / 10}%
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default HomeContent;