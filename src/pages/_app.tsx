import { SWRConfig } from "swr/_internal";
import "../styles/globals.css";
import { fetcher } from "../utils";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
