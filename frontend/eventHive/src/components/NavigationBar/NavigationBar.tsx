import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import EventHiveTentLogo from "../../assets/EventHiveTentLogo.svg";
import EventHiveLogo from "../../assets/EventHiveLogo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./NavigationBar.module.scss";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(`(min-width:900px)`);

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ border: "none" }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          className={styles.mobileLogo}
          src={EventHiveTentLogo}
          alt="Event Hive Tent Logo"
          onClick={() => navigate("/")}
        />
        <img
          className={styles.desktopLogo}
          src={EventHiveLogo}
          alt="Event Hive Logo"
          onClick={() => navigate("/")}
        />
        <Container
          sx={{ display: "flex", justifyContent: "flex-end", padding: "0" }}
        >
          {isDesktop && (
            <div>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                Home
              </Button>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                About
              </Button>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                Events
              </Button>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                Contact
              </Button>
            </div>
          )}
          <Button color="inherit" sx={{ fontWeight: "bold" }}>
            Login
          </Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }}>
            Sign Up
          </Button>
          {!isDesktop && (
            <IconButton color="default">
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}