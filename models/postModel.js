import mongose from "mongoose";

const postSchema = new mongose.Schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
    summary:{
        type:String,
        require:true,
        trim:true
    },
    image:{
        type:String,
        require:true,
        trim:true
    },
    content:{
        type:String,
        require:true,
        trim:true
    },
},{
    timestamps:true
})

let DataSet = mongose.models.post || mongose.model('post',postSchema);

export default DataSet;