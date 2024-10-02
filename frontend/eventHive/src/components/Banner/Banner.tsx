import { Box, Button, Typography } from "@mui/material";
import styles from "./Banner.module.scss";
import { useNavigate } from "react-router-dom";

export default function Banner() {

const navigate = useNavigate();
const handleExploreClick = () => {
  navigate("/signup"); 
};

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
        <Button variant="contained" onClick={handleExploreClick}>
          Explore Now
        </Button>
      </Box>
    </Box>
  );
}
