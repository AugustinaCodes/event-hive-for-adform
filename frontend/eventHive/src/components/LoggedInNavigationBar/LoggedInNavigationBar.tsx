import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import EventHiveTentLogo from "../../assets/EventHiveTentLogo.svg";
import EventHiveLogo from "../../assets/EventHiveLogo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../NavigationBar/NavigationBar.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoggedInNavigationBar() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(`(min-width:900px)`);
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleLogout() {
    // Clear auth token or session and redirect to login page
    localStorage.removeItem("authToken"); // Example: clearing JWT token
    navigate("/");
  }

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
          {/* Desktop View */}
          {isDesktop && (
            <div>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                About
              </Button>
              <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => navigate("/listpage")}>
                Events
              </Button>
              <Button
                color="inherit"
                sx={{ fontWeight: "bold" }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                sx={{ fontWeight: "bold" }}
                onClick={() => navigate("/basket")}
              >
                Basket
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  marginLeft: "auto",
                  color: "red", 
                  border: "1px solid red", 
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}

          {/* Mobile View: Always show Profile and Basket buttons */}
          {!isDesktop && (
            <>
              <Button
                color="inherit"
                sx={{ fontWeight: "bold" }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                sx={{ fontWeight: "bold" }}
                onClick={() => navigate("/basket")}
              >
                Basket
              </Button>

              {/* Hamburger Menu Icon */}
              <IconButton
                color="default"
                onClick={openModal ? handleCloseModal : handleOpenModal}
              >
                {openModal ? (
                  <CloseIcon sx={{ fontSize: 32 }} />
                ) : (
                  <MenuIcon sx={{ fontSize: 32 }} />
                )}
              </IconButton>
            </>
          )}
        </Container>
      </Toolbar>

      {/* Modal for mobile menu */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "115px",
            left: "83%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            width: "150px",
            bgcolor: "background.paper",
            borderRadius: "3px",
          }}
        >
          <Button
            color="inherit"
            sx={{ fontWeight: "bold", display: "block" }}
            onClick={handleCloseModal}
          >
            About
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold", display: "block" }}
            onClick={handleCloseModal}
          >
            Events
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold", display: "block" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
}
