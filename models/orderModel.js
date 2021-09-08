import mongose from "mongoose";

const orderSechma = new mongose.Schema(
  {
    user: {
      type: mongose.Types.ObjectId,
      ref: "user",
    },
    contact: Object,
    product: Array,
    total: Number,
    cancel:{
      type: Boolean,
      default: false, 
    },
    reasonForCancellation:{
      type:String
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    paid:{
      type:Boolean,
      default:false
    },
    dayPayment:Date
  },
  {
    timestamps: true,
  }
);

let DataSet = mongose.models.order || mongose.model('order', orderSechma);

export default DataSet;
