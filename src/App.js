import logo from './logo.svg';
import './App.css';
import { PrimaryMap } from './components/PrimaryMap';
import { Soils, Watershed, Counties, Physio, Tax } from './components/Outputs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Divider from '@mui/material/Divider'
import CenteredTabs from './components/CenteredTabs';

function App() {
  return (
    <Container id="main">

      <Stack spacing={2} alignItems= "center">
        <CenteredTabs />
        <PrimaryMap />
        <Divider flexItem="true" />
        <Soils />
        <Divider flexItem="true" />
        <Watershed />
        <Divider flexItem="true" />
        <Counties />
        <Divider flexItem="true" />
        <Physio />
        <Divider flexItem="true" /> 
        <Tax />
      </Stack>
      
    </Container>
  );
}

export default App;
