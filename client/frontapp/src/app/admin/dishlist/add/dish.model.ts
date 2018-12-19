export class DishModel {
  public name: string;
  public description: string;
  public image: String;
  public orderingPosition: number;
  public uom: string;
  public category: string;
  public types: Array<DishTypeModel>;
  constructor() {
    this.name = "";
    this.description = "";
    this.uom = "";
    this.image = "";
    this.orderingPosition = 0;
    this.category = "";
    this.types = [];
  }
}

export class DishTypeModel {
  public name: string;
  public sizes: Array<DishSizeModel>;
  constructor() {
    this.name = "";
    this.sizes = [];
  }
}

export class DishSizeModel {
  public name: string;
  public price: number;
  constructor() {
    this.name = "";
    this.price = 0;
  }
}
