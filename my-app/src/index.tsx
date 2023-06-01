import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Root from './App';
import reportWebVitals from './reportWebVitals';
import AddNarrativeDialog from './AddNarrativeDialog'; 
import AddStoryDialog from './AddStoryDialog';

const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      {
        path: '/',
        Component: () =>  <h1>Insert here</h1>,
      },
      {
        path: '/narratives',
        Component: AddNarrativeDialog,
      },
      {
        path: '/stories',
        Component: AddStoryDialog,
      }
    ]
  }
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
