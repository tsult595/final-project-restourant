import { getUserById } from "../services/users/requests.js";
import { getRole, getUser } from "../store/userStore.js";


export async function protectAdminRoute(){
    const role = await getRole();
    if(role!=="admin"){
        window.location.replace("/")
    }
}

export async function protectUserRoute() {
 const user = getUser();
 const response =await getUserById (user) ;
 if(response.data){
    window.location.replace("/profile.html")
 }  
}