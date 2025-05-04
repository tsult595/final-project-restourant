import { instance } from "../axiosInstance";
import { endpoints } from "../../constants/constants";



export async function register(newUser) {
    try {
        const response = await instance.post(endpoints.users, newUser)
        console.log("User registered:", response.data);
        return {
            data: response.data,
            message: "user registered successfully!",
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to register!"
        }
    }

}
export async function login(email, password) {
    try {
        const {data: users}  =await getAllUsers()
        const isValid =users.find((u)=> u.email===email&& u.password===password)
 if(isValid){
    await instance.patch(endpoints.users + `/${isValid.id}`,{
        lastLogin: new Date(),
    })
    return {
        data: isValid,
        message: "signed is successfully!",
    }
 } 
 else{
    return {
        data: isValid,
        message: "email or password is incorrect!",
    }
 }   
    } catch (error) {
        return {
            data: null,
            message: "login failed!"
        }
    }

}

export async function checkDuplicateUsername(username) {
    try {
        const user = await instance.get(endpoints.users + `?username=${username}`)
 if(user.data.length>0){
    return {
        success: false,
        message: "username already in use!",
    }
 } 
 else{
    return {
        success: true,
        message: "username is available!",
    }
 }   
    } catch (error) {
        return {
            data: null,
            message: "failed to check  username!"
        }
    }

}


export async function checkDuplicateEmail(email) {
    try {
        const user = await instance.get(endpoints.users + `?email=${email}`)
 if(user.data.length>0){
    return {
        success: false,
        message: "email already in use!",
    }
 } 
 else{
    return {
        success: true,
        message: "email is available!",
    }
 }   
    } catch (error) {
        return {
            data: null,
            message: "failed to check  email!"
        }
    }

}



export async function getAllUsers() {
    try {
        const response = await instance.get(endpoints.users)
        return {
            data: response.data,
            message: "users received successfully!",
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to get users!"
        }
    }

}
export async function getUserById(id) {
    try {
        const response = await instance.get(endpoints.users + `/${id}`)
        return {
            data: response.data,
            message: "user received successfully!",
        }
    } catch (error) {
        return {
            data: null,
            
            message: "failed to get user!"
        }
    }

}

export async function addBalance(id, balance) {
    try {
        const response = await instance.patch(endpoints.users + `/${id}`, {
            balance: balance,
        })
        return {
            data: response.data,
            message: "balance updated successfully!",
        }
    } catch (error) {
        return {
            data: response.data,
            message: "balance update failed!"
        }
    }

}



export async function updatePassword(id, currentPassword, newPassword) {
    try {
        const {data: user}= await getUserById(id)
        if (user.password === currentPassword) {

            const response = await instance.patch(endpoints.users, {
                password: newPassword,
            })


            return {
                data: response.data,
                message: "password updated successfully!",
            }
        } else {
            return {
                data: null,
                message: "current password is incorrect!"
            }
        }}
    catch (error) {
            return {
                data: null,
                message: "password update failed!"
            }
        }

    
    
}

export async function updateInfo(id, updateInfo) {
    try {
          const response = await instance.patch(endpoints.users +`/${id}`, updateInfo)
        
            return {
                data: response.data,
                message: "user info updated successfully!",
            }
        } 
    catch (error) {
            return {
                data: null,
                message: "user info update failed!"
            }
        } 
}

export async function banUser(id, banMinutes) {
    try {
          const response = await instance.patch(endpoints.users +`/${id}`,{
            isBanned: true,
            banDate: new Date(Date.now() + banMinutes * 60 * 1000)
          })
        
            return {
                data: response.data,
                message: "user banned successfully!",
            }
        } 
    catch (error) {
            return {
                data: null,
                message: "failed to ban user"
            }
        } 
}


export async function unBanUser(id) {
    try {
          const response = await instance.patch(endpoints.users +`/${id}`,{
            isBanned: false,
            banDate: null
          })
        
            return {
                data: response.data,
                message: "user unbanned successfully!",
            }
        } 
    catch (error) {
            return {
                data: null,
                message: "failed to unban user"
            }
        } 
}