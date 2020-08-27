'use strict'

const User = use('App/Models/User.js');
const Hash = use('Hash');

class UserController {
    async store({request, response}){
        try{
            const data = request.only(['username', 'email', 'password']);
            
            const UserExists = await User.findBy('email', data.email);
            
            if(UserExists){
                return response.status(400)
                               .send({message: {error: 'User telah ada!!'}});
            }
            
            const user = await User.create(data);
            
            return user;
            
        }catch(err){
            return response.status(err.status).send(err);
        }
    };

    async index(){
        const data = await User.all();
    
        return data;
    
    };
    
    async update({request, response, params}){
        const id = params.id;
        const {username, password, nwemail} = request.only(['username', 'password', 'nwemail']);

        const user = await User.findByOrFail('id', id);

        const passdHash = await Hash.verify(password, user.password);
        
        if(!passdHash){
            return response.status(400).send({message: {error: 'Password incorrect'}});
        };

        user.username = username;
        user.email = nwemail;

        await user.save();

        return response.json({
            status: 'SUCCESS',
            message: 'Email success updated!',
            data: user
        })
        
    };

    async destroy({response, params}){
        const id = params.id;

        const user = await User.findBy('id', id);

        if(!user){
            return response.json({
                stsus: 'GAGAL',
                message: 'Data tidak ada didalam database!!'
            });
        };

        await user.delete();
        
        
        return response.json({
            status: 'SUCCESS',
            message: 'Data berhasil didelete!!'
        });

    };
};

module.exports = UserController;
