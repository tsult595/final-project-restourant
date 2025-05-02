export class Menu{
    constructor(title ,ingredients , country, image, category, available, preparationTime, price){
       this.title = title
       this.ingredients = ingredients
       this.country = country
       this.image = image
       this.category = category
       this.available = available
       this.preparationTime = preparationTime
       this.price = price
       this.reviews = []
       this.createAt = new Date()
    }
}