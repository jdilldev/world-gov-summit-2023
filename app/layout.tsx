'use client'
import './globals.css'
import { createTheme } from '@arwes/design';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    // Default theme palette basic colors.
    tonalOffset: 0.1,
    primary: { main: '#005066' },
    secondary: { main: '#578798' },
    statBoxOne: { main: 'yellow' },
    statBoxTwo: { main: '' },
    statBoxThree: { main: '' },
    statBox4: { main: '' },
    success: { main: '#0f0' },
    error: { main: '#c63d3d' },

    // Default theme palette elevation colors.
    elevationOffset: 0.025,
    neutral: { main: '#000' },
  }
});

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <html lang="en">
      <head />
      <ThemeProvider theme={theme}>
        <body className={`h-screen w-screen overflow-hidden bg-slate-900 text-[#9fd0dccc] font-body subpixel-antialiased`}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}

export default RootLayout;
