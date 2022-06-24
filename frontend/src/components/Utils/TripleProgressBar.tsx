import { Box, CircularProgress, Typography } from "@mui/material";

const TripleProgressBar = (params: any) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={params.size}
        thickness={5}
        sx={{ color: "LightGrey" }}
      />
      <CircularProgress
        variant="determinate"
        value={
          Math.round(
            Math.min(Math.max((params.value / params.desired) * 100, 0), 100) *
              10
          ) / 10
        }
        size={params.size}
        color="success"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={
          (params.value / params.desired) * 100 < 100
            ? 0
            : Math.round(
                Math.min(
                  Math.max((params.value / params.desired) * 100 - 100, 0),
                  100
                ) * 10
              ) / 10
        }
        size={params.size}
        color="warning"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={
          (params.value / params.desired) * 100 < 200
            ? 0
            : Math.round(
                Math.min(
                  Math.max((params.value / params.desired) * 100 - 200, 0),
                  100
                ) * 10
              ) / 10
        }
        size={params.size}
        color="error"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {params.main ? (
          <>
            <Typography
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1.3rem"
            >
              {Math.round((params.value / params.desired) * 100 * 10) / 10}%
            </Typography>
            <Typography
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1.5rem"
              fontWeight="bold"
            >
              {params.value}
              {params.unit}
            </Typography>
            <Typography textAlign="center" fontFamily="Nunito" fontSize="1rem">
              z {params.desired} {params.unit}
            </Typography>
          </>
        ) : (
          <Typography textAlign="center" fontFamily="Nunito" fontSize="1.3rem">
            {Math.round((params.value / params.desired) * 100 * 10) / 10}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TripleProgressBar;
