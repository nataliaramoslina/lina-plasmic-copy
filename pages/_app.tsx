import type { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const makeStarsYellow = (root: Element) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent?.trim() ?? "";
        if (text.length > 0 && /^[★☆]+$/.test(text) && node.parentElement) {
          node.parentElement.style.color = "#F59E0B";
        }
      }
    };

    makeStarsYellow(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        Array.from(mutation.addedNodes).forEach((added) => {
          if (added instanceof Element) makeStarsYellow(added);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return <Component {...pageProps} />;
}
