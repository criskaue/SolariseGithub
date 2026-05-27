import styles from "./Splash.module.css";
import logoImg from "../../components/images/logo.png";
import splashBg from "../../components/images/solar2.jpg";

function Splash() {
  return (
    <div
      className={styles.splash}
      style={{ backgroundImage: `linear-gradient(rgba(22,120,85,0.58), rgba(22,120,85,0.58)), url(${splashBg})` }}
    >
      <img src={logoImg} alt="Solarise" className={styles.logo} />
    </div>
  );
}

export default Splash;
