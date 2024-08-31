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
import styles from "./NavigationBar.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NavigationBar() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(`(min-width:900px)`);
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
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
          )}
        </Container>
      </Toolbar>

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
            onClick={handleCloseModal}
          >
            Contact
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
}
