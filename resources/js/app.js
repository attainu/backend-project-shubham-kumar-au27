import axios from 'axios';
import Noty from 'noty';  //for cart notification
import {initAdmin} from './admin';
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart',pizza).then(res =>{
        cartCounter.innerText = res.data.totalQty
        new Noty({  //for adding the cart items notification
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart'
        }).show();
    }).catch(err =>{
        new Noty({  //for adding the cart items notification
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong'
        }).show();

    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })   
});

initAdmin()


