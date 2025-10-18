import EasterEggs from '../components/easter-eggs'
import Particles from '../components/Particles'
import Preloader from '../components/preloader'
import RemoteCursors from '../components/realtime/remote-cursors'
import { ThemeProvider } from '../components/theme-provider'
import ElasticCursor from '../components/ui/ElasticCursor'
import { Toaster } from '../components/ui/toaster'
import { TooltipProvider } from '../components/ui/tooltip'
import SocketContextProvider from '../contexts/socketio'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="font-archivo-black">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <Preloader>
          <SocketContextProvider>
            <RemoteCursors />
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </SocketContextProvider>
          <Toaster />
          <EasterEggs />
          {/* <ElasticCursor /> */}
        </Preloader>
      </ThemeProvider>
    </div>
  )
}
