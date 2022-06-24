import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import AnimatedButton from "../Utils/AnimatedButton";

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
          {Math.round((params.calories * params.grams) / 100)} kcal
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

export default FoodRecord;
