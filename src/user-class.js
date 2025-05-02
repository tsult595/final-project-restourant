import { v4 as uuidv4 } from 'uuid';


export class User{
    id;
    userName;
    fullName
    balance
    email
    role;
    phoneNumber;
    basketItems;
    profileImage;
    isBanned;
    banDate;
    password;
    createdAt;
    lastLogin;

    constructor(userName, fullName, password){
        this.id = uuidv4()
        this.userName = userName
        this.fullName = fullName
        this.password = password
        this.balance = 0
        this.role = 'client'
        this.phoneNumber = ''
        this.address = {
            country : '',
            city : '',
            street : ''
        }
        this.basketItems = '',
        this.profileImage = 'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg',
        this.createdAt = new Date()
        this.isBanned = false
        this.banDate = null
        this.lastLogin = null

    }
}