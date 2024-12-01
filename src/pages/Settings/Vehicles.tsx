import { Box, Button, Paper, Text, Title } from '@mantine/core'
import { useMemo } from 'react'
import { MantineTable, SideDrawer } from '../../components';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getVehicleList } from '../../service/park.service';
import { useDisclosure } from '@mantine/hooks';

const Vehicles = () => {
  const [openedCreateForm, { open: openForm, close: closeForm }] = useDisclosure(false);
  const { data: vehiclesData, isLoading } = useQuery({
    queryKey: ["vehicleData"],
    queryFn: () => getVehicleList(),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "vehicleNo",
        header: "Vehicle Number",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "customer.name",
        header: "Customer Name",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "customer.phone",
        header: "Customer Phone",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "vehicleType.name",
        header: "Vehicle Type",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Check-In Time",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {new Date(cell.getValue()).toLocaleString()}
          </Text>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Last Update Time",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {new Date(cell.getValue()).toLocaleString()}
          </Text>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue() || "N/A"}
          </Text>
        ),
      },
    ],
    []
  );


  return (
    <Paper shadow="md" radius="md" p="md">
      <Title order={4}>Vehicles</Title>
      <Box>
        <MantineTable
          // title="Manage Parking"
          columnData={columns}
          rowData={vehiclesData?.vehicles}
          extraElement={
            <Button
              leftSection={<IconPlus size={18} />}
              color="rgb(76, 108, 90)"
              radius={"md"}
              onClick={openForm}
            >
              Create Vehicle
            </Button>
          }
          dataLoading={isLoading}
          TableProps={{
            mantineTableBodyRowProps: ({ row }) => ({
              onClick: (event) => {
                console.log(row.original.id);
              },
              sx: {
                cursor: 'pointer',
              },
            }),
          }}
        />

        <SideDrawer
          openedAddForm={openedCreateForm}
          close={closeForm}
          title='Add New Vehicle'
        >

        </SideDrawer>
      </Box>
    </Paper>
  )
}

export default Vehicles