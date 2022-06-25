import { useState, useContext, FC } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

import IFoodRecord from "../../interfaces/IFoodRecord";

interface IAddFoodModalProps {
  open: boolean;
  type: "breakfast" | "morningsnack" | "lunch" | "afternoonsnack" | "dinner";
  handleClose: () => void;
  date: string;
}

const AddFoodModal: FC<IAddFoodModalProps> = ({
  open,
  type,
  handleClose,
  date,
}) => {
  const [foundFoods, setFoundFoods] = useState<IFoodRecord[]>([]);
  const [foodName, setFoodName] = useState("");
  // @ts-ignore
  const { auth } = useContext(AuthContext);

  const searchFoodByName = async (name: string) => {
    await axios
      .get(`/food/search/${name}`)
      .then((res) => {
        setFoundFoods(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveFood = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (+data.get("grams")! <= 0) {
      alert("Snězená hmotnost musí být kladná");
      return;
    }

    try {
      const foodId = foundFoods!.find((food) => {
        return food.name === foodName;
      })!.id;
      const body = JSON.stringify({
        foodId: foodId,
        date: date,
        grams: +data.get("grams")!,
        mealType: type,
      });
      console.log(body);
      axios
        .post("/diary", body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.ssid}`,
          },
        })
        .then(() => {
          handleClose();
          setFoodName("");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 8,
        }}
      >
        <Box component="form" onSubmit={saveFood} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Přidejte nové jídlo</Typography>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                value={foodName}
                onChange={(e, value) => setFoodName(value!)}
                disablePortal
                id="combo-box-demo"
                options={foundFoods.map((food) => food.name)}
                sx={{ width: "100%" }}
                renderInput={(props) => (
                  <TextField
                    required
                    {...props}
                    label="Název jídla"
                    onChange={(e) => searchFoodByName(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="grams"
                label="Gramů"
                name="grams"
                type="number"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "orange",
              fontWeight: "bold",
              fontFamily: "Nunito",
              fontSize: "1.2rem",
              transition: "transform 0.5s",
              ":hover": {
                transform: "scale(1.05)",
                backgroundColor: "#f29830",
              },
            }}
          >
            Uložit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddFoodModal;
