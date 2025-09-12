  "use client"

import Hikayapage from "./components/hikayapage";
import { Box } from "@mui/material";
import Header from "./components/Header";
import MiscStudioHero from "./components/homepage";
import OurGamesSection from "./components/gamesSection";
import Footer from "./components/footer";
import AboutUsSection from "./components/AboutUs";



export default function Home() {
  return (
    <Box>
      <Header/>
       <MiscStudioHero />
       <OurGamesSection/>
       <AboutUsSection/>
        <Footer/>
    </Box>
    
   
    
  );
}
