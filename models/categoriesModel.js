import mongose from "mongoose";

const categoriesSechma = new mongose.Schema(
  {
    name:{
        type:String,
        require:true,
        trim:true
    }
  },
  {
    timestamps: true,
  }
);

let DataSet = mongose.models.category || mongose.model('category', categoriesSechma);

export default DataSet;
