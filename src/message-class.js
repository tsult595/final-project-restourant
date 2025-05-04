import { v4 as uuidv4 } from 'uuid';
export class Message {
id;
fullName;
email;
subject;
isRead;
message;

constructor(fullName, email, subject, message){
    this.id=uuidv4();
    this.fullName= fullName;
    this.email=email;
    this.subject=subject;
    this.message=message
    this.isRead= false
    this.createdAt= new Date()



}


}