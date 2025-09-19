"use client"
import { Box } from "@mui/material";
import Header from "./Header";
import AnimatedHeroContent from "./bodyHikaya";
import FeaturesSection from "./features";
import TestimonialsSection from "./testimonialsection";
import HowItWorksSection from "./howItworksSection";
import CtaSection from "./CtaSection";
import FooterHikaya from "./footerHikaya";

export default function Hikayapage(){
    return(
    <Box>
      <Box>
        <Header/>
      <AnimatedHeroContent/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <HowItWorksSection/>  
      <CtaSection/>
      </Box>
    <FooterHikaya/>
    </Box>
    )
}