// var

const carBtn = document.querySelector('.cart-btn');
const closeCarBtn = document.querySelector('.close-cart');
const clearCarBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
// cart
let cart =[];

// class responsible for getting the products
class Products{
    async getProducts(){
        try {
            let result = await fetch('products.json');
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image};
            })
            return products;
        } catch (error) {
            console.log(error);
        }
    
    }
}

// the ui class - display products. responsible for getting all the items in the product and then displaying them
class UI{
    displayProducts(products){
        console.log(products);
        let result = '';
        // since displayProducts gives back an array then
        products.forEach(product => {
            result += `
            <article class="product">
            <div class="img-container">
                <img 
                src= ${product.image} 
                alt="product" class="product-img" >
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart">
                        add to bag
                    </i>
                </button>
                
            </div>
            <h3>${product.title}</h3>
            <h4>N${product.price}</h4>
            </article>
            `;
        });
        productsDOM.innerHTML = result;
    }
}

// local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// the event listner that kicks things off (once the content loads then the eventListner starts listening)
document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();

    //get all products 
    products.getProducts().then(products => {ui.displayProducts(products) 
    Storage.saveProducts(products)
    
    });
});

