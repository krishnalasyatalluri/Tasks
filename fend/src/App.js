import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
import ViewTasks from './components/ViewTasks';
import SortByStatus from './components/SortStatus';
import SortByDueDate from './components/sortByDueDate';
import Navbar from './components/Navbar'; 
import './index.css'; 


const AuthRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return isAuthenticated ? (
    <>
      <Navbar />
      <Component {...rest} />
    </>
  ) : (
    <Navigate to="/login" /> 
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<AuthRoute element={Dashboard} />} />
          <Route path="/dashboard/create-task" element={<AuthRoute element={CreateTask} />} />
          <Route path="/dashboard/view" element={<AuthRoute element={ViewTasks} />} />
          <Route path="/dashboard/sortByStatus" element={<AuthRoute element={SortByStatus} />} />
          <Route path="/dashboard/sortByDuedate" element={<AuthRoute element={SortByDueDate} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
