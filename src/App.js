import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Verify from './components/Verify';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './styles/tailwind.css'; // Make sure the path matches where you placed the CSS file
import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import StaticTabs from './components/StaticTabs';
import AddProgram from './components/AddProgram';
import AddBranch from './components/AddBranch';
import AddDomain from './components/AddDomain';
import ViewDomain from './components/ViewDomain';
import FileUpload from './components/FileUpload';
import ViewCounselor from './components/ViewCounselor';
import CounselorDashboard from './components/CounselorDashboard';
import AssignCounselorToDomain from './components/AssignCounselorToDomain';
import AssignmentsView from './components/AssignmentsView';
import CounselorDetails from './components/CounselorDetails';
import CounselorProfile from './components/CounselorProfile';
import CounselorLogin from './components/CounselorLogin';
import BookingDetails from './components/BookingDetails';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import Chat from "./components/Chat";
import CounselorChat from './components/CounselorChat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/select" element={<StaticTabs/>} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/counselor-chat" element={<CounselorChat />} />
        <Route path="/add-program" element={<AddProgram />} />
          <Route path="/add-branch" element={<AddBranch />} />
          <Route path="/add-domain" element={<AddDomain />} />
          <Route path="/view-domain" element={<ViewDomain/>}/>
          <Route path="/upload" element={< FileUpload/>}/>
          <Route path='/viewcounselor' element={< ViewCounselor/>}/>
          <Route path='/counselordashboard' element={<CounselorDashboard/>}/>
          <Route path='/assigncounselor' element={<AssignCounselorToDomain/>}/>
          <Route path="/assignments" element={<AssignmentsView />} />
          <Route path="/counselor/:id" element={<CounselorDetails />} />
          <Route path='/counselorprofile' element={<CounselorProfile/>}/>
          <Route path='/counselorlogin' element={<CounselorLogin/>}/>
          <Route path='/bookingdetails' element={<BookingDetails/>}/>
          <Route path="/book-session/:id" element={<BookingForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
    </Router>
  );
};

export default App;
