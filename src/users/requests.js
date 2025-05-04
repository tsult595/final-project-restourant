import axios from "axios";
import { endpoints } from "../constans/constans";
import { instance } from "../service/axios-instance";

// Register a new user
export async function register(newUser) {
    console.log(newUser)
  try {


    const response = await instance.post(endpoints.users, newUser);
    return {
      data: response.data,
      message: 'User is ok!'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Registration failed!'
    };
  }
}

// Get all users
export async function getAllUsers() {
  try {

    const response = await instance.get(endpoints.users);
    return {
      data: response.data,
      message: 'Users fetched successfully'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Failed to fetch users'
    };
  }
}

// Get a single user by ID
export async function getUserById(id) {
  try {
    const response = await instance.get(`${endpoints.users}/${id}`);
    return {
      data: response.data,
      message: 'User fetched successfully'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Failed to fetch user'
    };
  }
}

// Add balance to a user
export async function addBalance(id, balance) {
  try {
    const response = await instance.patch(`${endpoints.users}/${id}`, {
      balance
    });
    return {
      data: response.data,
      message: 'Balance updated'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Balance update failed'
    };
  }
}

// Update user password
export async function updatePassword(id, current, newPassword) {
  try {
    const userRes = await getUserById(id);
    const user = userRes.data;

    if (user?.password === current) {
      const response = await instance.patch(`${endpoints.users}/${id}`, {
        password: newPassword
      });
      return {
        data: response.data,
        message: 'Password updated'
      };
    } else {
      return {
        data: null,
        message: 'Current password is incorrect'
      };
    }
  } catch (error) {
    return {
      data: null,
      message: 'Password update failed'
    };
  }
}

// Update user info
export async function updateInfo(id, updatedInfo) {
  try {
    const response = await instance.patch(`${endpoints.users}/${id}`, updatedInfo);
    return {
      data: response.data,
      message: 'User info updated'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Update failed!'
    };
  }
}

// Ban a user for a number of minutes
export async function banUser(id, banMinutes) {
  try {
    const response = await instance.patch(`${endpoints.users}/${id}`, {
      isBanned: true,
      banDate: Date.now() + banMinutes * 60 * 1000
    });
    return {
      data: response.data,
      message: 'User banned'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Failed to ban user'
    };
  }
}

// Unban a user
export async function unBan(id) {
  try {
    const response = await instance.patch(`${endpoints.users}/${id}`, {
      isBanned: false,
      banDate: null
    });
    return {
      data: response.data,
      message: 'User unbanned'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Failed to unban user'
    };
  }
}

// Login with email and password
export async function login(email, password) {
  try {
    const usersRes = await getAllUsers();
    const users = usersRes.data || [];

    const isValid = users.find(u => u.email === email && u.password === password);

    return {
      data: isValid || null,
      message: isValid ? 'Login successful' : 'Email or password is incorrect'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Login failed'
    };
  }
}


export async function checkDoublecateUserName(userName) {
  try {
    const response = await instance.get(`${endpoints.users}?username=${userName}`);
    console.log( "res dat",response)
    return {
      success: response.data.length === 0,
      message: response.data.length > 0 ? 'Username already in use' : 'Username available'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to check username'
    };
  }
}


export async function checkDoublecateUserEmail(userEmail) {
  try {
    const response = await instance.get(`${endpoints.users}?email=${userEmail}`);
    return {
      success: response.data.length === 0,
      message: response.data.length > 0 ? 'Email already in use' : 'Email available'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to check email'
    };
  }
}
