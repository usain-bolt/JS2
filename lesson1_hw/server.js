const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url)
    let body = ""

    try{
        switch (req.url){
            case "/": 
                body = fs.readFileSync('./public/index.html')
                break
            case "/script.js": 
                body = fs.readFileSync('./public/script.js')
                break
            case '/styles.css': 
                body = fs.readFileSync('./public/styles.css')
                break
        }
        res.end(body)
    }
    catch(err){
        console.log(err)
    }
})

const port = process.env.PORT ||  3000
server.listen(port)

console.log('server is started')