import { FC, useState } from "react";
import { Box, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import AnimatedButton from "../Utils/AnimatedButton";
import ChangeWeightModal from "./ChangeWeightModal";

import MealType from "../../types/MealType";

interface IFoodRecord {
  changeWeightHandle: () => void;
  eatenId: string;
  name: string;
  calories: number;
  grams: number;
  date: string;
  type: MealType;
}

const FoodRecord: FC<IFoodRecord> = ({
  changeWeightHandle,
  eatenId,
  name,
  calories,
  date,
  grams,
  type,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    changeWeightHandle();
  };

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 1,
        mx: 1,
      }}
    >
      <Box sx={{ display: { xs: "grid", sm: "flex" }, alignItems: "center" }}>
        <Typography
          sx={{
            fontFamily: "Nunito",
            fontSize: "1.3rem",
            fontWeight: 600,
            px: 1,
            mx: 1,
            cursor: "default",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Nunito",
            fontSize: "1rem",
            fontWeight: 400,
            px: 2,
            mx: 1,
            cursor: "pointer",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          {grams} g
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            fontFamily: "Nunito",
            fontSize: "1.2rem",
            fontWeight: 600,
            p: 1,
            m: 1,
          }}
        >
          {Math.round((calories * grams) / 100)} kcal
        </Typography>
        <AnimatedButton disableRipple>
          <InfoOutlinedIcon sx={{ color: "gray", fontSize: "1.5 rem" }} />
        </AnimatedButton>
        <AnimatedButton disableRipple>
          <DeleteIcon sx={{ color: "gray", fontSize: "1.5 rem" }} />
        </AnimatedButton>
      </Box>
      <ChangeWeightModal
        open={open}
        handleClose={handleClose}
        date={date}
        type={type}
        recordId={eatenId}
      />
    </Box>
  );
};

export default FoodRecord;
