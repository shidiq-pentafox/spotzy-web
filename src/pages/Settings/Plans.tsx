import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import { getPlansList } from '../../service/park.service';
import { Badge, Box, Button, Paper, Text, Title } from '@mantine/core';
import { MantineTable, SideDrawer } from '../../components';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const Plans = () => {
  const [openedCreateForm, { open: openForm, close: closeForm }] = useDisclosure(false);
  const { data: plansData, isLoading } = useQuery({
    queryKey: ["master-plans"],
    queryFn: () => getPlansList(),
  });

  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "Tariff ID",
      //   size: 150,
      //   Cell: ({ cell }) => (
      //     <Text style={{ textAlign: "left" }} size="sm">
      //       {cell.getValue()}
      //     </Text>
      //   ),
      // },
      {
        accessorKey: "vehicleType.name",
        header: "Vehicle Type Name",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "vehicleTypeId",
        header: "Vehicle Type ID",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "rate",
        header: "Rate",
        size: 100,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "parkingMethod",
        header: "Parking Method",
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
      <Title order={4}>Parking Plan</Title>
      <Box>
        <MantineTable
          // title="Manage Parking"
          columnData={columns}
          rowData={plansData?.tariffs}
          extraElement={
            <Button
              leftSection={<IconPlus size={18} />}
              color="rgb(76, 108, 90)"
              radius={"md"}
              onClick={openForm}
            >
              Create Plan
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
          title='Create Parking Plan'
        >

        </SideDrawer>
      </Box>
    </Paper>
  )
}

export default Plans