
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import FoodRecord from "./FoodRecord";

import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

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

const FoodMilestone = (params: any) => {
  const [calories, setCalories] = useState(0);
  useEffect(() => {
    let res = 0;
    if (Array.isArray(params.eaten)) {
      params.eaten.map((e: any) => {
        if (e.mealType === params.type) {
          res += e.food.calories / 100 * e.grams
        }
      });
    }
    setCalories(Math.round(res));
  }, [params.eaten]);

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
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
              fontWeight: 700,
            }}
          >
            {params.name}
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
            <AnimatedButton
              disableRipple
              onClick={() => params.showModal(params.type)}
            >
              <AddIcon sx={{ color: "green", fontSize: "1.8rem" }} />
            </AnimatedButton>
          </div>
        </RecordBox>
      </Grid>
      <Grid item>
        {Array.isArray(params.eaten) ? (
          params.eaten.map((e: any) => {
            if (e.mealType === params.type) {
              return (
                <FoodRecord
                  changeWeightHandle={params.changeWeightHandle}
                  eatenId={e.id}
                  name={e.food.name}
                  calories={e.food.calories}
                  grams={e.grams}
                  date={params.date}
                  type={params.type}
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
