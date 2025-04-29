import { endpoints } from "../constans/constans";
import { instance } from "../service/axios-instance";

export async function getAllMenu(){
    try {
        let response = await instance.get(endpoints.menu)
        return {
            data: response.data,
            message : 'menu received!'
        }
    } catch (error) {
        console.log(error);
        return{
            data: null,
            message :  'Failed',    
        }
    }
}
export async function getAllMenuById(id){
    try {
        let response = await instance.get(endpoints.menu + `/${id}`)
        return {
            data: response.data,
            message : 'menu item received!'
        }
    } catch (error) {
        console.log(error);
        return{
            data: null,
            message :  'Failed fetch',    
        }
    }
}
export async function postMenu(newMenuItem){
    try {
        let response = await instance.post(endpoints.menu , newMenuItem)
        return {
            data: response.data,
            message : 'menu item received!'
        }
    } catch (error) {
        console.log(error);
        return{
            data: null,
            message :  'Failed fetch',    
        }
    }
}
export async function updateMenu(id , updatedMenuItem){
    try {
        let response = await instance.patch(endpoints.menu +  `/menu${id}`)
        return {
            data: response.data,
            message : 'updated!'
        }
    } catch (error) {
        console.log(error);
        return{
            data: null,
            message :  'Failed fetch',    
        }
    }
}
export async function deleteMenu(id){
    try {
        let response = await instance.delete(endpoints.menu +  `/${id}`)
        return {
            data: response.data,
            message : 'deleted!'
        }
    } catch (error) {
        console.log(error);
        return{
            data: null,
            message :  'Failed fetch',    
        }
    }
}