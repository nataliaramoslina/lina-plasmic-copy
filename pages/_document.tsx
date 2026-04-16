import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Lina — Servicios profesionales de calidad. Descubre todo lo que podemos hacer por ti."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lina" />
        <meta
          property="og:description"
          content="Servicios profesionales de calidad. Descubre todo lo que podemos hacer por ti."
        />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lina" />
        <meta
          name="twitter:description"
          content="Servicios profesionales de calidad. Descubre todo lo que podemos hacer por ti."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
