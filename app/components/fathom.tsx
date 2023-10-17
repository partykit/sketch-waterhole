import { useLoaderData, useLocation } from "@remix-run/react";
import { load, trackPageview } from "fathom-client";
import { useEffect } from "react";

const Fathom = () => {
  const env = useLoaderData() as any;

  if (!env.FATHOM_SITE_ID) return null;
  if (!env.FATHOM_DOMAIN) return null;

  const location = useLocation();

  useEffect(() => {
    load(env.FATHOM_SITE_ID, {
      includedDomains: [env.FATHOM_DOMAIN],
    });
  }, []);

  useEffect(() => {
    trackPageview();
  }, [location.pathname, location.search]);

  return null;
};

export default Fathom;
