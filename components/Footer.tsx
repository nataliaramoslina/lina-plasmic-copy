import * as React from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";

const CURRENT_YEAR = new Date().getFullYear();

const LINKS = {
  servicios: [
    { label: "Consultoría", href: "#servicios" },
    { label: "Asesoría", href: "#servicios" },
    { label: "Formación", href: "#servicios" },
  ],
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Blog", href: "#blog" },
    { label: "Contacto", href: "#contacto" },
  ],
  soporte: [
    { label: "FAQ", href: "#faq" },
    { label: "Centro de ayuda", href: "#ayuda" },
    { label: "Trabaja con nosotros", href: "#empleo" },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              Lina
            </Link>
            <p className={styles.tagline}>
              Servicios profesionales de calidad para impulsar tu crecimiento.
            </p>
            <div className={styles.social}>
              <a
                href="https://instagram.com"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://linkedin.com"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LI
              </a>
              <a
                href="https://twitter.com"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
              >
                X
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div className={styles.linkGroup}>
            <p className={styles.groupTitle}>Servicios</p>
            {LINKS.servicios.map((link) => (
              <Link key={link.href + link.label} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Empresa */}
          <div className={styles.linkGroup}>
            <p className={styles.groupTitle}>Empresa</p>
            {LINKS.empresa.map((link) => (
              <Link key={link.href + link.label} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Soporte */}
          <div className={styles.linkGroup}>
            <p className={styles.groupTitle}>Soporte</p>
            {LINKS.soporte.map((link) => (
              <Link key={link.href + link.label} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; {CURRENT_YEAR} Lina. Todos los derechos reservados.
        </p>
        <div className={styles.legal}>
          <Link href="/privacidad" className={styles.legalLink}>
            Privacidad
          </Link>
          <Link href="/terminos" className={styles.legalLink}>
            Términos
          </Link>
          <Link href="/cookies" className={styles.legalLink}>
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
