import Banner from '@/components/home/Banner';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HeroSection from '@/components/home/HeroSection';
import React from 'react';

const Home = () => {
  return (
    <div>
      <main>
        <HeroSection></HeroSection>
        <Categories></Categories>
        <FeaturedProducts></FeaturedProducts>
        <Banner></Banner>
      </main>
    </div>
  );
};

export default Home;