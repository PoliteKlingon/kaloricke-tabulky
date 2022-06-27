import { Typography, Box, Button, Grid } from '@mui/material'
import {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { borderRadius } from '@mui/system';

//@ts-ignore
function ListedFood({name, description, calories, proteins, carbs, fats, fiber, salt, id}) {

    const [expanded, setExpanded] = useState(false)
    
    return (
    <Box sx={{
        borderStyle: "solid",
        borderRadius: 2,
        borderWidth: 0.1
    }}>
        <Grid container 
          direction="row"
          justifyContent="space-between"
        >
            <Typography>{name}</Typography>
            <Typography>{description}</Typography>
            <Button onClick={() => setExpanded(!expanded)}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
        </Grid>
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