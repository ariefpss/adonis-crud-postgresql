'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
    
    //TODO: Create data user
    async store ({request, response}){
        const userData = request.only(['username', 'email', 'password']);
        
        const userModel = new User();
        
        userModel.username = userData.username;
        userModel.email = userData.email;
        userModel.password = userData.password;
        
        await userModel.save();
        
        return response.status(201).json(userModel);
    };
    
    //TODO: Read username and email user
    async index({response}){
        const userData = await Database.select('username', 'email').from('users');

        return response.status(201).json(userData);
    };

    //TODO: Update data user
    async update({request, response, params}){
        const id = params.id;
        const inpUser = request.input('email');

        await User.query()
                  .where('id', id)
                  .update({email: inpUser});
        
        return response.status(201).json('Data berhasil diupdate!');
    };

    //TODO: Delete data user
    async delete({response, params}){
        const id = params.id;
        const userDel = await User.findOrFail(id);
        await userDel.delete();

        return response.status(201).json('Data berhasil dihapus!!');
    }
}

module.exports = UserController
