import { useState } from "react";

function useLightbox() {
  const [lightboxON, setLightboxON] = useState(false);
  const [lightboxURL, setLightboxURL] = useState("");

  const openLightbox = (url) => {
    setLightboxURL(url);
    setLightboxON(true);
  };

  const closeLightbox = () => {
    setLightboxURL("");
    setLightboxON(false);
  };

  return { lightboxON, lightboxURL, openLightbox, closeLightbox };
}

export default useLightbox;
