import "../styles/globals.css";

import { ThemeProvider } from "@material-tailwind/react";
import { Analytics } from "@vercel/analytics/react";
import { SWRConfig } from "swr/_internal";

import { fetcher } from "../utils";

function MyApp({ Component, pageProps }) {
  const mode: any = process.env.MODE;

  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider>
        <Component {...pageProps} />
        <Analytics mode={mode} />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
