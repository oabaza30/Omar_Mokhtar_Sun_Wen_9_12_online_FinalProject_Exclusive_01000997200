import CategoriesSection from '@/components/home/CategoriesSection';
import MainSlider from './../components/home/MainSlider';
import ProductsSection from '@/components/home/ProductsSection';
import { Suspense } from 'react';
import SkeltonCard from '@/components/shared/SkeltonCard';
export default function Home() {
  return (
    <>
      <MainSlider />
      <Suspense fallback={<SkeltonCard />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SkeltonCard />}>
        <ProductsSection />
      </Suspense>
    </>

  );
}
