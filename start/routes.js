'use strict'

const RouteGroup = require('@adonisjs/framework/src/Route/Group')
const { route } = require('@adonisjs/framework/src/Route/Manager');
const UserController = require('../app/Controllers/Http/UserController');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('create', 'UserController.store');
    Route.get('users', 'UserController.index');
    Route.put('update/:id', 'UserController.update');
    Route.delete('delete/:id', 'UserController.delete');
}).prefix('user');
