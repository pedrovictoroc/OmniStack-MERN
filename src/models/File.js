const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {     //Guarda o caminho para o arquivo
        type: String,
        required: true
    }},{
        timestamps: true,    //Cria um campo de data para Created e Updated no banco de dados}
        //Sempre que for carregado em um JSON ou objeto, utilizar o Virtual
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

File.virtual('url').get(function() {
    const url = process.env.URL ||'http://localhost:3333';

    return `${url}/files/${encodeURIComponent(this.path)}`
});

module.exports = mongoose.model("File",File);