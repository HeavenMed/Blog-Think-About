const User = require('../models/User')

const bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static login(req , res) {
        res.render('auth/login')
    }

    static register(req , res) {
        res.render('auth/register')
    }

    static async registerPost(req , res) {
        const { name , email, password , confirmpassword } = req.body

        // Password Match Validation

        if(password != confirmpassword){
            //Flash message
            req.flash('message' , "As senhas não conferem, tente novamente!")
            req.render('auth/register')

            return
        }

        //check if user exists

        const checkIfUserExists = await User.findOne({where: {email : email}})

        if(checkIfUserExists){
            req.flash('message' , "O e-mail já está em Uso!");
            req.render('auth/register')

            return
        }

        //Create a password
        // Método para criptografar a senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password , salt)

        const user = {
            name,
            email,
            password : hashedPassword

        }
        try{
            await User.create(user)

            //Inicializar a Sessão do usuário
            req.session.userid = user.id

            req.flash('message' , 'cadastro realizado com sucesso!');

            req.session.save(() => {
                res.redirect('/')
            })

            res.redirect('/')
        }catch(err){
            console.log(err)
        }

        
    }

}