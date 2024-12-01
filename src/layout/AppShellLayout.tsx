import React from 'react'
import { Navbar } from '../components'
import { AppShell, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

const AppShellLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 0 }}
      withBorder={false}
      navbar={{ width: 120, breakpoint: 'md'}}
      style={{ backgroundColor: 'rgb(234, 233, 227)'}}
      padding="md"
    >
      <AppShell.Navbar p="md" style={{ backgroundColor: 'rgb(234, 233, 227)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AppShellLayout