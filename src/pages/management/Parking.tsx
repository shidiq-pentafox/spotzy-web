import { Box, Button, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCheckInList } from "../../service/park.service";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { MantineTable, SideDrawer } from "../../components";
import CheckinForm from "../../forms/CheckinForm";
import CheckinProfile from "../Profile/CheckinProfile";

const Parking = () => {
  const [openedAddForm, { open, close }] = useDisclosure(false);
  const [openedProfile, { open: openProfile, close: closeProfile }] = useDisclosure(false);
  const [checkInId, setCheckInId] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["checkins"],
    queryFn: () => getCheckInList(),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Check-In ID",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "vehicle.vehicleNo",
        header: "Vehicle Number",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "parkingSpot.spotNumber",
        header: "Parking Spot",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "tariff.parkingMethod",
        header: "Parking Method",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "tariff.rate",
        header: "Rate",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "advanceAmount",
        header: "Advance Amount",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "calculatedAmount",
        header: "Calculated Amount",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "checkinTime",
        header: "Check-In Time",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {new Date(cell.getValue()).toLocaleString()}
          </Text>
        ),
      },
      {
        accessorKey: "checkoutTime",
        header: "Check-Out Time",
        size: 150,
        Cell: ({ cell }) => (
          <Text style={{ textAlign: "left" }} size="sm">
            {cell.getValue()
              ? new Date(cell.getValue()).toLocaleString()
              : "Not checked out"}
          </Text>
        ),
      },
    ],
    []
  );

  return (
    <Box>
      <MantineTable
        title="Manage Parking"
        columnData={columns}
        rowData={data}
        extraElement={
          <Button
            leftSection={<IconPlus size={18} />}
            color="rgb(76, 108, 90)"
            radius={"md"}
            onClick={open}
          >
            CheckIn Vehicle
          </Button>
        }
        dataLoading={isLoading}
        TableProps={{
          mantineTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
              console.log(row.original.id);
              setCheckInId(row.original.id);
              openProfile();
            },
            sx: {
              cursor: 'pointer', //you might want to change the cursor too when adding an onClick
            },
          }),
        }}
      />
      <SideDrawer
        openedAddForm={openedProfile}
        close={closeProfile}
        title="Check-In Profile"
      >
        <CheckinProfile checkInId={checkInId} />
      </SideDrawer>
      <SideDrawer
        openedAddForm={openedAddForm}
        close={close}
        title="CheckIn Vehicle"
      >
        <CheckinForm />
      </SideDrawer>
    </Box>
  );
};

export default Parking;
