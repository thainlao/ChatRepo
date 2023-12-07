import { Router } from 'express'
import { addEthWallet, getUser, login, registration, updateUserEmail, updateUserUsername } from '../controllers/auth.js'
import { checkAuth } from '../utils/CheckAuth.js';

const router = new Router()

//registration
router.post('/registration', registration)

//getUser
router.get('/getuser', checkAuth, getUser)

//login
router.post('/login', login)

//addEthWallet
router.post('/addethwallet', checkAuth, addEthWallet)

//changeEmail
router.patch("/updateemail", checkAuth, updateUserEmail);

//changeUserName
router.patch("/updateusername", checkAuth, updateUserUsername);


export default router