import {
  ActionIcon,
  useMantineTheme,
  useMantineColorScheme,
  Group,
  Avatar,
  Menu,
  Box,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconLogout2, IconUser } from "@tabler/icons-react";
import useAuthStore from "../../store/authStore";
// import BULogo from "../../assets/bu-logo.jpg";

function TopNavbar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.resetAuth);

  return (
    <>
      <Box style={{ display: "flex", alignItems: "center", gap: 15 }}>
        {/* <img height="40" src={BULogo} alt="BU Logo" /> */}
        <Title order={3} style={{ color: "rgb(0,106,182)" }}>
          Being Ultimate
        </Title>
      </Box>

      <Group>
        <Menu width={180} position="bottom-end" withArrow>
          <Menu.Target>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <ActionIcon size="xl" variant="transparent">
                <Avatar color="cyan" radius="xl">
                  SA
                </Avatar>
              </ActionIcon>
            </Box>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>User Settings</Menu.Label>
            <Menu.Item
              leftSection={<IconUser size={16} />}
              onClick={() => navigate("/settings")}
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
    </>
  );
}

export default TopNavbar;
