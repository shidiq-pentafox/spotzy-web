import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import { getCustomersList, getPlansList } from '../../service/park.service';
import { Box, Button, Paper, Text, Title } from '@mantine/core';
import { MantineTable, SideDrawer } from '../../components';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const Customers = () => {
  const [openedCreateForm, { open: openForm, close: closeForm }] = useDisclosure(false);
  const { data: customerData, isLoading } = useQuery({
  queryKey: ["master-customers"],
  queryFn: () => getCustomersList(),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Customer Name",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "id",
        header: "Customer ID",
        size: 200,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
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
      <Title order={4}>Customers</Title>
      <Box>
        <MantineTable
          // title="Manage Parking"
          columnData={columns}
          rowData={customerData?.customers}
          extraElement={
            <Button
              leftSection={<IconPlus size={18} />}
              color="rgb(76, 108, 90)"
              radius={"md"}
              onClick={openForm}
            >
              Create Customer
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
          title='Create Customer'
        >

        </SideDrawer>
      </Box>
    </Paper>
  )
}

export default Customers