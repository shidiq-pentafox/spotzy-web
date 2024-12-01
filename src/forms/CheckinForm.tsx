import {
  Box,
  Button,
  SegmentedControl,
  Select,
  TextInput,
  Group,
} from "@mantine/core";
import React, { useState } from "react";
import { FormLayout, SelectCreatable, ToastNotification } from "../components";
import { IconCalendarClock, IconCurrencyRupee, IconDeviceFloppy, IconPhoneCall, IconCheck, IconX } from "@tabler/icons-react";
import { DateTimePicker } from "@mantine/dates";
import { searchAndListCustomer, searchAndListParkingSpot, searchAndListVehicle, searchAndListVehicleType } from "../service/listing.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from '@mantine/form';
import { createCustomer, createVehicle, createCheckIn } from "../service/park.service";
import toast from "react-hot-toast";

const CheckinForm = () => {
  const [newCustomer, setNewCustomer] = useState(null);
  const [newVehicle, setNewVehicle] = useState(null);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      customerName: '',
      customerPhone: '',
      customerId: '',
      parkingMethod: 'monthly',
      vehicleNumber: '',
      vehicleId: '',
      vehicleType: '',
      parkingSpot: '',
      advanceAmount: '',
      checkoutTime: null,
    },
    validate: {
      customerId: (value) => (!value ? 'Customer is required' : null),
      vehicleId: (value) => (!value ? 'Vehicle is required' : null),
      parkingSpot: (value) => (!value ? 'Parking spot is required' : null),
      advanceAmount: (value) => (!value ? 'Advance amount is required' : null),
      checkoutTime: (value) => (!value ? 'Checkout time is required' : null),
    },
  });

  console.log(form.errors);
  

  const { data: customerList } = useQuery({
    queryKey: ["customerList"],
    queryFn: () => searchAndListCustomer("")
  });
  
  const { data: vehicleList } = useQuery({
    queryKey: ["vehicleList"],
    queryFn: () => searchAndListVehicle("")
  });

  const { data: parkingSpotList } = useQuery({
    queryKey: ["parkingSpotList"],
    queryFn: () => searchAndListParkingSpot("")
  });

  const { data: vehicleTypeList } = useQuery({
    queryKey: ["vehicleTypeList"],
    queryFn: () => searchAndListVehicleType("")
  });

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customerList"] });
      setNewCustomer(null);
      form.setFieldValue('customerPhone', '');
      form.setFieldValue('customerId', data.id);
      toast.success('Customer Saved Successfully')
    },
  });

  const createVehicleMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicleList"] });
      setNewVehicle(null);
      form.setFieldValue('vehicleType', '');
      toast.success('Vehicle Saved Successfully')
    },
  });

  const createCheckInMutation = useMutation({
    mutationFn: createCheckIn,
    onSuccess: () => {
      queryClient.invalidateQueries(["checkInList"]);
      form.reset();
      setNewCustomer(null);
      setNewVehicle(null);
      // You can add a success notification here
    },
    onError: (error) => {
      // Handle error, maybe show an error notification
      ToastNotification({
        type: "error",
        message: error.message,
      });
      console.error("Check-in creation failed:", error);
    },
  });

  const handleSaveCustomer = () => {
    // Only validate customer-related fields
    const customerErrors = {
      customerName: form.validateField('customerName').error,
      customerPhone: form.validateField('customerPhone').error,
    };

    if (customerErrors.customerName || customerErrors.customerPhone) {
      // If there are errors, update the form's error state
      form.setErrors(customerErrors);
      return;
    }

    createCustomerMutation.mutate({
      name: newCustomer,
      phone: form.values.customerPhone,
    });
  };

  const handleSaveVehicle = () => {
    // Only validate vehicle-related fields
    const vehicleErrors = {
      vehicleNumber: form.validateField('vehicleNumber').error,
      vehicleType: form.validateField('vehicleType').error,
    };

    if (vehicleErrors.vehicleNumber || vehicleErrors.vehicleType) {
      // If there are errors, update the form's error state
      form.setErrors(vehicleErrors);
      return;
    }

    console.log(form.values, 'form');
    

    // Check if customerId is available
    if (!form.values.customerId) {
      form.setFieldError('customerId', 'Customer must be selected before adding a vehicle');
      return;
    }

    createVehicleMutation.mutate({
      customerId: form.values.customerId,
      vehicleNo: newVehicle,
      vehicleTypeId: form.values.vehicleType,
    });
  };

  const handleCustomerNameChange = (value: string | null) => {
    form.setFieldValue('customerName', value || '');
    setNewCustomer(null);
    if (value) {
      const customer = customerList?.find(c => c.label === value);
      if (customer) {
        form.setFieldValue('customerId', customer.value);
        // Clear vehicle-related fields when customer changes
        form.setFieldValue('vehicleNumber', '');
        form.setFieldValue('vehicleId', '');
        setNewVehicle(null);
      } else {
        form.setFieldValue('customerId', '');
      }
    } else {
      form.setFieldValue('customerId', '');
      // Clear vehicle-related fields when customer is cleared
      form.setFieldValue('vehicleNumber', '');
      form.setFieldValue('vehicleId', '');
      setNewVehicle(null);
    }
  };

  const handleCreateCustomer = (value: string) => {
    setNewCustomer(value);
    form.setFieldValue('customerName', value);
  };

  const handleVehicleNumberChange = (value: string | null) => {
    form.setFieldValue('vehicleNumber', value || '');
    setNewVehicle(null);
    if (value) {
      const vehicle = vehicleList?.find(v => v.label === value);
      if (vehicle) {
        form.setFieldValue('vehicleId', vehicle.value);
        // Optionally, you could also set the vehicle type here if it's available
        // form.setFieldValue('vehicleType', vehicle.typeId);
      } else {
        form.setFieldValue('vehicleId', '');
      }
    } else {
      form.setFieldValue('vehicleId', '');
    }
  };

  const handleCreateVehicle = (value: string) => {
    setNewVehicle(value);
    form.setFieldValue('vehicleNumber', value);
  };

  const handleSubmit = (values: typeof form.values) => {
    if (form.validate().hasErrors) return;

    // Ensure we have both customer and vehicle IDs
    if (!values.customerId || !values.vehicleId) {
      ToastNotification({
        type: "error",
        message: "Both customer and vehicle must be selected or created before check-in.",
      });
      return;
    }

    const checkInData = {
      customerId: values.customerId,
      vehicleId: values.vehicleId,
      parkingSpotId: values.parkingSpot,
      advanceAmount: parseFloat(values.advanceAmount),
      parkingMethod: values.parkingMethod,
      checkoutTime: values.checkoutTime.toISOString(),
    };

    createCheckInMutation.mutate(checkInData);
  };

  return (
    <Box style={{ position: "relative" }}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {/* Customer Name Input and New Customer Fields */}
        <Box
          style={{
            filter: newVehicle ? "blur(4px)" : "none",
            marginTop: "1rem",
            pointerEvents: newVehicle ? "none" : "auto",
          }}
        >
          <FormLayout label="Customer Name">
            <SelectCreatable
              value={form.values.customerName}
              onChange={handleCustomerNameChange}
              onCreateOption={handleCreateCustomer}
              data={customerList}
              placeholder="Select or type a customer name"
            />
          </FormLayout>
          {newCustomer && (
            <>
              <FormLayout label="Customer Phone">
                <TextInput
                  leftSection={<IconPhoneCall size="1rem" />}
                  {...form.getInputProps('customerPhone')}
                  radius="md"
                  placeholder="Enter phone number"
                />
              </FormLayout>
              <Button
                radius="md"
                color="rgb(76, 108, 90)"
                leftSection={<IconDeviceFloppy size="1rem" />}
                onClick={handleSaveCustomer}
                loading={createCustomerMutation.isPending}
              >
                Save Customer
              </Button>
            </>
          )}
        </Box>

        {/* Parking Form Section */}
        <Box
          style={{
            filter: newCustomer ? "blur(4px)" : "none",
            marginTop: "1rem",
            pointerEvents: newCustomer ? "none" : "auto",
          }}
        >
          <Box
            style={{
              filter: newVehicle ? "blur(4px)" : "none",
              pointerEvents: newVehicle ? "none" : "auto",
            }}
          >
            <FormLayout label="Parking Method">
              <SegmentedControl
                {...form.getInputProps('parkingMethod')}
                color="rgb(76, 108, 90)"
                fullWidth
                data={[
                  { label: 'Daily', value: 'daily' },
                  { label: 'Monthly', value: 'monthly' }
                ]}
                radius="md"
              />
            </FormLayout>
          </Box>

          <FormLayout label="Vehicle Number">
            <SelectCreatable
              {...form.getInputProps('vehicleNumber')}
              onCreateOption={handleCreateVehicle}
              onChange={handleVehicleNumberChange}
              data={vehicleList}
            />
          </FormLayout>

          {newVehicle && (
            <>
              <FormLayout label="Vehicle Type">
                <Select
                  {...form.getInputProps('vehicleType')}
                  radius="md"
                  placeholder="Select vehicle type"
                  searchable
                  data={vehicleTypeList}
                />
              </FormLayout>
              <Button
                leftSection={<IconDeviceFloppy size="1rem" />}
                radius="md"
                color="rgb(76, 108, 90)"
                onClick={handleSaveVehicle}
                loading={createVehicleMutation.isPending}
              >
                Save Vehicle
              </Button>
            </>
          )}

          <Box
            style={{
              filter: newVehicle ? "blur(4px)" : "none",
              pointerEvents: newVehicle ? "none" : "auto",
            }}
          >
            <FormLayout label="Parking Spot">
              <Select
                {...form.getInputProps('parkingSpot')}
                radius="md"
                placeholder="A12"
                searchable
                data={parkingSpotList}
              />
            </FormLayout>
            <FormLayout label="Advance Amount">
              <TextInput
                {...form.getInputProps('advanceAmount')}
                leftSection={<IconCurrencyRupee size="1rem" />}
                radius="md"
              />
            </FormLayout>
            <FormLayout label="Checkout Time">
              <DateTimePicker
                {...form.getInputProps('checkoutTime')}
                radius="md"
                color="rgb(76, 108, 90)"
                leftSection={<IconCalendarClock size="1rem" />}
              />
            </FormLayout>
          </Box>
        </Box>

        {/* Footer with Create Checkin and Cancel buttons */}
        <Group justify="flex-end" mt="xl">
          <Button
            variant="light"
            radius="md"
            color="red"
            leftSection={<IconX size="1rem" />}
            onClick={() => {
              form.reset();
              setNewCustomer(null);
              setNewVehicle(null);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="rgb(76, 108, 90)"
            radius="md"
            leftSection={<IconCheck size="1rem" />}
            loading={createCheckInMutation.isPending}
          >
            Create Checkin
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default CheckinForm;
