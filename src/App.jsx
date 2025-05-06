import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Web/Navbar';

import Home from '../src/Web/Home';
import Login from './components/Web/Login';
import Signup from './components/Web/Signup';
import Dashboard from './Lancer/Dashboard';
import Editprofile from './Lancer/Editprofile';
import JobBoard from './Lancer/JobBoard';
import Beta from './components/Web/Beta';
import Jobdetails from './Lancer/Jobdetails';
import SavedJobs from './Lancer/SavedJobs';
import ClientList from './Lancer/ClientList';
import AdminDashboard from './Client/AdminDashboard';
import AdminBeta from './components/Client/Adminbeta';
import Adminusers from './components/Client/Adminusers';
import AdminManageRequest from './components/Client/AdminmanageRequest';
import AdminSettings from './components/Client/Adminsettings';
import AdminJobs from './components/Client/Adminjobs';
import OverallAdmin from './MasterControlAdmin/OverallAdmin';
import ManageClientmaster from './components/Masterctrl/ManageClientmaster';
import ManagaRecmaster from './components/Masterctrl/ManageRecmaster';


function App() {
  const location = useLocation();
  const showNavbarPaths = ['/', '/login', '/register'];

  return (
    <>
      {showNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/userdashboard" element={<Dashboard />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/userjobs" element={<JobBoard />} />
        <Route path="/beta" element={<Beta />} />
        <Route path="/jobdetails/:id" element={<Jobdetails />} />
        <Route path="/savedjob" element={<SavedJobs />} />
        <Route path="/clientlist" element={<ClientList />} />

        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminbeta" element={<AdminBeta />} />
        <Route path="/adminusers" element={<Adminusers />} />
        <Route path="/adminmanagerequest" element={<AdminManageRequest />} />
        <Route path="/adminsettings" element={<AdminSettings/>} />
        <Route path="/adminjobs" element={<AdminJobs/>} />
        
        <Route path="/mastercontrols" element={<OverallAdmin/>} />
        <Route path="/mastercontrolclient" element={<ManageClientmaster/>} />
        <Route path="/mastercontrolrec" element={<ManagaRecmaster/>} />
     
      </Routes>
    </>
  );
}

export default App;
