const { json } = require('express')

function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {
         
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            // Check if item does not exist in cart 
            if(!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice =  cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })
        },
        delete(req,res){
            let cart = req.session.cart.items

            //check if id is equal or not
            if(cart.item[req.body._id] === data_pizza_id){
                cart.item[req.body._id].qty = 0
            }
            
        }
    }
}
module.exports = cartController
