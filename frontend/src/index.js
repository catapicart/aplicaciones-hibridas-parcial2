import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css';
//Views
import Home from './views/Home';
import Error from './views/Error';
import Register from './views/Register';
import Login from './views/Login';
import Classes from './views/Classes';
import CreateClass from './views/CreateClass';
import EditClass from './views/EditClass';
import DeleteClass from './views/DeleteClass';
import CreateStudent from './views/CreateStudent';
import Students from './views/Students';
import EditStudent from './views/EditStudent';
import DeleteStudent from './views/DeleteStudent';
import StudentFile from './views/StudentFile';
import CreateReport from './views/CreateReport';
import Reports from './views/Reports';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    errorElement: <Error></Error>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/classes/teacher/:user_id',
    element: <Classes></Classes>
  },
  {
    path: '/class/create',
    element: <CreateClass></CreateClass>
  },
  {
    path: '/class/edit/:class_id',
    element: <EditClass></EditClass>
  },
  {
    path: '/class/delete/:class_id',
    element: <DeleteClass></DeleteClass>
  },
  {
    path: '/student/create/:class_id',
    element: <CreateStudent/>
  },
  {
    path: '/students/class/:class_id',
    element: <Students/>
  },
  {
    path: '/students/:student_id',
    element: <StudentFile/>
  },
  {
    path: '/students/edit/:student_id',
    element: <EditStudent/>
  },
  {
    path: '/students/delete/:student_id',
    element: <DeleteStudent/>
  },
  {
    path: '/students/report/:student_id',
    element: <CreateReport/>
  },
  {
    path: '/student/report/:student_id',
    element: <Reports/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);
