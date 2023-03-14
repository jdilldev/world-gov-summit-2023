'use client'
//import '../styles/globals.module.scss'
import './globals.css'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <html lang="en">
      <head />
      <body className={`h-screen w-screen overflow-hidden bg-slate-900 text-[#9fd0dccc] font-body subpixel-antialiased`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
