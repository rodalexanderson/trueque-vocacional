import "@/styles/globals.css";
import { UserProvider } from "@/utils/context/userProvider";
import { Dosis, Montserrat } from "next/font/google";

const dosis = Dosis({
  subsets: ['latin'],
  variable: '--font-dosis',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function App({ Component, pageProps }) {
  return (
  <UserProvider>
    <main className={`${dosis.variable} ${montserrat.variable} font-sans`}>
      <Component {...pageProps} />;
    </main>
  </UserProvider>
  )
}
