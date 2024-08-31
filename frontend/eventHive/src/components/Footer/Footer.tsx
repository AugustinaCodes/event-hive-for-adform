import { Box, Container, Typography, Link } from "@mui/material";
import EventHiveLogo from "../../assets/EventHiveLogo.svg";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={EventHiveLogo}
          alt="Event Hive Logo"
          className={styles.logo}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            mx: 1,
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Link href="/" underline="hover" color="white">
            Home
          </Link>
          <Link href="/" underline="hover" color="white">
            Sponsors
          </Link>
          <Link href="/" underline="hover" color="white">
            Contacts
          </Link>
          <Link href="/" underline="hover" color="white">
            Rules
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
