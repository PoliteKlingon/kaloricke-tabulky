import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import FoodRecord from "./FoodRecord";

import AddIcon from "@mui/icons-material/Add";

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
        {Array.isArray(params.eaten) ? (
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
          })
        ) : (
          <div>Loading</div>
        )}
      </Grid>
    </Grid>
  );
};

export default FoodMilestone;
