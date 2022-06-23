import { useEffect, useState, useContext } from "react";
import AddFoodModal from "./AddFoodModal";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
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
});

const MainMeals = [
  {
    name: "Snídaně",
    type: "breakfast",
  },
  {
    name: "Dopolední svačina",
    type: "morningsnack",
  },
  {
    name: "Oběd",
    type: "lunch",
  },
  {
    name: "Odpolední svačina",
    type: "afternoonsnack",
  },
  {
    name: "Večeře",
    type: "dinner",
  },
];

const HomeContent = () => {
  // @ts-ignore
  const { auth } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState<string>("");
  const [meals, setMeals] = useState({});
  const [goals, setGoals] = useState({
    calories: Infinity,
    proteins: Infinity,
    carbs: Infinity,
    fats: Infinity,
    fiber: Infinity,
  });
  const [eaten, setEaten] = useState({calories: 0, proteins: 0, carbs: 0, fats: 0, fiber: 0});
  const dateString =
    String(selectedDate?.getFullYear()) +
    "-" +
    // @ts-ignore
    String(selectedDate?.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(selectedDate?.getDate()).padStart(2, "0") + "T10:00:00";

  const fetchMeals = async () => {
    await axios
      .get(`diary/${dateString}`, {
        headers: {
          Authorization: `Bearer ${auth.ssid}`,
        },
      })
      .then((res) => {
        setMeals(res.data.data);
        let calories = 0;
        let proteins = 0;
        let carbs = 0;
        let fats = 0;
        let fiber = 0;
        res.data.data.forEach((meal:any) => {
          const coef = meal.grams / 100;
          calories += coef * meal.food.calories;
          proteins += coef * meal.food.proteins;
          carbs += coef * meal.food.carbs;
          fats += coef * meal.food.fats;
          fiber += coef * meal.food.fiber;
        })
        calories = Math.round(calories);
        proteins = Math.round(proteins);
        carbs = Math.round(carbs);
        fats = Math.round(fats);
        fiber = Math.round(fiber);
        setEaten({calories, proteins, carbs, fats, fiber});
      })
      .catch(() => {
        alert(
          "Nastala chyba při načítání jídla, prosím, zkuste obnovit stránku"
        );
      });
  }

  const fetchGoals = async () => {
    await axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${auth.ssid}`,
        },
      })
      .then((res) => {
        setGoals(res.data.data.goals);
      })
      .catch(() => {
        alert(
          "Nastala chyba, prosím, zkuste obnovit stránku"
        );
      });
  }

  useEffect(() => {
    fetchMeals();
    fetchGoals();
    console.log(dateString);
  }, [selectedDate,]);

  const handleModalClose = () => {
    setShowAddFoodModal(false);
    fetchMeals();
  };

  const handleModalOpen = (type:string) => {
    setSelectedFoodType(type);
    setShowAddFoodModal(true);
  }

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
            onClick={() => {
              let date1 = selectedDate ? selectedDate : new Date();
              setSelectedDate(
                new Date(new Date(date1).setDate(date1.getDate() - 1))
              );
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 60 }} />
          </AnimatedButton>
        </Grid>
        <Grid item xs={3} sm={5} display="flex" justifyContent="center">
          <DatePicker
            disableFuture
            label="Vyberte den"
            openTo="day"
            value={selectedDate}
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
            disabled={
              selectedDate !== null &&
              selectedDate.getDate() === new Date().getDate() &&
              selectedDate.getMonth() === new Date().getMonth() &&
              selectedDate.getFullYear() === new Date().getFullYear()
            }
            onClick={() => {
              let date1 = selectedDate ? selectedDate : new Date();
              setSelectedDate(
                new Date(new Date(date1).setDate(date1.getDate() + 1))
              );
            }}
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
          {MainMeals.map((single: any) => {
            return (
              <FoodMilestone
                eaten={meals}
                name={single.name}
                type={single.type}
                showModal={handleModalOpen}
              />
            );
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
              desired={goals.calories}
              value={eaten.calories}
              unit="kcal"
              size={200}
              main={true}
            />
          </Grid>
          <Grid container>
            <SingleNutrientbar
              name="Sacharidy"
              desired={goals.carbs}
              value={eaten.carbs}
              unit="g"
              size={100}
              isMain={false}
            />
            <SingleNutrientbar
              name="Bílkoviny"
              desired={goals.proteins}
              value={eaten.proteins}
              unit="g"
              size={100}
              isMain={false}
            />
            <SingleNutrientbar
              name="Tuky"
              desired={goals.fats}
              value={eaten.fats}
              unit="g"
              size={100}
              isMain={false}
            />
            <SingleNutrientbar
              name="Vláknina"
              desired={goals.fiber}
              value={eaten.fiber}
              unit="g"
              size={100}
              isMain={false}
            />
          </Grid>
          <AddFoodModal
            date={dateString}
            type={selectedFoodType}
            open={showAddFoodModal}
            handleClose={handleModalClose}
          />
        </Grid>
      </Grid>
    </>
  );
};

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
              fontFamily: "Nunito",
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            {params.name}
          </Typography>
          <AnimatedButton
            disableRipple
            onClick={() => params.showModal(params.type)}
          >
            <AddIcon sx={{ color: "green", fontSize: "1.8rem" }} />
          </AnimatedButton>
        </RecordBox>
      </Grid>
      <Grid item>
        {Array.isArray(params.eaten) ? 
        (
          params.eaten.map((e: any) => {
          if (e.mealType === params.type) {
            return (
              <FoodRecord
                name={e.food.name}
                calories={e.food.calories}
                grams={e.grams}
              />
            );
          }
        })) 
        : 
        (
          <div>Loading</div>
        )
        }
      </Grid>
    </Grid>
  );
};

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
          fontFamily: "Nunito",
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
            fontFamily: "Nunito",
            fontSize: "1rem",
            fontWeight: 400,
            p: 1,
            m: 1,
          }}
        >
          {Math.round(params.calories * params.grams / 100)} kcal
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
};

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
      <Typography
        textAlign="center"
        fontFamily="Nunito"
        fontWeight="bold"
        pt="1rem"
      >
        {params.value}
        {params.unit}
      </Typography>
      <Typography textAlign="center" fontFamily="Nunito">
        z {params.desired}
        {params.unit}
      </Typography>
    </Grid>
  );
};

const TripleProgressBar = (params: any) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={params.size}
        thickness={5}
        sx={{ color: "LightGrey" }}
      />
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
};

export default HomeContent;
