const mongoose= require('mongoose');

const HallSchema= mongoose.Schema({

    Hall_name:
    {
        type:String,
        required:true
    },

    Hall_annex:
    {
        type:String
    },
    Room_num:
    {
        type:String,
        required:true
    }
});

const Hall = mongoose.model('Hall', HallSchema);

module.exports= Hall;