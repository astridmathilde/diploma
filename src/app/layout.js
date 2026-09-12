export const metadata = {
  title: {
    default: "Designing Calm: Tools for digital minimalism",
    template: "%s – Designing Calm: Tools for digital minimalism",
  },
  description: "A diploma project by Astrid Mathilde Boberg, The Oslo School of Architecture and Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
