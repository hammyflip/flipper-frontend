import "antd/dist/antd.css";
import "@/css/global/Antd.css";
import "@/css/global/Global.css";

// Colors
import "@/css/global/colors/ColorVariables.css";
import "@/css/global/colors/BackgroundColorClasses.css";
import "@/css/global/colors/ColorClasses.css";

// Fonts
import "@/css/global/fonts/FontClasses.css";
import "@/css/global/fonts/FontVariables.css";

// Shadows
import "@/css/global/shadows/ShadowVariables.css";

import type { AppProps } from "next/app";
import Head from "next/head";

// Necessary to put down here so that these styles take precedence
import "@/css/global/Wallet.css";
import SolanaContextProvider from "src/context/SolanaContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hammyflip</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SolanaContextProvider>
        <Component {...pageProps} />
      </SolanaContextProvider>
    </>
  );
}

export default MyApp;
