import mongose from "mongoose";

const bannerSechma = new mongose.Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true
        },
        subtitle: {
            type: String,
            require: true,
            trim: true
        }, 
        image: {
            type: String,
            require: true,
            trim: true
        },
        product:{
            type: String,
            require: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

let DataSet = mongose.models.banner || mongose.model('banner', bannerSechma);

export default DataSet;
