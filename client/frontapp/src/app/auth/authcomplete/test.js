//dish
{
  _id: Object;
  Description: string;
  Image: String;
  Name: string;
  OrderingPosition: number;
  UoM: String;
  Category: string;
  types: [
    {
      name: string,
      sizes: [{ name: string, price: number }]
    }
  ];
}

//Order
{
  _id: object;
  totalAmount: number;
  userid: user;
  discount: string;
  orderline: [
    {
      Orderlineid: number,
      Amount: number,
      Dish: string,
      qty: number,
      Rate: number,
      Size: string,
      Type: string,
      UoM: string
    }
  ];
}

//user
{
  name: String;
  email: String;
  password: String;
  phone: String;
  address: String;
  role: String;
}
