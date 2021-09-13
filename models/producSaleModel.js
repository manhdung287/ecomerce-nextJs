import mongose from "mongoose";

const productSaleSchema = new mongose.Schema(
  {
    products:{
        type:Array,
        require:true,
        trim:true
    },
    time:{
        type:Number,
        require:true,
    }
  },
  {
    timestamps: true,
  }
);

let DataSet = mongose.models.productSale || mongose.model('productSale', productSaleSchema);

export default DataSet;
