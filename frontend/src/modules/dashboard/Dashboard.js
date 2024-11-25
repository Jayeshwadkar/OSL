import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WorkIcon from '@mui/icons-material/Work';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RuleIcon from '@mui/icons-material/Rule';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FlightIcon from '@mui/icons-material/Flight';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MovieIcon from '@mui/icons-material/Movie';



const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));





const Dashboard = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);


  const customBarStyles = [
    { color: '#2d96ff' },
    { color: '#b900d8' },
  ];

  const listItems = [
    { name: 'Total Material In-Transit  :  30042', icon: <AccountTreeIcon sx={{color:'black'}}/> },
    { name: 'Pending LR Not Delivered  :  32402', icon: <WorkHistoryIcon sx={{color:'red'}} /> },
    { name: 'Total Customer  :  4320', icon: <GroupsIcon sx={{color:'black'}}/> },
    { name: 'Total Transporter  :  7535', icon: <LocalShippingIcon sx={{color:'black'}}/> },
    { name: 'Total Missing POD  :  3230', icon: <RuleIcon sx={{color:'red'}}/> },
    { name: 'Total Invoice Amount  : Rs.78342', icon: <ReceiptIcon sx={{color:'black'}}/> },
    { name: 'Total Bill Amount   :  Rs.53434', icon: <ReceiptLongIcon sx={{color:'black'}}/> },
    { name: 'Pending Sales Invoice  :  3230', icon: <BusAlertIcon sx={{color:'red'}} /> },
    { name: 'Pending Bill  :  4343', icon: <PendingActionsIcon sx={{color:'red'}} /> },
  ];


  return (
    <Box  >
      <Grid container rowSpacing={1} ml={2} >
        <Grid item xs={6}>
        <BarChart
      xAxis={[{ scaleType: 'band', data: ['April', 'May', 'June'] ,label: 'Total Number of LR Book in Last 3 Months'}]}
      yAxis={[{ scaleType: 'linear', min: 0, max: 3000 }]}
      series={[{ data: [1000, 2000, 3000] }]}
      width={500}
      height={450}
    />
        </Grid>
        <Grid item xs={6} >
        <BarChart
          xAxis={[
            { 
              scaleType: 'band', 
              data: ['Pallet', 'Box', 'Covers', 'Bin', 'Drum'],
              label: 'Stock Articles Quantity'
            }
          ]}
            yAxis={[{ scaleType: 'linear', min: 0, max: 3000 }]} 
            series={[{ data: [1000, 2000, 3000, 2000, 1000],color: customBarStyles[0].color }]}
            width={500}
            height={450}
          />
        </Grid>
   
        <Grid item xs={6}>
        <BarChart
            xAxis={[{ scaleType: 'band', data: ['April', 'May', 'June'],label: 'Total Revenue of Last 3 Months' }]}
            yAxis={[{
              scaleType: 'linear', min: 0, max: 90000,
              tickFormatter: (value) => `${value}cr`
            }]} // 1cr = 10000000
            series={[{ data: [30000, 60000, 90000],color: customBarStyles[1].color  }]}
            width={500}
            height={450}
          /> 
        </Grid>
        <Grid item xs={6} >
            <List dense={dense}>
              {listItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      {item.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              ))}
            </List>
        
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
