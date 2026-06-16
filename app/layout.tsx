import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Vellum & Vector — Premium Web Design Agency in Lagos",
  description:
    "We design and build custom websites with React, TypeScript, Django, and PostgreSQL. Based in Lagos GRA. Fast delivery. Naira pricing. Post-launch support included.",
  keywords: [
    "web design Lagos",
    "web development Nigeria",
    "React developer Lagos",
    "Django developer Nigeria",
    "custom website Lagos",
    "Vellum Vector",
  ],
  openGraph: {
    title: "Vellum & Vector — We Design Websites That Sell",
    description:
      "Premium web design & development agency in Lagos GRA. Custom-built with React, TypeScript, Django, and PostgreSQL.",
    url: "https://vellumandvector.com",
    siteName: "Vellum & Vector",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vellum & Vector — We Design Websites That Sell",
    description:
      "Premium web design agency in Lagos. Built with React, TypeScript, Django, PostgreSQL.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — browser-side link avoids server-side network restrictions */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vellum & Vector",
              url: "https://vellumandvector.com",
              description:
                "Premium web design and development agency in Lagos, Nigeria. We build with React, TypeScript, Django, and PostgreSQL.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos GRA",
                addressRegion: "Lagos",
                addressCountry: "NG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "oyekanboluwatife6@gmail.com",
              },
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: "'Roboto', sans-serif" }}>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L8RLR4B5ZV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L8RLR4B5ZV');
          `}
        </Script>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
