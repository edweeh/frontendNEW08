// Dashboard.js
import React, { useState } from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, CssBaseline, Typography, Container } from '@mui/material';
import AdminHome from './AdminHome'; // Import the AdminHome component
import PetForm from '../Admin/PetForm';
import PetV from '../Admin/PetV';
import Category from '../Admin/Category';
import CategoryV from '../Admin/CategoryV';

const drawerWidth = 240;

const theme = {
  zIndex: {
    drawer: 1200, // Adjust this value based on your needs
  },
  spacing: (factor) => `${0.25 * factor}rem`, // Adjust this spacing function based on your needs
};

const Root = styled('div')({
  display: 'flex',
});

const AppBarWrapper = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerWrapper = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
});

const DrawerPaperWrapper = styled('div')({
  width: drawerWidth,
});

const ContentWrapper = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`, // Adjust this spacing based on your needs
}));

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Home');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Home':
        return <AdminHome />;
     case 'Add Pet':
        return <PetForm />;
    case 'Pet View': 
        return <PetV />;
    case 'Categories': 
        return <Category />;
      case 'Category View': 
        return <CategoryV/>;
      default:
        return (
          <Container>
            {/* Your page content goes here */}
            <Typography variant="h4" style={{ marginTop: '20px' }}>
              Welcome to {selectedOption} Page
            </Typography>
          </Container>
        );
    }
  };

  return (
    <Root>
      <CssBaseline />
      <AppBarWrapper position="fixed" theme={theme}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {selectedOption}
          </Typography>
        </Toolbar>
      </AppBarWrapper>
      <DrawerWrapper variant="permanent" theme={theme}>
        <Toolbar />
        <List>
          {['Home', 'Categories', 'Add Pet', 'Category View', 'Pet View'].map((text, index) => (
            <ListItem button key={text} onClick={() => handleOptionClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </DrawerWrapper>
      <ContentWrapper theme={theme}>
        <Toolbar />
        {renderContent()}
      </ContentWrapper>
    </Root>
  );
};

export default Dashboard;
