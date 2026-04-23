import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    
    <footer className={styles.footer}>
      <img src="/images/svg/logo_nexus.svg" alt="Logo Nexus" className={styles.logo} />
      
      
      <div className={styles['media-container']}>
        
        <i className="icon-facebook"></i>
        <i className="icon-instagram"></i>
        <i className="icon-linkedin"></i>
        <i className="icon-twitter"></i>
        <i className="icon-youtube"></i>
      </div>
      
      <small>NEXUS @ 2026. All rights reserved</small>
    </footer>
  );
};