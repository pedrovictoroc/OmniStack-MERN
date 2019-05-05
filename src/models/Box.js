const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{type: mongoose.Schema.Types.ObjectId,ref:"File"}]
    //declaro que é um array do tipo File
},{
    timestamps: true    //Cria um campo de data para Created e Updated no banco de dados
});

module.exports = mongoose.model("Box",Box);