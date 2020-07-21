const express = require("express")
const server = express()

// usar o banco de dados
const database = require("./database/database.js")

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar pasta public
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({
    extended: true
}))

//caminhos da aplicação da pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html")
})


server.get("/page-form", (req,res) => {
    // res.query sao as querys strings da url 
    //console.log(req.query) - mostra os dados que são enviados pelo formulário ao banco de dados 
    return res.render("page-form.html")
})




server.post("/saveFormData", (req, res) => {
    
    // req.body é o corpo do formulário

    // inserir dados no banco de dados 
    let query = `
     INSERT INTO salers (
            name,
            image,
            address,
            addressNum,
            state,
            city,
            items
         ) VALUES (?,?,?,?,?,?,?)`;

     // insere dados na tabela

    let values =  [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.addressNum,
        req.body.state2,
        req.body.city,
        req.body.items
    ]


    // função para haver uma resposta de cadastro ou com erro
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        } 
            // console.log("Cadastrado com sucesso")
            // console.log(this)   

            //enviar os dados para o banco de dados
            return res.render("page-form.html", { saved: true})
    }

    // chamar a função por referência - como callback 
     database.run(query, values, afterInsertData) 
   
} )


    

server.get("/results-page", (req,res) => {

    const search = req.query.search

    if(search == "") {
        // quando a pesquisa não tiver resultado/ for vazia retorna:
        return res.render("results-page.html", {total: 0})
    }

    

    // puxar os dados do banco de dados // template literals com string em SQL colocar aspas simples
    database.all(`
     SELECT * FROM salers WHERE city LIKE '%${search}%';
     `, function(err,rows){
       if(err) {
           return console.log(err)
       } 
        const total = rows.length
       return res.render("results-page.html", {salers: rows, total: total})
     })

    
})





// ligar o servidor

server.listen(3000, () => {
    console.log('server started')
    })

