import { getUserById } from "./users/requests"

export async function getUser (){
    const user = JSON.parse(localStorage.getItem("user")) || undefined;
    if (!user) return null;
    
      const userData = await getUserById(user);
      return userData.data;
    
    
    }
    
    export function setUser (user){
    
        localStorage.setItem("user", JSON.stringify(user));
        return {
            message: "user set to local"
        }
    }
    export async function getRole() {
        const user = JSON.parse(localStorage.getItem("user")) || undefined;
        if (user){
    const {data} = await getUserById (user)
    const {role} =data
    return role
    }
    else{
        return null
    }
    
    }
    
    export function logout (){
    
        localStorage.setItem("user", JSON.stringify(null))
        return {
            message: "logged out"
        }
    }