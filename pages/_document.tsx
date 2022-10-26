import { Html, Head, Main, NextScript } from "next/document";

// TODO: update these
const META_DESCRIPTION =
  "Solana's best coin flip app. Double your SOL with just a single coin flip!";
// Different dimensions than twitter
const META_IMAGE_FACEBOOK =
  "https://firebasestorage.googleapis.com/v0/b/hammyflip-c598c.appspot.com/o/hammyflip-facebook-preview.jpg?alt=media&token=b64eb2b6-19d7-4ded-8e2c-24d8c7ca7b09";
const META_IMAGE_TWITTER =
  "https://firebasestorage.googleapis.com/v0/b/hammyflip-c598c.appspot.com/o/hammyflip-twitter-preview.jpg?alt=media&token=fb442e98-c06b-4a20-9dc9-1d3976dfdff1";
const META_TITLE = "Hammyflip | Flip a coin to double your SOL";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Righteous&family=Work+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Facebook */}
        <meta property="og:url" content="https://www.hammyflip.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={META_IMAGE_FACEBOOK} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hammyflip" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={META_IMAGE_TWITTER} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
