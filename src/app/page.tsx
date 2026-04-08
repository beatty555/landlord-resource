import Hero from "@/components/home/Hero";
import HowWeHelp from "@/components/home/HowWeHelp";
import LatestGuides from "@/components/home/LatestGuides";
import ListingsCTA from "@/components/home/ListingsCTA";
import HomepageNewsletter from "@/components/home/HomepageNewsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowWeHelp />
      <LatestGuides />
      <ListingsCTA />
      <HomepageNewsletter />
    </>
  );
}
