import { Router } from 'express'
import { addEthWallet, getUser, login, registration } from '../controllers/auth.js'
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
export default router