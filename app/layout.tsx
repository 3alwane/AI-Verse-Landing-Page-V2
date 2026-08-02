import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./sesssionProviders";
import { ThemeProvider } from "./theme-provider";
import {
  Fredoka,
  Inter,
  Lato,
  Merriweather,
  Montserrat,
  Nunito,
  Open_Sans,
  Playfair,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
  Raleway,
  Roboto,
} from "next/font/google";
import ReactQueryProvider from "./reactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const playfairDisplay = Playfair({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const fredoka = Nunito({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const merriWeather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriWeather",
});

export const metadata: Metadata = {
  title: "ai-verse App", // Placeholder for title
  description: "Full stack AI Content generator Saas ", // Placeholder for description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`
    ${poppins.variable}
    ${roboto.variable}
    ${openSans.variable}
    ${montserrat.variable}
    ${raleway.variable}
    ${lato.variable}
    ${playfairDisplay.variable}
     ${plusJakarta.variable}
     ${inter.variable}
     ${fredoka.variable}
     ${merriWeather.variable}



  `}
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={` 
          antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
