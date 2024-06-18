// app/layout.tsx
import './globals.css';
import { ThemeProvider } from '../context/context'; // Assurez-vous que le chemin est correct
import { ReactNode } from 'react';

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
