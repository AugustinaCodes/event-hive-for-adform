import Footer from "../../components/Footer/Footer";
import EventHiveLogo from "../../assets/EventHiveLogo.svg";
import styles from "../SignUpPage/SignUpPage.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LogInPage() {
  const navigate = useNavigate();

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);

      navigate("/listpage");
    }
  }, [navigate]);

  return (
    <div className={styles.pageContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowBackIcon /> Back
      </button>
      <div className={styles.signupContainer}>
        <img
          src={EventHiveLogo}
          alt="Event Hive Logo"
          className={styles.logo}
        />
        <p className={styles.signupDescription}>
          Log In to discover exclusive events and connect with your community.
        </p>
        <Button
          className={styles.signupButton}
          variant="contained"
          color="primary"
          onClick={handleGithubLogin}
        >
          Log In with GitHub
        </Button>
      </div>
      <Footer />
    </div>
  );
}
