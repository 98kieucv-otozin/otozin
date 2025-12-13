import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import FeaturedLikeNewCars from '@/components/sections/FeaturedLikeNewCars';
import FeaturesNewCars from '@/components/sections/FeaturesNewCars';
import FeaturesBestSellingEVs from '@/components/sections/FeaturesBestSellingEVs';
import FeaturesOldOriginalCars from '@/components/sections/FeaturesOldOriginalCars';
import FeaturesTrustedShowrooms from '@/components/sections/FeaturesTrustedShowrooms';
import BlogSection from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="relative">
        <Hero />
        <Features />
        <FeaturedLikeNewCars />
        <FeaturesNewCars />
        <FeaturesBestSellingEVs />
        <FeaturesOldOriginalCars />
        <FeaturesTrustedShowrooms />
        <BlogSection />
      </main>
    </div>
  );
}
