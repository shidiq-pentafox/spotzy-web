import { Outlet } from "react-router-dom";
import AppShellLayout from "./AppShellLayout";

const RootLayout = () => {
  return (
    <AppShellLayout>
      <Outlet />
    </AppShellLayout>
  );
};

export default RootLayout;
