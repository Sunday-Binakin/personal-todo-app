import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/login';
import Register from './components//register';
import EditTaskForm from './components/EditTaskForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskList />
  },
  {
    path: "/new",
    element: <TaskForm />
  },
  {
    // path: "/edit",
    path: "/edit/:taskId",
    element: <EditTaskForm />
  },
  // {
  //   path:"/login",
  //   element: <Login/>
  // },
  // {
  //   path:"/register",
  //   element: <Register/>
  // }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App; 