import { Autocomplete, Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const AddFoodModal = ({ open, handleClose, date }:any ) => {
  const [foundFoods, setFoundFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  // @ts-ignore
  const { auth } = useContext(AuthContext);

  const searchFoodByName = async (name:string) => {
    await axios
    .get(`/food/name/${name}`)
    .then((res) => {setFoundFoods(res.data.data)})
    .catch((e) => {console.log(e)});
  }

  const saveFood = async (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      // @ts-ignore
      const foodId = foundFoods.find((food:any) => {return food.name === selectedFoodName;}).id;
      const body = {
        sessionId: auth.ssid,
        data: {
          foodId: foodId,
          date: date,
          quantity: data.get("grams"),
        },
      };
      axios
        .put("/user/diary", body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          handleClose();
        });

    } catch (error) {
      
    }
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}>
        <Box component="form" noValidate onSubmit={saveFood} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Add food to diary</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="grams"
                label="Grams"
                name="grams"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <Autocomplete
                value={foodName}
                onChange={(e, value) => setFoodName(value)}
                disablePortal
                id="combo-box-demo"
                // @ts-ignore
                options={foundFoods.map((food) => food.name)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Food name"
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
                label="Grams"
                name="grams"
                type="number"
              />
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddFoodModal;
