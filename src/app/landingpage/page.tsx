"use client"

import React from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import '../index.css';
// components
import Banner from '@/app/(DashboardLayout)/components/landingpage/banner/Banner';
import C2a from '@/app/(DashboardLayout)/components/landingpage/c2a/C2a';
import C2a2 from '@/app/(DashboardLayout)/components/landingpage/c2a/C2a2';
import DemoSlider from '@/app/(DashboardLayout)/components/landingpage/demo-slider/DemoSlider';
import Features from '@/app/(DashboardLayout)/components/landingpage/features/Features';
import Footer from '@/app/(DashboardLayout)/components/landingpage/footer/Footer';
import Frameworks from '@/app/(DashboardLayout)/components/landingpage/frameworks/Frameworks';
import LpHeader from '@/app/(DashboardLayout)/components/landingpage/header/Header';
import Testimonial from '@/app/(DashboardLayout)/components/landingpage/testimonial/Testimonial';
import EnergyRetailer from '../(DashboardLayout)/dashboards/energy-retailer/page';

export default function Landingpage () {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      {/* <LpHeader />
      <Banner />
      <DemoSlider />
      <Frameworks />
      <Testimonial />
      <Features />
      <C2a />
      <C2a2 />
      <Footer /> */}
      <EnergyRetailer/>
    </PageContainer>
  );
};

Landingpage.layout = "Blank";
