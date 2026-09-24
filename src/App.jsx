import { useEffect, useState } from "react";
import {
  FaCode,
  FaCodepen,
  FaCoffee,
  FaFacebook,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaMailBulk,
  FaPatreon,
  FaYoutube,
} from "react-icons/fa";
import { FiArrowUp, FiFileText, FiMenu, FiX } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import MuiForm from "./muiForm";
import styles from "./App.module.scss";

const footerLinks = [
  { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FaCode },
  { label: "GitHub", href: "https://github.com/a2rp", icon: FaGithub },
  { label: "CodePen", href: "https://codepen.io/ash1198", icon: FaCodepen },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FaLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FaFacebook },
  { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FaYoutube },
  { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FaMailBulk },
  { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FaHeart },
  { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: FaCoffee },
  { label: "Patreon", href: "https://patreon.com/a2rp", icon: FaPatreon },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 280);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" onClick={closeMobileMenu} aria-label="Material UI Form home">
          <img src={import.meta.env.BASE_URL + "logo.png"} alt="Ashish Ranjan logo" />
          <span><small>React form patterns</small><strong>Material UI Form</strong></span>
        </a>
        <button className={styles.menuButton} type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-controls="main-navigation" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
          {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
        <nav id="main-navigation" className={styles.navigation + (mobileMenuOpen ? " " + styles.navigationOpen : "")} aria-label="Main navigation">
          <a href="#form" onClick={closeMobileMenu}><FiFileText aria-hidden="true" /> Form demo</a>
          <a href="#about" onClick={closeMobileMenu}><FaCode aria-hidden="true" /> Validation</a>
          <a href="https://github.com/a2rp/material-ui-form" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}><FaGithub aria-hidden="true" /> Source</a>
        </nav>
      </header>

      <main id="top">
        <MuiForm />
        <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
          <div><p className={styles.eyebrow}>What this demonstrates</p><h2 id="about-title">A complete form flow, ready to extend.</h2></div>
          <div className={styles.aboutCards}>
            <article><span>01</span><h3>Input validation</h3><p>Field-level feedback keeps names, email, password, phone and URL values clear.</p></article>
            <article><span>02</span><h3>Choice controls</h3><p>Radio groups, checkboxes, selects and file inputs work together in one form.</p></article>
            <article><span>03</span><h3>Confirmation dialog</h3><p>Submit valid details to review the safe summary before closing the flow.</p></article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div><p className={styles.eyebrow}>Keep exploring</p><p className={styles.footerText}>More frontend experiments and practical projects.</p></div>
          <nav className={styles.socialLinks} aria-label="Social and support links">
            {footerLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon aria-hidden="true" /><span className={styles.srOnly}>{label}</span></a>)}
          </nav>
        </div>
        <div className={styles.footerBottom}>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></div>
      </footer>

      <button className={styles.topButton + " " + (showTopButton ? styles.topButtonVisible : "")} type="button" onClick={scrollToTop} aria-label="Go to top"><FiArrowUp aria-hidden="true" /></button>
      <ToastContainer position="bottom-right" autoClose={2800} theme="colored" />
    </div>
  );
}

export default App;
