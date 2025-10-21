import './App.css';
import NavigationMenu from './NavigationMenu';
import { Outlet } from 'react-router-dom';
import AddStoryDialog from './AddStoryDialog';
import AddNarrativeDialog from './AddNarrativeDialog';
import { DialogProvider } from './contexts/DialogContext';

function App() {
  return (
    <DialogProvider>
      <div className="App">
        <AddStoryDialog />
        <AddNarrativeDialog />
        <NavigationMenu />
        <Outlet />
      </div>
    </DialogProvider>
  );
}

export default App;
