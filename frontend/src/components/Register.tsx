import React, {useState, useEffect} from 'react';
import '../styles/register.css';
import { useAppDispatch, useAppSelector } from '../store/hoocs';
import { checkIsAuth, registerUser } from '../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { status, isLoading } = useAppSelector((state) => state.authSlice);
    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));

    useEffect(() => {
        if (status) {
            toast.success(status, {
                position: 'bottom-right', // Устанавливаем позицию в правый нижний угол
                autoClose: 3000, // Закрыть уведомление через 3 секунды
                style: {
                    background: 'white',
                    color: 'black',
                },
            });
        }
    }, [status]);

    const registration = () => {
        try {
            dispatch(registerUser({username, email, password}))
            setEmail('');
            setUsername('');
            setPassword('');
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/dashboard')
        }
    },[dispatch, registration])

    return (
        <div className='register'>
            <h3>Register on future best nft product</h3>
                <form onSubmit={(e) => e.preventDefault()} className='register_container'>
                    <div> 
                        <h2>Username</h2>
                        <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Your username...'/>
                    </div>

                    <div>
                        <h2>E-mail</h2>
                        <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Your email...'/>
                    </div>

                    <div>
                        <h2>Password</h2>
                        <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Your password...'/>
                    </div>

                    <button onClick={registration}>Регистрация</button>
                </form>

                <div className='button_section'>
                    <span>Уже есть аккаунт?</span><a href='/login'>Войти</a>
                </div>
            
        </div>
    )
}

export default Register