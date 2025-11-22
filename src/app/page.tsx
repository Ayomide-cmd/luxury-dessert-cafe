import Hero from '@/components/Hero';
import PopularDesserts from '@/components/PopularDesserts';
import LovedDesserts from '@/components/LovedDesserts';
import BestSection from '@/components/BestSection';
import Gallery from '@/components/Gallery';
import ArtSection from '@/components/ArtSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PopularDesserts />
      <LovedDesserts />
      <BestSection />
      <Gallery />
      <ArtSection />
      <Footer />
    </main>
  );
}