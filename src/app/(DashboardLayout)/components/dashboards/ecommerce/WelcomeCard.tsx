import React from 'react';
import { Box, Avatar, Typography, Card, CardContent, Grid, Divider, Stack } from '@mui/material';
import { IconArrowUpRight } from  '@tabler/icons-react';
import Image from 'next/image';

const WelcomeCard = () => {
  return (
    <Card elevation={0} sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}>
      <CardContent sx={{ py: 1, px: 2 ,alignItems:"center"}}>
        <Grid container justifyContent="space-between">
          <Grid item sm={6}  display="flex" gap={25} alignItems="center">
            <Box>
              <Box
                gap="60px"
                sx={{
                  display: {
                    sm: 'flex',
                  },
                  alignItems: 'center',
                }}
              >
                <Avatar src='/images/profile/user-1.jpg' alt="img" sx={{ width: 100, height: 100 }} />
                {/* <Typography variant="h5" whiteSpace="nowrap">
                  Welcome back Mathew Anderson!
                </Typography> */}
                 <Stack spacing={2}  direction="row" divider={<Divider orientation="vertical" flexItem />}>
                <Box>
                <Typography variant="h3" whiteSpace="nowrap">$2,340 <span><IconArrowUpRight width={18} color="#39B69A" /></span></Typography>
                <Typography variant="subtitle1" whiteSpace="nowrap">This Month's sale</Typography>
                </Box>
                <Box>
                <Typography variant="h3" whiteSpace="nowrap">35%<span><IconArrowUpRight width={18} color="#39B69A" /></span></Typography>
                <Typography variant="subtitle1" whiteSpace="nowrap">Month on Month</Typography>
                </Box>
              </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6}>
            {/* <Box mb="-51px">
              <Image src='/images/backgrounds/welcome-bg.svg' alt='img' width={340} height={204} style={{ width: "340px", height: "204px" }} />
            </Box> */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
