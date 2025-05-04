import { v4 as uuidv4 } from 'uuid';
export class Reservation {
    fullName;
    phoneNumber;
    guestCount;
    reservationTime;
    createdAt;
    guestNotes;
    status

    constructor(fullName, phoneNumber, guestCount, reservationTime, guestNotes=""){
        this.id=uuidv4();
        this.fullName=fullName;
        this.phoneNumber= phoneNumber;
        this.guestCount=guestCount;
        this.reservationTime=reservationTime;
        this.guestNotes=guestNotes
        this.status="pending"
        this.createdAt=new Date();


    }
}