import { apiCallProtected } from "../api/axios";
import { URL } from "../api/serverUrls";
import { getAPICall, postAPICall } from "./getApiCall"

export const getCheckInList = () => {
  return getAPICall(URL.manageParking + URL.getCheckInList);
}

export const createCustomer = (data: any) => {
  return postAPICall(URL.manageParking + URL.customer, data);
}

export const createVehicle = (data: any) => {
  return apiCallProtected.post(URL.manageParking + URL.vehicle, data);
}

export const createCheckIn = (data: any) => {
  return apiCallProtected.post(URL.manageParking + URL.checkIn, data);
}

export const getCheckInById = (id: string) => {
  return getAPICall(URL.manageParking + URL.checkIn + `/${id}`);
}

export const updateCheckIn = (id: string, data: any) => {
  return apiCallProtected.put(URL.manageParking + URL.checkIn + `/${id}`, data);
}

export const checkoutVehicle = (id: string) => {
  return apiCallProtected.post(URL.manageParking + URL.checkout + `/${id}`);
}

export const getVehicleList = () => {
  return getAPICall(URL.manageParking + URL.vehicle);
}

export const getVehicleTypesList = () => {
  return getAPICall(URL.master + URL.vehicleType);
}

export const getParkingSpotList = () => {
  return getAPICall(URL.master + URL.parkingSpot);
}

export const getPlansList = () => {
  return getAPICall(URL.master + URL.tariff);
}

export const getCustomersList = () => {
  return getAPICall(URL.manageParking + URL.customer);
}