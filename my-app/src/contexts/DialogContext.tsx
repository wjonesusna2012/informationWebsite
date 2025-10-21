import React, { createContext, useReducer, useContext } from 'react';

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

const reducerFunction = (dialog: DialogContextType, action: ActionTypes): DialogContextType => {
  switch (action) {
    case ActionTypes.OPEN_NARRATIVE:
      return { ...dialog, createNarrative: true };
    case ActionTypes.CLOSE_NARRATIVE:
      return { ...dialog, createNarrative: false };
    case ActionTypes.OPEN_STORY:
      return { ...dialog, createStory: true };
    case ActionTypes.CLOSE_STORY:
      return { ...dialog, createStory: false };
    case ActionTypes.OPEN_TAG:
      return { ...dialog, addTag: true };
    case ActionTypes.CLOSE_TAG:
      return { ...dialog, addTag: false };
    default:
      return dialog;
  }
};

const DialogStateContext = createContext<DialogContextType>(initialValues);
const DialogDispatchContext = createContext<React.Dispatch<ActionTypes> | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialog, dispatch] = useReducer(reducerFunction, initialValues);

  return (
    <DialogStateContext.Provider value={dialog}>
      <DialogDispatchContext.Provider value={dispatch}>
        {children}
      </DialogDispatchContext.Provider>
    </DialogStateContext.Provider>
  );
};

export const useDialogState = () => {
  const context = useContext(DialogStateContext);
  if (context === undefined) {
    throw new Error('useDialogState must be used within a DialogProvider');
  }
  return context;
};

export const useDialogDispatch = () => {
  const context = useContext(DialogDispatchContext);
  if (context === null) {
    throw new Error('useDialogDispatch must be used within a DialogProvider');
  }
  return context;
};
