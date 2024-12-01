import { URL } from "../api/serverUrls"
import { getAPICall } from "./getApiCall"

export const searchAndListCustomer = (query?: string) => {
  let url = URL.manageParking + URL.customer;
  if (query) {
    url += `?query=${query}`;
  }
  return getAPICall(url)
    .then((res: any) => {
      // Transform the response data
      const formattedData = res.customers.map((customer: any) => ({
        label: customer.name,
        value: customer.id
      }));
      
      return formattedData;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchAndListVehicle = (query?: string) => {
  let url = URL.manageParking + URL.vehicle;
  if (query) {
    url += `?query=${query}`;
  }
  return getAPICall(url)
    .then((res: any) => {
      const formattedData = res.vehicles.map((vehicle: any) => ({
        label: vehicle.vehicleNo,
        value: vehicle.id
      }));
      return formattedData;
    })
    .catch((err) => {
      throw err;
    });
}

export const searchAndListParkingSpot = (query?: string) => {
  let url = URL.master + URL.parkingSpot;
  if (query) {
    url += `?query=${query}`;
  }
  return getAPICall(url)
    .then((res: any) => {
      const formattedData = res.parkingSpots.map((parkingSpot: any) => ({
        label: parkingSpot.spotNumber,
        value: parkingSpot.id
      }));
      return formattedData;
    })
    .catch((err) => {
      throw err;
    });
}

export const searchAndListVehicleType = (query?: string) => {
  let url = URL.master + URL.vehicleType;
  if (query) {
    url += `?query=${query}`;
  }
  return getAPICall(url)
    .then((res: any) => {
      const formattedData = res.vehicleTypes.map((vehicleType: any) => ({
        label: vehicleType.name,
        value: vehicleType.id
      }));
      return formattedData;
    })
    .catch((err) => {
      throw err;
    });
}