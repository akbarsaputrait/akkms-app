import "../styles/globals.css";

import { ThemeProvider } from "@material-tailwind/react";
import { SWRConfig } from "swr/_internal";

import { fetcher } from "../utils";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
