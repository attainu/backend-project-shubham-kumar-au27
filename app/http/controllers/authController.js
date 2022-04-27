const User = require('../../models/user')
const bcrypt = require('bcrypt')  //for encrypted password
const passport = require('passport')
function authController(){
    return{
        login(req,res) {
            res.render('auth/login')
        },
        postLogin(req,res,next) {
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)

                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user,(err) =>{
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req,res, next)


        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
            const { name, email, password} = req.body

        //request validation
        if (!name || !email || !password) {
            req.flash('error','All fields are required')
            return res.redirect('/register')

        }
        // check if email exist

        User.exists({email: email}, (err,result) =>{
            if (result) {
                req.flash('error', 'Email Already registered')

                return res.redirect('/register')
            }
        })

    //hash pswrd--
    const hashedPassword = await bcrypt.hash(password,10)

    //create a user
        const user = new User({
            name,
            email, 
            password: hashedPassword
        })
        user.save().then((user) => {
            //login

            
            return res.redirect('/')

        }).catch(err => {
            req.flash('error', 'Something went wrong')
                return res.redirect('/register')

        })

        console.log(req.body)
        },
        logout(req,res) {
            req.logout()
            return res.redirect('/login') 
        }

    }
}

module.exports = authController




