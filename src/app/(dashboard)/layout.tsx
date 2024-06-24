import '../globals.css';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import Sidebar from './Sidebar';
import Menubar from './Menubar';

import ReactQueryProvider from '@/providers/queryProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import Provider from '@/providers/dashboard/provider';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                  <Sidebar />
                  <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <Menubar />
                    <main className=" items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
                      {children}
                    </main>
                  </div>
                </div>
              </TooltipProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
