import { AppBar, Collapse, IconButton, Toolbar, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

const Root = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const Container = styled("div")({
  textAlign: "center",
})

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <Root id="header">
      <AppBar elevation={0} sx={{ background: "none" }}>
        <Toolbar sx={{ width: "80%", margin: "0 auto" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ flexGrow: "1", fontFamily: "Nunito" }}
          >
            <span style={{ color: "#edc69f" }}>Kalorické</span> tabulky
          </Typography>
          <IconButton>
            <SortIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Collapse in={collapsed} {...({timeout: 2000})} collapsedSize="5px">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "Nunito",
              fontWeight: 600,
              color: "white",
              textAlign: "center",
            }}
          >
            Začněte svou <br />
            cestu za hubnutím <br />
            ještě dnes!
          </Typography>
          <IconButton>
            <ExpandMoreIcon sx={{ color: "white", fontSize: 70 }} />
          </IconButton>
        </Collapse>
      </Container>
    </Root>
  );
};

export default Header;
