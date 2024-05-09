import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Admin from "./Admin";
import AdminDashboard from "./Admin/components/dashboard";
import reportWebVitals from "./reportWebVitals";
import Branches from "./Admin/components/branches";
import Guest from "./Admin/components/guest";
import GuestEdit from "./Admin/components/guestEdit";
import BranchEdit from "./Admin/components/branchEdit";
import Rooms from "./Admin/components/room";
import RoomEdit from "./Admin/components/roomEdit";
import Staffs from "./Admin/components/staff";
import StaffEdit from "./Admin/components/staffEdit";
import Bookings from "./Admin/components/booking";
import BookingEdit from "./Admin/components/bookingEdit";
import Duty from "./Admin/components/duty";
import DutyEdit from "./Admin/components/dutyEdit";
import Register from "./pages/register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route path="" index element={<AdminDashboard />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="" index element={<AdminDashboard />} />

          {/* Room Routes */}
          <Route path="room" element={<Rooms />}>
            {/* <Route path="create" element={<RoomCreate />} /> */}
            <Route path="edit/:id" element={<RoomEdit />} />
            {/* <Route path="delete/:id" element={<RoomDelete />} /> */}
          </Route>

          {/* Guest Routes */}
          <Route path="guest" element={<Guest />}>
            {/* <Route path="create" element={<GuestCreate />} /> */}
            <Route path="edit/:id" element={<GuestEdit />} />
            {/* <Route path="delete/:id" element={<GuestDelete />} /> */}
          </Route>

          {/* Staff Routes */}
          <Route path="staff" element={<Staffs />}>
            {/* <Route path="create" element={<StaffCreate />} /> */}
            <Route path="edit/:id" element={<StaffEdit />} />
            {/* <Route path="delete/:id" element={<StaffDelete />} /> */}
          </Route>

          {/* Booking Routes */}
          <Route path="booking" element={<Bookings />}>
            {/* <Route path="create" element={<BookingCreate />} /> */}
            <Route path="edit/:id" element={<BookingEdit />} />
            {/* <Route path="delete/:id" element={<BookingDelete />} /> */}
          </Route>

          {/* Branches Routes */}
          <Route path="branches" element={<Branches />}>
            {/* <Route path="create" element={<BranchCreate />} /> */}
            <Route path="edit/:id" element={<BranchEdit />} />
            {/* <Route path="delete/:id" element={<BranchDelete />} /> */}
          </Route>

          {/* Duty Routes */}
          <Route path="duty" element={<Duty />}>
            {/* <Route path="create" element={<DutyCreate />} /> */}
            <Route path="edit/:id" element={<DutyEdit />} />
            {/* <Route path="delete/:id" element={<DutyDelete />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
