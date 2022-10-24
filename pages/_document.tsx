import { Html, Head, Main, NextScript } from "next/document";

// TODO: update these
const META_DESCRIPTION = "Say hi to your website pet";
// Different dimensions than twitter
const META_IMAGE_FACEBOOK =
  "https://firebasestorage.googleapis.com/v0/b/minymon-d541f.appspot.com/o/link_previews%2Fminymon-facebook-preview.png?alt=media&token=e58539f0-897c-4584-8771-dce0140e4174";
const META_IMAGE_TWITTER =
  "https://firebasestorage.googleapis.com/v0/b/minymon-d541f.appspot.com/o/link_previews%2Fminymon-twitter-preview.png?alt=media&token=eb49eab1-613f-4d5a-ae4f-43b81ef140e5";
const META_TITLE = "Minymon | A pet for your website";

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
        <meta property="og:url" content="https://www.minymon.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={META_IMAGE_FACEBOOK} />
        <meta
          name="facebook-domain-verification"
          content="l75spkigtk8uytb844y4nfbkzaauib"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        {/* TODO: add */}
        {/* <meta name="twitter:site" content="@withwizards" /> */}
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
