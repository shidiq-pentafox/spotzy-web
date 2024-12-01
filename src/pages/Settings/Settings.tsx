import { Box, NavLink as NaviLink, Text, Title, } from "@mantine/core";
import { IconBusinessplan, IconCarGarage, IconCarSuv, IconParkingCircle, IconUserSquareRounded } from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";

const SettingsLayout = () => {
  let test = location.pathname.split('/');
  const navItems = [
    {
      label: 'Vehicles',
      href: 'vehicles',
      icon: <IconCarGarage size={16} />,
    },
    {
      label: 'Vehicle Types',
      href: 'vehicle-type',
      icon: <IconCarSuv size={16} />,
    },
    {
      label: 'Parking Spot',
      href: 'spot',
      icon: <IconParkingCircle size={16} />,
    },
    {
      label: 'Plans',
      href: 'tariff',
      icon: <IconBusinessplan size={16} />,
    },
    {
      label: 'Customers',
      href: 'customers',
      icon: <IconUserSquareRounded size={16} />,
    }
  ].map((item, index) => {
    return (
      <NavLink to={item?.href} key={index}>
        <NaviLink
          label={<Text size='sm'>{item?.label}</Text>}
          style={{ borderRadius: 4 }}
          leftSection={item.icon}
          variant='subtle'
          active={test.includes(item.href)}
          color='indigo'
        />
      </NavLink>
    );
  });

  return (
    <Box mt={40}>
      <Title>Settings</Title>
      <Box mt={20} style={{ display: "flex", width: "100%" }}>
        <Box style={{ width: "20%" }} p="lg" mt="xs">
          {navItems}
        </Box>
        <Box style={{ width: "80%" }} m="xs">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsLayout;