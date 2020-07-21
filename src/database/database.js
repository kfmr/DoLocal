// // // importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//  instanciar o objeto que irá fazer operações no banco de dados
const database = new sqlite3.Database("./src/database/database.db")

module.exports = database
 // usar o objeto criado para popular o banco de dados
// database.serialize(()=> {
//     // função para criar tabela SQL
//     database.run(`
//              CREATE TABLE IF NOT EXISTS salers (
//              id INTEGER PRIMARY KEY AUTOINCREMENT,
//              name TEXT,         
//                 image TEXT,
//              address TEXT,
//            addressNum TEXT,
//              state TEXT,
//              city TEXT,
//              items TEXT
//          );
//      `)

//     let query = `
//      INSERT INTO salers (
//         name,
//          image,
//          address,
//              addressNum,
//              state,
//              city,
//              items
//          ) VALUES (?,?,?,?,?,?,?)`;

//      // insere dados na tabela

//     let values =  ["Amigurumis",
//          "https://cdn.diys.com/wp-content/uploads/2016/02/crochet-cat.jpg",
//          "Rua 8",
//          "sem nº",
//          "São Paulo",
//          "Cordeiropólis",
//          "Crochê"]


//     // função para haver uma resposta de cadastro ou com erro
//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         } 
//             console.log("Cadastrado com sucesso")
//             console.log(this)   
//     }

//     // chamar a função por referência - como callback 
//      //database.run(query, values, afterInsertData) 


//     // Consultar dados na tabela 
//  database.all(`
//  SELECT * FROM salers`, function(err,rows){
//    if(err) {
//        return console.log(err)
//    } 
//    console.log("Registros: ")
//    console.log(rows)
//  })

// //  deletar dados na tabela 
// database.run(`DELETE FROM salers WHERE id=?`,[13], function(err, rows) {
//  if(err) {
//        return console.log(err)
//    } 
//    console.log("Registros: ")
//    console.log(rows)
//  })

// modificar dados na tabela 
// database.run(` UPDATE salers SET city = "Cordeirópolis" WHERE id=?`, [1],  function(err, rows) {
//    if(err) {
//          return console.log(err)
//      } 
//      console.log("Registros: ")
//      console.log(rows)
//    })
// })
