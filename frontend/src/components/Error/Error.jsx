import { Link } from "react-router-dom";
import styles from "../Error/error.module.scss";

const Error = () => {
  return (
    <section className={styles.content_error}>
      <h1 className={styles.title_error}>404</h1>
      <p className={styles.text_error}>
        Oups! La page que{" "}
        <span className={styles.break_text}>vous demandez n'existe pas.</span>
      </p>
      <Link
        to="/"
        className={styles.link_error}
        onClick={() => window.scrollTo(0, 0)}
      >
        Retourner sur la page d'accueil
      </Link>
    </section>
  );
};

export default Error;
