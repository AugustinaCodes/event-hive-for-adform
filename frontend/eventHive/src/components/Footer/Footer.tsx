import { Box, Container, Typography, Link } from "@mui/material";
import EventHiveLogo from "../../assets/EventHiveLogo.svg";
import styles from "./Footer.module.scss";


export default function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
        <Container>
            <img src={EventHiveLogo} alt="Event Hive Logo" className={styles.logo} />
            <Typography variant="body2" color="textSecondary" sx={{ mx: 1}}>
                <Link href="/" color="inherit" sx={{ mx: 1}}>Home</Link>
                <Link href="/" color="inherit" sx={{ mx: 1}}>Sponsors</Link>
                <Link href="/" color="inherit" sx={{ mx: 1}}>Contacts</Link>
                <Link href="/" color="inherit" sx={{ mx: 1}}>Rules</Link>
            </Typography>
        </Container>
    </Box>
  )
}
