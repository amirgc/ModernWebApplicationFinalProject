export class Dish {
  name: String;
  description: String;
  image: String;
  orderingPosition: String;
  uom: String;
  category: String;
  types: [{ name: String; sizes: [{ name: String; price: Number }] }];
  price: { type: Number; default: 0 };
}
