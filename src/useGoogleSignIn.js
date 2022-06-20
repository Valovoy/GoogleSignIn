import { useState, useEffect } from "react";

export const useGoogleSignIn = () => {
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
  const [initData, setInitData] = useState(null);

  const handleCredentialResponse = (response) => {
    if (!response.clientId || !response.credential) return;
    setInitData(response);
  };

  useEffect(() => {
    if (initData?.clientId || gsiScriptLoaded) return;

    const initializeGsi = () => {
      if (!window.google || gsiScriptLoaded) return;

      setGsiScriptLoaded(true);
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_KEY,
        callback: handleCredentialResponse,
        itp_support: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_black", size: "large" }
      );

      window.google.accounts.id.prompt();
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGsi;
    script.async = true;
    script.id = "google-client-script";
    script.defer = true;
    document.querySelector("body")?.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById("google-client-script")?.remove();
    };
  }, [gsiScriptLoaded, initData?.clientId]);
};
