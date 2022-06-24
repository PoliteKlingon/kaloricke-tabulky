import { Box, Grid, Typography } from "@mui/material";

import TripleProgressBar from "../Utils/TripleProgressBar";

const Nutrientbar = (params: any) => {
  return (
    <Grid
      item
      xs={6}
      display="grid"
      alignItems="center"
      justifyContent="center"
      pt={3}
    >
      <Typography textAlign="center" fontFamily="Nunito" fontWeight="bold">
        {params.name}
      </Typography>
      <TripleProgressBar
        desired={params.desired}
        value={params.value}
        unit={params.unit}
        size={params.size}
        main={params.isMain}
      />
      <Typography
        textAlign="center"
        fontFamily="Nunito"
        fontWeight="bold"
        pt="1rem"
      >
        {params.value}
        {params.unit}
      </Typography>
      <Typography textAlign="center" fontFamily="Nunito">
        z {params.desired}
        {params.unit}
      </Typography>
    </Grid>
  );
};

export default Nutrientbar;
