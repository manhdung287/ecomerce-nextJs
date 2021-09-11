import mongose from "mongoose";

const sizeSechma = new mongose.Schema(
  {
    value:{
        type:String,
        require:true,
        trim:true
    }
  },
  {
    timestamps: true,
  }
);

let DataSet = mongose.models.size || mongose.model('size', sizeSechma);

export default DataSet;
