import './App.css';
import NavigationMenu from './NavigationMenu';
import { Outlet } from 'react-router-dom';
import AddStoryDialog from './AddStoryDialog';
import AddNarrativeDialog from './AddNarrativeDialog';
import { createContext, useReducer } from 'react';

export enum ActionTypes {
  OPEN_NARRATIVE,
  CLOSE_NARRATIVE,
  OPEN_STORY,
  CLOSE_STORY,
  OPEN_TAG,
  CLOSE_TAG,
}

const initialValues = {
  createNarrative: false,
  createStory: false,
  addTag: false,
};

type DialogContextType = typeof initialValues;
const reducerFunction = (dialog: DialogContextType, action: ActionTypes) => {
  switch (action) {
    case ActionTypes.OPEN_NARRATIVE:
      return {
        ...dialog,
        createNarrative: true
      };
    case ActionTypes.CLOSE_NARRATIVE:
      return {
        ...dialog,
        createNarrative: false
      };
    case ActionTypes.CLOSE_STORY:
      return {
        ...dialog,
        createStory: false
      };
    case ActionTypes.OPEN_STORY:
      return {
        ...dialog,
        createStory: true
      };
    case ActionTypes.OPEN_TAG:
      return {
        ...dialog,
        addTag: true
      };
    case ActionTypes.CLOSE_TAG:
      return {
        ...dialog,
        addTag: false
      };
    default:
      return dialog;
  }
};

export const DialogContext = createContext<DialogContextType>(initialValues);
export const DialogDispatchContext =
  createContext<React.Dispatch<ActionTypes> | null>(null);

function App() {
  const [dialog, dispatch] = useReducer(reducerFunction, initialValues);
  return (
    <DialogContext.Provider value={dialog}>
      <DialogDispatchContext.Provider value={dispatch}>
        <div className="App">
          <AddStoryDialog />
          <AddNarrativeDialog />
          <NavigationMenu />
          <Outlet />
        </div>
      </DialogDispatchContext.Provider>
    </DialogContext.Provider>
  );
}

export default App;

// Apparently MSNBC was filming Trump just before his second assassination attempt. Hypothetical. Could you compel the journalist who was at Trump International to give up their source as to who tipped them off to be there at that time to make an apparent Zapruder film?
