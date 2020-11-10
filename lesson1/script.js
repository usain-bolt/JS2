const fs = require('fs') // Внутри куча методов. Библиотека для работа с файлами
const text = fs.readFileSync('script.js', 'utf-8'); //Прочитать содержимое файла, в кодировке
console.log(text)


