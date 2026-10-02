import { AppShowcase } from "@/components/site/app-showcase";
import { CitiesStrip } from "@/components/site/cities-strip";
import { Cta } from "@/components/site/cta";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { Security } from "@/components/site/security";
import { PageWatermark } from "@/components/site/page-watermark";

export default function Home() {
  return (
    <>
      <PageWatermark />
      <Hero />
      <CitiesStrip />
      <AppShowcase />
      <HowItWorks />
      <Security />
      <Faq />
      <Cta />
    </>
  );
}
