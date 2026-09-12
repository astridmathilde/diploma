export const metadata = {
  title: "Tools for digital minimalism",
  description: "A diploma project about tools for digital minimalism.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
