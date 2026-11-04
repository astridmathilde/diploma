import { ThemeProvider } from "next-themes";
import { DM_Sans, DM_Mono } from "next/font/google";

import { getSiteSettings } from "@/sanity/lib/data";
import {
  siteDescriptionDefault,
  siteSubtitleDefault,
  siteTitleDefault,
} from "@/sanity/lib/defaults";
import { toPlainText } from "@/sanity/lib/text";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const title = settings?.title || siteTitleDefault;
  const subtitle = settings?.subtitle || siteSubtitleDefault;
  const description = settings?.description?.length
    ? toPlainText(settings.description)
    : toPlainText(siteDescriptionDefault);
  return {
    title: {
      default: title + " – " + subtitle.replace(/\.$/, ""),
      template: "%s – " + title,
    },
    description: [subtitle, description].filter(Boolean).join(" "),
  };
}

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
