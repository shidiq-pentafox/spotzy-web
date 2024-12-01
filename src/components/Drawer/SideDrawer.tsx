import { Drawer, Title } from "@mantine/core";

const SideDrawer = ({
  openedAddForm,
  close,
  title,
  children,
}: {
  openedAddForm: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Drawer
      offset={10}
      radius="md"
      size="lg"
      opened={openedAddForm}
      onClose={close}
      title={<Title order={3}>{title}</Title>}
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      {children}
    </Drawer>
  );
};

export default SideDrawer;
