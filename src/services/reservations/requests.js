import { instance } from "../axiosInstance";
import { endpoints } from "../../constants/constants.js";


export async function getAllReservation() {
    try {
        const response = await instance.get(endpoints.reservations)
        return {
            data: response.data,
            message: "reservations received successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to fetch reservations!"
        }
    }
}

export async function getReservationById(id) {
    try {
        const response =await instance.get(endpoints.reservations + `/${id}`)
        return {
            data: response.data,
            message: "reservation received successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to fetch reservation!"
        }
    }
}

export async function makeReservation (newReservation)
 {
    try {
        const response =await instance.post(endpoints.reservations, newReservation)
        return {
            data: response.data,
            message: "reservation item posted successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to post reservation!"
        }
    }
}

export async function updateReservationStatus (id, newStatus) {
    try {
        const response =await instance.patch(endpoints.reservations + `/${id}`,
           { status: newStatus,}
     
        )
        return { 
            data: response.data,
            message: "reservation updated successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to update reservation!"
        }
    }
}

export async function deleteReservation  (id) {

    try {
        const response =await instance.delete(endpoints.reservations + `/${id}`
       
        )
        return {
            data: response.data,
            message: "reservation deleted successfully"
        }
    } catch (error) {
        return {
            data: null, 
            message: "failed to delete reservation!"
        }
    }
}
