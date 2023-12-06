import React, {useState, useEffect} from 'react';
import '../styles/register.css';
import { useAppDispatch, useAppSelector } from '../store/hoocs';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth, loginUser } from '../store/reducers/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { status, isLoading } = useAppSelector((state) => state.authSlice);
    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));

    const handeloginUser = () => {
        try {
            dispatch(loginUser({email, password}))
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
    },[dispatch, handeloginUser])

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



    return (
        <div className='register'>
            <h3>Login Page</h3>
                <form onSubmit={(e) => e.preventDefault()} className='register_container'>
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

                    <button onClick={handeloginUser}>Войти</button>
                </form>

                <div className='button_section'>
                    <span>Нет аккаунта?</span><a href='/registration'>Создать</a>
                </div>
        </div>
    )
}

export default Login