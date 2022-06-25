import { FC, useEffect, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import FoodRecord from "./FoodRecord";
import AnimatedButton from "../Utils/AnimatedButton";

import IDiaryRecord from "../../interfaces/IDiaryRecord";

import MealType from "../../types/MealType";

interface IFoodMilestone {
  date: string;
  eaten: {};
  name: string;
  type: MealType;
  showModal: (type: MealType) => void;
  handleForceReload: () => void;
}

const FoodMilestone: FC<IFoodMilestone> = ({
  date,
  eaten,
  name,
  type,
  showModal,
  handleForceReload,
}) => {
  const [calories, setCalories] = useState(0);
  useEffect(() => {
    let res = 0;
    if (Array.isArray(eaten)) {
      eaten.map((e: IDiaryRecord) => {
        if (e.mealType === type) {
          res += (e.food.calories / 100) * e.grams;
        }
      });
    }
    setCalories(Math.round(res));
  }, [eaten]);

  return (
    <Grid container item sx={{ width: "100%" }} direction="column">
      <Grid item mx={1}>
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            borderRadius: 3,
            border: "3px solid",
            width: "100%",
            borderColor: "#f7e9bc",
            fontSize: "1.5rem",
            fontFamily: "Nunito",
            fontWeight: "600",
            backgroundColor: "#faf5e6",
          }}
          my={1}
        >
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
              fontWeight: 700,
            }}
          >
            {name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "Nunito",
                fontSize: { xs: "1rem", sm: "1.9rem" },
                fontWeight: 700,
              }}
            >
              {calories} kcal
            </Typography>
            <AnimatedButton disableRipple onClick={() => showModal(type)}>
              <AddIcon sx={{ color: "green", fontSize: "1.8rem" }} />
            </AnimatedButton>
          </div>
        </Box>
      </Grid>
      <Grid item>
        {Array.isArray(eaten) ? (
          eaten.map((e: IDiaryRecord) => {
            if (e.mealType === type) {
              return (
                <FoodRecord
                  handleForceReload={handleForceReload}
                  eatenId={e.id}
                  name={e.food.name}
                  calories={e.food.calories}
                  grams={e.grams}
                  date={date}
                  type={type}
                />
              );
            }
          })
        ) : (
          <div>Loading</div>
        )}
      </Grid>
    </Grid>
  );
};

export default FoodMilestone;
