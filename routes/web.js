const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
//middlewares
const admin = require('../app/http/middleware/admin')
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')


function initRoutes(app) {
    
    app.get('/',homeController().index)

    app.get('/login',guest,authController().login)
    
    app.post('/login',authController().postLogin)

    app.get('/register',guest,authController().register)

    app.post('/register', authController().postRegister)
    
    app.post('/logout',authController().logout) //will logout

    app.get('/cart',cartController().index)   //will return the card---

    app.post('/update-cart',cartController().update) //wi'' update the items in the cart--
    //for adding
    app.post('/add-pizza',cartController().add)
    //for removing
    app.post('/remove-pizza',cartController().remove)
    

    //Customer Routes

    app.post('/orders',auth, orderController().store)
    app.get('/customers/orders',auth,orderController().index)
    app.get('/customers/orders/:id',auth,orderController().show)

    //Admin routes--
    app.get('/admin/orders',admin,adminOrderController().index)

    //admin/order/status
    app.post('/admin/order/status',admin,statusController().update)

}
module.exports = initRoutes



