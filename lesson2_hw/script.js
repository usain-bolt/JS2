let itemsInBusket = []

let sum = 0

class GoodItem{

    name = ""
    price = 0

    constructor({ name, price} ){ // деструктуризация
        this.name = name
        this.price = price
    }

    render(){
        const placeToRender = document.querySelector('.goods-list')
        if(placeToRender){
            const block = document.createElement('div')
            block.classList = 'good'
            const img = document.createElement('img')
            img.className = 'good-img'
            img.src = 'images/img.png'
            const btnBusket = document.createElement('button')
            btnBusket.className = 'good-btn'
            btnBusket.innerText = 'Добавить'
            btnBusket.addEventListener('click', () => {
                this.createGoodInBusket()
            })
            block.textContent = `Товар: ${this.name}, \nцена: ${this.price}`
            placeToRender.appendChild(block)
            block.appendChild(img)
            block.appendChild(btnBusket)
        }
    }
    createGoodInBusket(){
        const newGoodInBusket = new GoodInBusket(this.name, this.price)
        const currentItem = itemsInBusket.findIndex((item) => item.name === newGoodInBusket.name)
        if(currentItem >= 0){
            itemsInBusket[currentItem].count +=1
        }
        else itemsInBusket.push({...newGoodInBusket, count: 1})
        console.log(itemsInBusket)
    }
}

class List{
    items = []

    constructor(){
        let goods = this.fetchGoods()
        goods = goods.map(cur => {
            return new GoodItem(cur)
        })
        this.items.push(...goods)
        this.render()
    }
    fetchGoods(){ // Заглушка получения товаров
        return [
            {name: 'Shirt', price: 150},
            {name: 'Socks', price: 50},
            {name: 'Jacket', price: 350},
            {name: 'Shoes', price: 250},
        ]
    }  
    render(){
        this.items.forEach(good => {
            good.render()
        })
    }
}

const listInstance = new List()

class GoodInBusket{
    constructor(name, price){
        this.name = name
        this.price = price
    }
}

class ListBusket{
    constructor(){
        console.log(itemsInBusket)
        itemsInBusket.forEach(good =>{
            this.render(good.name, good.price, good.count)
        })
        this.sumElements()
    }
    sumElements(){
        sum = 0
        itemsInBusket.forEach(item => {
            sum += item.price * item.count
            console.log(sum)
            const sumWrp = document.querySelector('h3')
            sumWrp.innerText = `Общая сумма корзины ${sum}`
        })
    }
    render(name, price, count){
        const busket = document.querySelector('.wrp-item-busket')
        if(busket){
            busket.innerText = ''
            itemsInBusket.forEach(item => {
                busket.innerText += `Название: ${item.name}. Цена: ${item.price}. Кол-во: ${item.count} \n`
            })
        }
    }
}
const wrp = document.querySelector('header')
const btnBusketRender = document.createElement('button')
btnBusketRender.innerText = 'Отобразить корзину'
btnBusketRender.className = 'btn-busket'
wrp.append(btnBusketRender)

const deleteGoodsinBusket = document.createElement('button')
deleteGoodsinBusket.innerText ='Очистить корзину'
deleteGoodsinBusket.className = 'btn-busket'
wrp.append(deleteGoodsinBusket)


const goodList = document.querySelector('main')
const btnAddGoods = document.createElement('button')
btnAddGoods.innerText = 'Добавить товары к списку'
btnAddGoods.className = 'btn-add'
goodList.append(btnAddGoods)

btnBusketRender.addEventListener('click', () =>{
    const wrap = document.querySelector('.busket')
    const sumWrp = document.createElement('h3')
    wrap.appendChild(sumWrp)

    const wrpIteminBuskets = document.createElement('div')
    wrpIteminBuskets.className = 'wrp-item-busket'
    wrap.appendChild(wrpIteminBuskets)

    const listInBusket = new ListBusket()
})

deleteGoodsinBusket.addEventListener('click', () =>{
    const busketDiv = document.querySelector('.busket')
    itemsInBusket = []
    busketDiv.innerHTML = ''
})

btnAddGoods.addEventListener('click', () =>{
    const newList = new List()
})
