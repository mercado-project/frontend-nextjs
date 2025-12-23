import "../app/css/style.css";
import "../app/css/euclid-circular-a-font.css"
import { ReduxProvider } from "@/redux/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
