import { ThemeProvider } from "next-themes";
import { DM_Sans, DM_Mono } from "next/font/google";

export const siteTitle = "Designing Calm: Tools for digital minimalism";

export const metadata = {
  title: {
    default: siteTitle,
    template: "%s – " + siteTitle,
  },
  description: "A diploma project by Astrid Mathilde Boberg, The Oslo School of Architecture and Design",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable + " " + dmMono.variable} suppressHydrationWarning>
    <body>
    <ThemeProvider>
    {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
