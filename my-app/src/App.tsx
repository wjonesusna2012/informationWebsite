import './App.css';
import NavigationMenu from './NavigationMenu';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavigationMenu />
      <Outlet />
    </div>
  );
}

export default App;
