import * as React from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            Lina
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
            <Link href="#contacto" className={`${styles.navLink} ${styles.cta}`}>
              Empezar
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ""}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className={`${styles.bar} ${styles.barTop}`} />
            <span className={`${styles.bar} ${styles.barMid}`} />
            <span className={`${styles.bar} ${styles.barBot}`} />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Navegación móvil"
        aria-hidden={!isMenuOpen}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        <Link href="#contacto" className={styles.mobileCta} onClick={closeMenu}>
          Empezar
        </Link>
      </nav>
    </>
  );
}
