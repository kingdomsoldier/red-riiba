import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Stats from "@/components/home/Stats";
import ObjectivesWorkLines from "@/components/home/ObjectivesWorkLines";
import MemberCountries from "@/components/home/MemberCountries";
import JoinCTA from "@/components/home/JoinCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <ObjectivesWorkLines />
      <MemberCountries />
      <JoinCTA />
    </>
  );
}