import { OrderLineModel } from "./orderLineModel";

export class OrderModel {
    _id: String;
    totalAmount: number;
    userid: String;
    discount: String;
    status: String;
    constructor() {
        this._id = "";
        this.totalAmount = 100;
        this.userid = "";
        this.discount = "";
        this.status = "";
    }
}