

import Hikayapage from "./components/hikayapage";
import { Box } from "@mui/material";
import Header from "./components/Header";
import MiscStudioHero from "./components/homepage";
import OurGamesSection from "./components/gamesSection";
import Footer from "./components/footer";
import AboutUsSection from "./components/AboutUs";
import Head from "next/head";

export const metadata = {
  title: "Misc Studio",
  description: "Welcome to miscstudio",
  icons: {
    icon: "/icon-256-v2.png",
  },
};




export default function Home() {
  return (
    <>
    <Box>
      <Header/>
       <MiscStudioHero />
       <OurGamesSection/>
       <AboutUsSection/>
        <Footer/>
    </Box>
  
    </>
    
    
    
   
    
  );
}
