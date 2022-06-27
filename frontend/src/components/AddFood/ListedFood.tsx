import { Typography, Box, Button, Grid, Modal } from '@mui/material'
import {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteFoodModal from './DeleteFoodModal';

//@ts-ignore
function ListedFood({name, description, calories, proteins, carbs, fats, fiber, salt, id, ssid}) {

    const [expanded, setExpanded] = useState(false);
    const [deleteFood, setDeleteFood] = useState(false);

    return (
    <Box sx={{
        borderStyle: "solid",
        borderRadius: 2,
        borderWidth: 0.1,
        margin: 1,
        padding: 1
    }}>
        <Grid container 
          direction="row"
          justifyContent="space-between"
        >
            <Grid item>
                <Typography>{name}</Typography>
            </Grid>
            <Grid item>
                <Typography>{description}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={() => setExpanded(!expanded)}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>
                <Button onClick={() => setDeleteFood(!deleteFood)}>
                    <DeleteIcon />
                </Button>
            </Grid>
        </Grid>
        <Modal
          open={deleteFood}
          onClose={() => setDeleteFood(false)}
        >
            <DeleteFoodModal foodName={name} foodId={id} ssid={ssid} closeModal={setDeleteFood}/>
        </Modal>
        {expanded && <Grid container 
          direction="row"
          justifyContent="space-between"
        >
        <Grid item>
            <Typography>Calories: {calories * 100}</Typography>
            <Typography>Proteins: {proteins * 100}</Typography>
        </Grid>
        <Grid item>
            <Typography>Carbs: {carbs * 100}</Typography>
            <Typography>Fats: {fats * 100}</Typography>
        </Grid>
        <Grid item>
            <Typography>Fiber: {fiber * 100}</Typography>
            <Typography>Salt: {salt * 100}</Typography>
        </Grid>
        </Grid>
        }
    </Box>
    
  )
}

export default ListedFood