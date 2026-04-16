import * as React from "react";

/**
 * Enhances the Plasmic-rendered landing page without touching its source:
 * - Makes the top header/nav sticky with a shadow on scroll
 * - Recolors review stars from brand blue to amber
 * - Sets data attributes so globals.css can target the header/footer
 */
export default function LandingEnhancer() {
  React.useEffect(() => {
    /* -------------------- Star recoloring -------------------- */
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

    /* -------------------- Header detection -------------------- */
    // Find the topmost full-width element that looks like a header bar.
    // Strategy: first <header>, <nav>, or an early element whose background
    // matches the brand blue and sits within the first 200px of the page.
    const BRAND_BLUE_RE = /rgb\(\s*(?:[0-7]?\d|80)\s*,\s*(?:[0-7]?\d|80)\s*,\s*2[45]\d\s*\)/;

    const findHeader = (): HTMLElement | null => {
      const semantic = document.querySelector(
        "header, [role='banner']"
      ) as HTMLElement | null;
      if (semantic) return semantic;

      const candidates = Array.from(document.body.querySelectorAll<HTMLElement>("*"));
      for (const el of candidates) {
        if (el.dataset.enhancedHeader === "true") return el;
        const rect = el.getBoundingClientRect();
        if (
          rect.width >= window.innerWidth * 0.95 &&
          rect.top >= 0 &&
          rect.top < 40 &&
          rect.height > 40 &&
          rect.height < 160
        ) {
          const bg = window.getComputedStyle(el).backgroundColor;
          if (BRAND_BLUE_RE.test(bg)) return el;
        }
      }
      return null;
    };

    let headerEl: HTMLElement | null = null;

    const applyStickyHeader = () => {
      if (headerEl) return;
      const el = findHeader();
      if (!el) return;
      headerEl = el;
      el.dataset.enhancedHeader = "true";
      el.style.position = "sticky";
      el.style.top = "0";
      el.style.zIndex = "1000";
      el.style.transition = "box-shadow 0.25s ease, transform 0.25s ease";
      // Ensure parent chain doesn't have overflow:hidden which breaks sticky
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        const overflow = window.getComputedStyle(parent).overflow;
        if (overflow === "hidden" || overflow === "clip") {
          parent.style.overflow = "visible";
        }
        parent = parent.parentElement;
      }
    };

    const onScroll = () => {
      if (!headerEl) return;
      if (window.scrollY > 8) {
        headerEl.dataset.scrolled = "true";
        headerEl.style.boxShadow = "0 4px 0 rgba(0,0,0,0.08)";
      } else {
        headerEl.dataset.scrolled = "false";
        headerEl.style.boxShadow = "none";
      }
    };

    /* -------------------- Initial run + observer -------------------- */
    const run = () => {
      makeStarsYellow(document.body);
      applyStickyHeader();
      onScroll();
    };
    run();

    const observer = new MutationObserver((mutations) => {
      let dirty = false;
      mutations.forEach((mutation) => {
        Array.from(mutation.addedNodes).forEach((added) => {
          if (added instanceof Element) {
            makeStarsYellow(added);
            dirty = true;
          }
        });
      });
      if (dirty && !headerEl) applyStickyHeader();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Keep trying for a short window in case Plasmic hydrates late
    const retryTimer = window.setInterval(applyStickyHeader, 400);
    window.setTimeout(() => window.clearInterval(retryTimer), 4000);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.clearInterval(retryTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
