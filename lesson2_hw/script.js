let itemsInBusket = []

class GoodItem{
/**
 * description класс товар
 * @param {*} title название товара
 * @param {*} price цена товара
 * render() - создание товара
 */
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
            /* let goodDesc = document.createElement('span')
            goodDesc = `Товар: ${this.name}, цена: ${this.price}` */
            block.textContent = `Товар: ${this.name}, \nцена: ${this.price}`
            placeToRender.appendChild(block)
            block.appendChild(img)
            /* block.appendChild(goodDesc) */
            block.appendChild(btnBusket)
        }
    }
    createGoodInBusket(){
        const newGoodInBusket = new GoodInBusket(this.name, this.price)
        const currentItem = itemsInBusket.findIndex((item) => item.name === newGoodInBusket.name)
        if(currentItem < 0){
            itemsInBusket.push({newGoodInBusket, count: 1})
        }
        else newGoodInBusket[currentItem].count += 1
        console.log(itemsInBusket)
    }
}

class List{
    /**
     * description класс список товаров
     * массив товаров
     */
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

const ListInstance = new List()
/* const ListB = new ListBusket() */


class GoodInBusket{

/*     count = 0 */

    constructor(name, price){
        this.name = name
        this.price = price
/*         this.count = ++count
        /* this.render() */
    
    }

    render(){
        const busket = document.querySelector('.busket')
        /* const title = document.createElement('h3')
        title.innerText = 'Содержание корзины' */
        /* busket.appendChild(title) */
        if(busket){
            const busket = document.querySelector('.busket')
            const wrpIteminBuskets = document.createElement('div')
            wrpIteminBuskets.className = 'wrp-item-busket'
            wrpIteminBuskets.innerText = `Название ${this.name}, цена ${this.price}`
            busket.appendChild(wrpIteminBuskets)

        }
    }
    renderContainer(){

    }
}

class ListBusket{
    
    constructor(){
        this.itemsInBusket.forEach(good =>{
            good.render()
        })
    }
}
