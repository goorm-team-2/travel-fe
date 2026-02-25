import HeroSection from './sections/HeroSection';
import FeaturedDestinationsSection from './sections/FeaturedDestinationsSection';
import TrendingToursSection from './sections/TrendingToursSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedDestinationsSection />
      <TrendingToursSection />
    </div>
  );
}
