import logo from './logo.svg';
import './App.css';
import { PrimaryMap } from './components/PrimaryMap';
import { Soils } from './components/Outputs';

function App() {
  return (
    <div id="main">
      <PrimaryMap />
      <Soils />
    </div>
  );
}

export default App;
