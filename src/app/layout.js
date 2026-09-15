import "@/assets/scss/global.scss";
import localFont from 'next/font/local';

export const metadata = {
  title: {
    default: "Designing Calm: Tools for digital minimalism",
    template: "%s – Designing Calm: Tools for digital minimalism",
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
    }
  ]
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={apercu.className}>
      <body>
      <main>
      {children}
      </main>
      </body>
    </html>
  );
}
