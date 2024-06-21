import '../globals.css';
import { TooltipProvider } from '@radix-ui/react-tooltip';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
