import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Box, Typography, Modal, Grid, TextField, Button, createTheme, styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom';
import { Navigate } from 'react-router-dom';
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import AddIcon from '@mui/icons-material/Add';
import AddFoodModal from './AddFoodModal';
import ListedFood from './ListedFood';

const theme = createTheme();

const Root = styled("div")({
    display: "flex",
    justifyContent: "center",
  });

function AdminHome() {
    // @ts-ignore
    const { auth, setAuth } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [foodModal, setFoodModal] = useState(false);

    const getFood = async () => {
        try {
           await axios
             .get("/food", {
               headers: { 
                "Authorization": `Bearer ${auth.ssid}`,
               },
             })
             .then((response) => {
               flushSync(() => setData(response.data.data));
             })
        } catch (err) {
          // @ts-ignore
          if (err.response.status == 401) {
            setAuth({});
            localStorage.removeItem("auth");
          }
          alert("Vyskytla se neočekávaná chyba na naší straně. Zkuste akci zopakovat.");
        }
    };

    const refresh = () => {
        setFoodModal(false);
        getFood();
    }

    useEffect(() => {
        getFood();
      }, []);

    return (
        <Root>
          {(auth.ssid == null || auth.ssid == "") && <Navigate to='/login'  />}
          {auth.role != "admin" && <Navigate to='/' />}
            <Container 
                sx={{
                    backgroundColor: "white",
                    marginY: {xs: 5, md: 10},
                    paddingBottom: 12.5,
                    borderRadius: {xs: 0, md: 10},
                    width: {xs: "100%", md: "90%"},
                    overflow: 'auto'
            }} >
    
              <ThemeProvider theme={theme}>
                <Container component="main">
                  <CssBaseline />
                  <Box
                  sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                  }}
                  >
                    <Grid container>
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h4" sx={{ fontFamily: "Nunito" }}>
                            Správa jídel v databázi
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" sx={{marginX: 5, padding: 2}} onClick={() => {setFoodModal(!foodModal)}}>
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
                  {foodModal && 
                    <Modal
                        open={foodModal}
                        onClose={() => {setFoodModal(false); getFood()}}
                    >
                        <AddFoodModal closeModal={refresh}/>
                    </Modal>
                    }
                  </Box>
                  {data.map((food: any) => {return(
                    <ListedFood 
                      name={food.name} 
                      description={food.description}
                      calories={food.calories}
                      id={food.id}
                      proteins={food.proteins}
                      carbs={food.carbs}
                      fiber={food.fiber}
                      fats={food.fats}
                      salt={food.salt}
                      ssid={auth.ssid}
                      getFood={getFood}
                    />
                  )})}
                </Container>
              </ThemeProvider>
            </Container>
        </Root>
      );
}

export default AdminHome
