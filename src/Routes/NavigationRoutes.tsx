import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Analytics, Customers, Login, Parking, ParkingSpot, Plans, Profile, Reports, Users, Vehicles, VehicleTypes } from "../pages";
import RootLayout from "../layout/RootLayout";
import { Dashboard } from "../pages";
import SettingsLayout from "../pages/Settings/Settings";

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/management" element={<Parking />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/profile" element={<Profile />} />

          <Route path="settings" element={<SettingsLayout />}>
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="vehicle-type" element={<VehicleTypes />} />
            <Route path="spot" element={<ParkingSpot />} />
            <Route path="tariff" element={<Plans />} />
            <Route path="customers" element={<Customers />} />
          </Route>
        </Route>
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default NavigationRoutes;