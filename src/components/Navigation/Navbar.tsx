// // import { ActionIcon, Box } from "@mantine/core";
// // import { IconLayoutDashboard } from "@tabler/icons-react";

// // const NavButton = () => {
// //   return (
// //     <ActionIcon size={50} radius={25} color="dark">
// //       <IconLayoutDashboard />
// //     </ActionIcon>
// //   );
// // };

// // const Navbar = () => {
// //   return (
// //     <Box
// //       style={{
// //         backgroundColor: "white",
// //         height: "80vh",
// //         borderRadius: 60,
// //         width: 70,
// //         display: "flex",
// //         justifyContent: "center",
// //         padding: 10,
// //       }}
// //     >
// //       <NavButton />
// //     </Box>
// //   );
// // };

// // export default Navbar;

// import { ActionIcon, Box, Stack, Tooltip } from "@mantine/core";
// import {
//   IconLayoutDashboard,
//   IconSettings,
//   IconUser,
//   IconReport,
//   IconParking,
//   IconUsers,
//   IconChartLine,
// } from "@tabler/icons-react";

// // Define an array for navigation options
// const navItems = [
//   { label: "Dashboard", icon: <IconLayoutDashboard stroke={1.2} />, route: "Dashboard" },
//   { label: "Settings", icon: <IconSettings stroke={1.2} />, route: "Settings" },
//   { label: "Profile", icon: <IconUser stroke={1.2} />, route: "Profile" },
//   { label: "Report", icon: <IconReport stroke={1.2} />, route: "Report" },
//   { label: "Parking Management", icon: <IconParking stroke={1.2} />, route: "Parking Management" },
//   { label: "Users", icon: <IconUsers stroke={1.2} />, route: "Users" },
//   { label: "Analytics", icon: <IconChartLine stroke={1.2} />, route: "Analytics" },
// ];

// const NavButton = ({ icon, label, onClick }) => (
//   <Tooltip label={label} position="right" withArrow>
//     <ActionIcon size={50} radius={25} color="dark" onClick={onClick}>
//       {icon}
//     </ActionIcon>
//   </Tooltip>
// );

// const Navbar = () => {
//   const handleNavigation = (route) => {
//     // Replace with actual routing logic
//     console.log(`Navigating to ${route}`);
//   };

//   return (
//     <Box
//       style={{
//         backgroundColor: "white",
//         height: "80vh",
//         borderRadius: 60,
//         width: 70,
//         display: "flex",
//         justifyContent: "center",
//         padding: 10,
//       }}
//     >
//       <Stack spacing="xl" align="center">
//         {navItems.map((item) => (
//           <NavButton
//             key={item.label}
//             icon={item.icon}
//             label={item.label}
//             onClick={() => handleNavigation(item.route)}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { ActionIcon, AppShell, Avatar, Box, Group, Menu, Stack, Tooltip } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconSettings,
  IconReport,
  IconUsers,
  IconChartLine,
  IconParkingCircle,
  IconUser,
  IconLogout2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

// Define an array for navigation options
const navItems = [
  { label: "Dashboard", icon: <IconLayoutDashboard stroke={1.2} />, route: "/" },
  { label: "Parking Management", icon: <IconParkingCircle stroke={1.2} />, route: "/management" },
  { label: "Analytics", icon: <IconChartLine stroke={1.2} />, route: "/analytics" },
  { label: "Report", icon: <IconReport stroke={1.2} />, route: "/reports" },
  { label: "Users", icon: <IconUsers stroke={1.2} />, route: "/users" },
  // { label: "Profile", icon: <IconUser stroke={1.2} />, route: "Profile" },
  // { label: "Settings", icon: <IconSettings stroke={1.2} />, route: "Settings" },
];

const NavButton = ({ icon, label, onClick, active }) => (
  <Tooltip label={label} position="right" offset={20} radius={6}>
    <ActionIcon
      size={50}
      radius={25}
      color="dark"
      variant={active ? "filled" : "transparent"}
      onClick={onClick}
    >
      {icon}
    </ActionIcon>
  </Tooltip>
);

const Navbar = () => {
  const [activeRoute, setActiveRoute] = useState("/");
  const logout = useAuthStore((state) => state.resetAuth);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    setActiveRoute(route); // Update the active route
    navigate(route);
    console.log(`Navigating to ${route}`);
  };

  return (
    <AppShell.Section
      style={{
        backgroundColor: "white",
        height: "80vh",
        borderRadius: 60,
        width: 70,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <AppShell.Section>
        <Stack spacing="xl" align="center">
          {navItems.map((item) => (
            <NavButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={item.route === activeRoute} // Check if it's the active route
              onClick={() => handleNavigation(item.route)}
            />
          ))}
        </Stack>
      </AppShell.Section>

      <AppShell.Section>
        {/* <NavButton
          key={"item.label"}
          icon={<Avatar color="cyan" radius="xl" src={'https://avatar.iran.liara.run/public/boy'} />}
          label="Profile"
          active={"profile" === activeRoute} // Check if it's the active route
          onClick={() => handleNavigation("profile")}
        /> */}
        <Group>
          <Menu width={180} position='right-end' offset={20} withArrow>
            <Menu.Target>
              <ActionIcon
                size={50}
                radius={25}
                color="dark"
                variant="transparent"
              >
                <Avatar color="cyan" radius="xl" src={'https://avatar.iran.liara.run/public/boy'} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>User Settings</Menu.Label>
              <Menu.Item
                leftSection={<IconUser size={16} />}
                onClick={() => navigate('/settings')}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout2 size={16} />}
                onClick={() => logout()}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <NavButton
          key={"item.label"}
          icon={<IconSettings stroke={1.2} />}
          label="Settings"
          active={"settings" === activeRoute} // Check if it's the active route
          onClick={() => handleNavigation("settings")}
        />
      </AppShell.Section>
    </AppShell.Section>
  );
};

export default Navbar;