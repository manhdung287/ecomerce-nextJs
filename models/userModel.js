import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  root: {
    type: Boolean,
    default: false,
  },
  isAdmin:{
    type: Boolean,
    default: false,
  },
  isManager:{
    type: Boolean,
    default: false,
  },
  isContent:{
    type: Boolean,
    default: false,
  },
  avartar: {
    type: String,
    default: 'https://cdn.tnsport.vn/data/upload/2021/1/17/kiojny5f.jpg',
  },
},{
    timestamps:true
});

let DataSet = mongoose.models.user || mongoose.model('user',userSchema);

export default DataSet;