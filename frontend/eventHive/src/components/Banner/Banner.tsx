import { Box, Button, Typography } from "@mui/material";
import styles from "./Banner.module.scss";

export default function Banner() {
  return (
    <Box className={styles.bannerContainer}>
      <Box className={styles.overlayText}>
        <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "20px"}}>
          Explore the Hidden Gems
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "20px"}}>
          Discover exclusive locations and events in cities worldwide. Book your
          visit now!
        </Typography>
        <Button variant="contained">
          Explore Now
        </Button>
      </Box>
    </Box>
  );
}
