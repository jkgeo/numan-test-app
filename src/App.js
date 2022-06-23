import logo from './logo.svg';
import './App.css';
import { PrimaryMap } from './components/PrimaryMap';
import { Soils, Watershed, Counties, Physio, Tax } from './components/Outputs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Divider from '@mui/material/Divider'


function App() {
  return (
    <Container id="main">
      
      <Stack spacing={2}>
        <PrimaryMap />
        <Divider/>
        <Soils />
        <Divider/>
        <Watershed />
        <Divider/>
        <Counties />
        <Divider/>
        <Physio />
        <Divider/> 
        <Tax />
      </Stack>
      
    </Container>
  );
}

export default App;
