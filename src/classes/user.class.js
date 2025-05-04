import { v4 as uuidv4 } from 'uuid';
export class User{
    id;
    username;
    fullName;
    balance;
    email;
    role;
    phoneNumber;
    basket;
    profileImage;
    isBanned;
    banDate;
    password;
    createdAt;
    lastLogin;
    address;


constructor(username, email, fullName, password ){
this.id=uuidv4()
this.username=username;
this.email=email;
this.fullName=fullName;
this.password=password;
this.role="client";
this.phoneNumber=""
this.balance=0;
this.address ={
country:"",
city:"",
street:""
};
this.basket=[];
this.profileImage="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
this.createdAt= new Date();
this.isBanned= false;
this.banDate=null;
this.lastLogin= null;

}

}