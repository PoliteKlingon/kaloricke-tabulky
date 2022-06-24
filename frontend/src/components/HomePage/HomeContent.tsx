import { useEffect, useState, useContext } from "react";
import AddFoodModal from "./AddFoodModal";
import {
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/system";
import AuthContext from "../../context/AuthProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "../../api/axios";

import AnimatedButton from "../Utils/AnimatedButton";
import FoodMilestone from "./FoodMilestone";
import NutrientBar from "./NutrientBar";
import TripleProgressBar from "../Utils/TripleProgressBar";

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
    <Grid container direction="column" alignItems="center" sx={{paddingTop: {xs: 0, sm: 5}}}>
      <Grid
        container
        xs={12}
        sm={11}
        direction="column"
        alignItems="normal"
        pt={2}
        pb={8}
        sx={{
          backgroundColor: "white",
          minHeight: "70vh",
          borderRadius: { xs: 0, sm: 10 },
        }}
      >
        <Grid item container alignItems="center" justifyContent="center" pt={2}>
          <Grid item xs={3} sm={1} display="flex" justifyContent="center">
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
          <Grid item xs={5} display="flex" justifyContent="center">
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
          <Grid item xs={3} sm={1} display="flex" justifyContent="center">
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
            xs={8}
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
            xs={3}
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
              <NutrientBar
                name="Sacharidy"
                desired={goals.carbs}
                value={eaten.carbs}
                unit="g"
                size={100}
                isMain={false}
              />
              <NutrientBar
                name="Bílkoviny"
                desired={goals.proteins}
                value={eaten.proteins}
                unit="g"
                size={100}
                isMain={false}
              />
              <NutrientBar
                name="Tuky"
                desired={goals.fats}
                value={eaten.fats}
                unit="g"
                size={100}
                isMain={false}
              />
              <NutrientBar
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
      </Grid>
    </Grid>
  );
};

export default HomeContent;
