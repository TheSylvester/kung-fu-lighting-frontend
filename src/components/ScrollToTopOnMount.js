import { useEffect } from "react";

/* from https://v5.reactrouter.com/web/guides/scroll-restoration */
// NOT working on Firefox for some reason

export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Scrolling...");
  }, []);

  return null;
}
