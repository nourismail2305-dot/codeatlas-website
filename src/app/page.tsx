import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { TopicMarquee } from "@/components/topic-marquee";
import { Features } from "@/components/features";
import { Roadmap } from "@/components/roadmap";
import { CodePlayground } from "@/components/code-playground";
import { Stats } from "@/components/stats";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Hero />
        <TopicMarquee />
        <Features />
        <Roadmap />
        <CodePlayground />
        <Stats />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
