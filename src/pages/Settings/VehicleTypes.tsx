import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import { getVehicleTypesList } from '../../service/park.service';
import { Box, Button, Paper, Text, Title } from '@mantine/core';
import { MantineTable, SideDrawer } from '../../components';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const VehicleTypes = () => {
  const [openedCreateForm, { open: openForm, close: closeForm }] = useDisclosure(false);
  const { data: vehicleTypesData, isLoading } = useQuery({
    queryKey: ["vehicleTypes"],
    queryFn: () => getVehicleTypesList(),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Vehicle Type",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "id",
        header: "Vehicle Type ID",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Creation Date",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {new Date(cell.getValue()).toLocaleString()}
          </Text>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Last Updated",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {new Date(cell.getValue()).toLocaleString()}
          </Text>
        ),
      },
    ],
    []
  );


  return (
    <Paper shadow="md" radius="md" p="md">
      <Title order={4}>Vehicle Types</Title>
      <Box>
        <MantineTable
          // title="Manage Parking"
          columnData={columns}
          rowData={vehicleTypesData?.vehicleTypes}
          extraElement={
            <Button
              leftSection={<IconPlus size={18} />}
              color="rgb(76, 108, 90)"
              radius={"md"}
              onClick={openForm}
            >
              Add New Type
            </Button>
          }
          dataLoading={isLoading}
          TableProps={{
            mantineTableBodyRowProps: ({ row }) => ({
              onClick: (event) => {
                console.log(row.original.id);
                // setCheckInId(row.original.id);
                // openProfile();
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
          title='Add Vehicle Type'
        >

        </SideDrawer>
      </Box>
    </Paper>
  )
}

export default VehicleTypes