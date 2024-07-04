'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboards/modern/YearlyBreakup';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboards/modern/MonthlyEarnings';
import TopCards from '@/app/(DashboardLayout)/components/dashboards/modern/TopCards';
import RevenueUpdates from '@/app/(DashboardLayout)/components/dashboards/modern/RevenueUpdates';
import EmployeeSalary from '@/app/(DashboardLayout)/components/dashboards/modern/EmployeeSalary';
import Customers from '@/app/(DashboardLayout)/components/dashboards/modern/Customers';
import Projects from '@/app/(DashboardLayout)/components/dashboards/modern/Projects';
import Social from '@/app/(DashboardLayout)/components/dashboards/modern/Social';
import SellingProducts from '@/app/(DashboardLayout)/components/dashboards/modern/SellingProducts';
import WeeklyStats from '@/app/(DashboardLayout)/components/dashboards/modern/WeeklyStats';
import TopPerformers from '@/app/(DashboardLayout)/components/dashboards/modern/TopPerformers';


export default function Dashboard (){

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
      <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          {/* column */}

        </Grid>
      </Box>
    </PageContainer>
  )
}

