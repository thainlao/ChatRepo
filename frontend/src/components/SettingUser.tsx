import { useAppDispatch, useAppSelector } from "../store/hoocs";
import {useEffect, useState} from 'react';
import { getMe } from "../store/reducers/authSlice";
import '../styles/setting.css';
import { updateEmail, updateUsername } from "../store/reducers/userServiceSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingUser = () => {
    const user = useAppSelector((state) => state.authSlice.user);
    const dispatch = useAppDispatch();
    const { isLoading, status } = useAppSelector((state) => state.authSlice);
    
    useEffect(() => {
        dispatch(getMe())
      }, [])

  //newEmail
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState<string>(user?.email || '');

  const handleEmailChange = (value: string) => {
    setNewEmail(value);
  };

  const handleSaveEmail = () => {
    dispatch(updateEmail(newEmail))
    setIsEditingEmail(false);
  }

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };
  
  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
  };

    //newUserUsername
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState<string>(user?.username || '');

  const handleUsernameChange = (value: string) => {
    setNewUsername(value);
  };

  const handleSaveUsername = () => {
    dispatch(updateUsername(newUsername))
    setIsEditingUsername(false);
  }

  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };
  
  const handleCancelEditUsername = () => {
    setIsEditingUsername(false);
  };

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
        <div className="setting">
            <h2>Поля доступные к редактированию</h2>

            <div className="setting_section">
                <div className='namesection'>
                    <div className='nameline_left'></div>
                    {isEditingUsername ? (
                        <h2>
                        <span>UserName : </span>
                        <input 
                            type='text'
                            value={newUsername}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                        />
                        <button className='cancelbut' onClick={handleCancelEditUsername}>✖</button>
                        <button className='confirmbut' onClick={handleSaveUsername}>✔</button>
                        </h2>
                    ) : (
                        <h2>
                        <span>Username : </span>{user?.username}
                        <button className='changebut' onClick={handleEditUsername}>Change</button>
                        </h2>
                    )}
                    <div className='nameline_right'></div>
                </div>
                <div className='nameline_high'></div>

            <div className='namesection'>
              <div className='nameline_left'></div>
              {isEditingEmail ? (
                <h2>
                  <span>Почта : </span>
                  <input 
                    type='text'
                    value={newEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                  <button className='cancelbut' onClick={handleCancelEditEmail}>✖</button>
                  <button className='confirmbut' onClick={handleSaveEmail}>✔</button>
                </h2>
              ) : (
                <h2>
                  <span>Почта : </span>{user?.email}
                  <button className='changebut' onClick={handleEditEmail}>Change</button>
                </h2>
              )}
              <div className='nameline_right'></div>
            </div>
            <div className='nameline_high'></div>
            
            <a href="/dashboard">Вернуться</a>
            </div>
        </div>
    )
}

export default SettingUser;