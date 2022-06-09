import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Collapse } from "@mui/material";


const ImageCard = (props: any) => {
  return (
    <Collapse in={props.checked} {...(props.checked ? { timeout: 3000 } : {})}>
      <Card
        sx={{ maxWidth: 745, background: "rgba(0,0,0,0.3)", margin: "40px", borderRadius: "5%" }}
      >
        <CardMedia
          component="img"
          height="500"
          image={props.props.imageURL}
          alt={props.props.imageAlt}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            sx={{
              fontFamily: "Nunito",
              fontWeight: "bold",
              fontSize: "2rem",
              color: "white",
            }}
          >
            {props.props.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "Nunito",
              fontSize: "1.3rem",
              color: "white",
            }}
          >
            {props.props.description}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default ImageCard;
