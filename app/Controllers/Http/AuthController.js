'use strict'

const User = use('App/Models/User.js');
const Hash = use('Hash');

class AuthController {
    async login({request, auth}){
        const {email, password} = request.only(['email', 'password']);

        return auth.authenticator('jwt')
                   .withRefreshToken()
                   .attempt(email, password);

    };

    async logout({auth, response}){
        const JWToken = auth.getAuthHeader();
        
        await auth.authenticator('jwt')
                  .revokeTokens([JWToken]);

        return response.json({
            message: 'Logout with clear token successfully!!!'
        });
    };
}

module.exports = AuthController
