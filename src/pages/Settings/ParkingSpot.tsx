import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import { getParkingSpotList } from '../../service/park.service';
import { Badge, Box, Button, Paper, Text, Title } from '@mantine/core';
import { MantineTable, SideDrawer } from '../../components';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const ParkingSpot = () => {
  const [openedCreateForm, { open: openForm, close: closeForm }] = useDisclosure(false);
  const { data: parkingSpotData, isLoading } = useQuery({
    queryKey: ["parkingSpot"],
    queryFn: () => getParkingSpotList(),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "spotNumber",
        header: "Spot Number",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      // {
      //   accessorKey: "id",
      //   header: "Spot ID",
      //   size: 150,
      //   Cell: ({ cell }) => (
      //     <Text style={{ textAlign: "left" }} size="sm">
      //       {cell.getValue()}
      //     </Text>
      //   ),
      // },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => (
          <Badge variant="light" color={cell.getValue() == 'available' ? "teal" : "yellow"} style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Badge>
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
      <Title order={4}>Parking Spot</Title>
      <Box>
        <MantineTable
          columnData={columns}
          // title="Manage Parking"
          rowData={parkingSpotData?.parkingSpots}
          extraElement={
            <Button
              leftSection={<IconPlus size={18} />}
              color="rgb(76, 108, 90)"
              radius={"md"}
              onClick={openForm}
            >
              Add New Spot
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
          title='Add New Spot'
        >

        </SideDrawer>
      </Box>
    </Paper>
  )
}

export default ParkingSpot