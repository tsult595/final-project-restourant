export class Menu {

    constructor(title, image, category, available, preparationTime, ingredient, country, price){
this.title=title;
this.image=image;
this.category=category;
this.available=available;
this.preparationTime= preparationTime;
this.ingredient=ingredient;
this.country=country;
this.price=price;
this.reviews= [];
this.createdAt=new Date();
    }
}