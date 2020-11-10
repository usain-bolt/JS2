const http = require('http') // Библиотека для работы с сетью
const fs = require('fs')

const server = http.createServer((req, res) =>{
    console.log(req.url)// Что запрашивается. 3 вещи страница, стили, фавикон. На основание request  какой именно файл нам отдать
    const body = req.url === '/styles.css'  // Если пришедший url
        ? fs.readFileSync('./public/styles.css') // то кладем в body
        : fs.readFileSync('./public/index.html') // иначе
    /* console.log('hello world') */
    res.end(body) // Отдать браузеру, то что поместим с сервера
})

server.listen(3000) // Порт 
console.log('server started')