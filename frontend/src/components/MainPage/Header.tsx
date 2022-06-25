import { Collapse, Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import CustomAppBar from "../Utils/CustomAppBar";

const Root = styled("div")({
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <Root id="header">
      <CustomAppBar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Collapse in={collapsed} {...{ timeout: 2000 }} collapsedSize="0px">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "Nunito",
              fontWeight: 600,
              color: "white",
              textAlign: "center",
            }}
            fontSize={{ xs: "3rem", sm: "6rem" }}
          >
            Začněte svou <br />
            cestu za hubnutím <br />
            ještě dnes!
            <br />
            <IconButton>
              <ExpandMoreIcon sx={{ color: "white", fontSize: 70 }} />
            </IconButton>
          </Typography>
        </Collapse>
      </Grid>
    </Root>
  );
}

export default Header;
