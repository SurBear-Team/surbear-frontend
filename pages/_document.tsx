import { Html, Head, Main, NextScript } from "next/document";

export const META = {
  title: "SurBear | 서베어",
  description: "포인트가 쌓이는 설문조사 플랫폼",
  image: "https://ifh.cc/g/KO2sso.png", // 2025-04-25까지 이미지 호스팅 (ifc.cc)
  URL: "https://www.surbear.site",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{META.title}</title>
        <meta name="description" content={META.description} />

        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:image" content={META.image} />
        <meta property="og:url" content={META.URL} />

        {/* for twitter */}
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />
        <meta name="twitter:image" content={META.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
