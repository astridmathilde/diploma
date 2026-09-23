import { ThemeProvider } from "next-themes";
import localFont from 'next/font/local';

export const siteTitle = "Designing Calm: Tools for digital minimalism";

export const metadata = {
  title: {
    default: siteTitle,
    template: "%s – " + siteTitle,
  },
  description: "A diploma project by Astrid Mathilde Boberg, The Oslo School of Architecture and Design",
};

const apercu = localFont({
  src: [
    {
      path: '../assets/fonts/Apercu-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Apercu-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Apercu-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Apercu-Light.woff2',
      weight: '300',
      style: 'normal',
    }
  ]
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={apercu.className} suppressHydrationWarning>
    <body>
    <ThemeProvider>
    {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
