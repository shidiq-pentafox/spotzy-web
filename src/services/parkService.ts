import axios from 'axios';

export const searchCustomer = () => {
  return axios.get('/api/customer');
};

export const createVehicle = (data: {
  customerId: string;
  vehicleNo: string;
  vehicleTypeId: string;
}) => {
  return axios.post('/api/vehicle', data);
};

export const searchVehicle = () => {
  return axios.get('/api/vehicle');
};
