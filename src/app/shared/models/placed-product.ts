export class PlacedProduct{
    
        imageUrl:string;
        price:number;
        title:string;

        constructor(init: Partial<PlacedProduct>){

            Object.assign(this,init);

        }

    
    



}