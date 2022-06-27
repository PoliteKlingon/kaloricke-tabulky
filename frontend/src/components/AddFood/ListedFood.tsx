import { Typography, Box, Button, Grid, Modal, Collapse } from '@mui/material'
import {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteFoodModal from './DeleteFoodModal';
import Divider from '@mui/material/Divider';

//@ts-ignore
function ListedFood({name, description, calories, proteins, carbs, fats, fiber, salt, id, ssid}) {

    const [expanded, setExpanded] = useState(false);
    const [deleteFood, setDeleteFood] = useState(false);

    return (
    <Box sx={{
        borderStyle: "solid",
        backgroundColor: "#f0f0f0",
        borderRadius: 2,
        borderWidth: 0.1,
        margin: 1,
        padding: 1
    }}>
        <Grid container 
          direction="row"
        >
            <Grid item xs={5}>
                <Typography variant="h6" sx={{paddingX: 2}}>{name}</Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography sx={{paddingTop: 1}}>{description}</Typography>
            </Grid>
            <Grid item xs={2} >
                <Grid container justifyContent="right">
                    <Button onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>
                    <Button onClick={() => setDeleteFood(!deleteFood)}>
                        <DeleteIcon />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        <Modal
          open={deleteFood}
          onClose={() => setDeleteFood(false)}
        >
            <DeleteFoodModal foodName={name} foodId={id} ssid={ssid} closeModal={setDeleteFood}/>
        </Modal>
        <Collapse
          in={expanded}
        >
        <>
        <Divider sx={{borderWidth: 0.25, marginBottom: 0.5}} />
          <Grid container 
              direction="row"
              sx={{paddingX: 2}}
          >
            <Grid item xs={5}>
                <Typography>Calories: {calories * 100}</Typography>
                <Typography>Proteins: {proteins * 100}</Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography>Carbs: {carbs * 100}</Typography>
                <Typography>Fats: {fats * 100}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Fiber: {fiber * 100}</Typography>
                <Typography>Salt: {salt * 100}</Typography>
            </Grid>
          </Grid>
        </>
        </Collapse>
    </Box>
    
  )
}

export default ListedFood