import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import LandingEnhancer from "@/components/LandingEnhancer";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPlasmicHost = router.pathname === "/plasmic-host";

  if (isPlasmicHost) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <LandingEnhancer />
      <Component {...pageProps} />
      <ScrollToTop />
    </>
  );
}
