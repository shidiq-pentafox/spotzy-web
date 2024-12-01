import { Box, Button, Group, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCustomer } from '../../../services/parkService';
import { searchVehicleTypes } from '../../../services/masterService';

interface VehicleForm {
  customerId: string;
  vehicleNo: string;
  vehicleTypeId: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface VehicleType {
  id: string;
  name: string;
}

export const AddVehicle = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<VehicleForm>({
    initialValues: {
      customerId: '',
      vehicleNo: '',
      vehicleTypeId: '',
    },
    validate: {
      customerId: (value) => (!value ? 'Customer is required' : null),
      vehicleNo: (value) => {
        if (!value) return 'Vehicle number is required';
        // Format: XX-00-XX-0000
        const regex = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;
        return regex.test(value) ? null : 'Invalid format. Expected: XX-00-XX-0000';
      },
      vehicleTypeId: (value) => (!value ? 'Vehicle type is required' : null),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerResponse, vehicleTypeResponse] = await Promise.all([
          searchCustomer(),
          searchVehicleTypes()
        ]);
        setCustomers(customerResponse.data);
        setVehicleTypes(vehicleTypeResponse.data);
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to load form data',
          color: 'red',
        });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values: VehicleForm) => {
    try {
      setLoading(true);
      const response = await fetch('/api/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create vehicle');
      }

      notifications.show({
        title: 'Success',
        message: 'Vehicle created successfully',
        color: 'green',
      });
      navigate('/settings/vehicles');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to create vehicle',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Title order={3} mb="lg">Add New Vehicle</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Customer"
          placeholder="Select customer"
          data={customers.map((customer) => ({
            value: customer.id,
            label: `${customer.name} (${customer.phone})`,
          }))}
          searchable
          required
          {...form.getInputProps('customerId')}
          mb="md"
        />

        <TextInput
          label="Vehicle Number"
          placeholder="XX-00-XX-0000"
          required
          {...form.getInputProps('vehicleNo')}
          mb="md"
        />

        <Select
          label="Vehicle Type"
          placeholder="Select vehicle type"
          data={vehicleTypes.map((type) => ({
            value: type.id,
            label: type.name,
          }))}
          required
          {...form.getInputProps('vehicleTypeId')}
          mb="lg"
        />

        <Group justify="flex-end">
          <Button variant="outline" onClick={() => navigate('/settings/vehicles')}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Vehicle
          </Button>
        </Group>
      </form>
    </Box>
  );
};
