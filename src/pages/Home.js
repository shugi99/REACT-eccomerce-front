import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
import AppFooter from '../components/footer/AppFooter';
import Hero from '../components/home/Hero';

const Home = () => {
  return (
    <>
      <Hero text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      <NewArrivals />

      <BestSellers />

      <CategoryList />

      <SubList />

      <br />
      <br />
      <AppFooter />
    </>
  );
};

export default Home;
