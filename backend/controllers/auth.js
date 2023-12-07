import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import jwb from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export const registration = async (req, res) => {
    try {
        const {username, password, email} = req.body

        const isUsernameUsed = await User.findOne({username})
        if (isUsernameUsed) {
            return res.json({message: 'Данный Username занят'})
        }

        const isEmailUsed = await User.findOne({email})
        if (isEmailUsed) {
            return res.json({message: 'Данный Email занят'})
        }

        const activationLink = uuidv4();
        const salt = bcrypt.genSaltSync(3);
        const hash = bcrypt.hashSync(password, salt);

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER, //
            to: email, // Получатель
            subject: 'Активация учетной записи',
            text: '',
            html: 
            `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href=http://localhost:3000/activate/${activationLink}>http://localhost:3000/activate/${activationLink}</a>
            </div>
            `
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log(error);
              return res.json({ message: "Произошла ошибка при отправке письма" });
            } else {
              // Сохраняем активационную ссылку в базе данных
              const newUser = new User({
                username,
                password: hash,
                email,
                activationLink,
              });
      
              const token = jwb.sign(
                {
                  id: newUser._id,
                  username: newUser.username,
                },
                process.env.JWB_SECRET,
                { expiresIn: "30d" }
              );
      
              await newUser.save();
              return res.json({
                newUser,
                token,
                message: "Письмо с активационной ссылкой отправлено успешно",
              });
            }
          });
        } catch (e) {
          res.json({ message: "Произошла ошибка" });
        }
};

export const login = async (req, res) => {
  try {
      const {email, password} = req.body
      const user = await User.findOne({email})
      if (!user) {
          return res.json({message: 'Данный пользователь не найден'})
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
          return res.json({message: 'Неверный пароль'})
      }

      const token = jwb.sign({
          id: user._id, username: user.username
      }, process.env.JWB_SECRET, {expiresIn: '30d'})

      res.json({
          token, user, message: 'Успешно вошли'
      })
  } catch (e) {
      res.json({message: 'Произошла ошибка'})
  }
}

export const getUser = async (req, res) => {
  try {
      const user = await User.findById(req.userId)
      if (!user) {
          return res.json({message: 'Данный пользователь не найден'})
      }

      const token = jwb.sign({
          id: user._id, username: user.username
      }, process.env.JWB_SECRET, {expiresIn: '30d'})

      res.json({user, token})
  } catch (e) {
      res.json({message: 'Нет доступа'})
  }
}

export const addEthWallet = async (req, res) => {
  try {
    const {wallet} = req.body

    const user = await User.findById(req.userId)
    if (!user) {
        return res.json({message: 'Данный пользователь не найден'})
    }

    user.ethWallets.push(wallet);
    await user.save();

    res.json({message: 'Кошелек успешно добавлен'})
  } catch (e) {
    res.json({message: 'Произошла ошибка при добавлении Wallet'})
  }
}

export const updateUserUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;

    const existingUserWithUsername = await User.findOne({ username: newUsername });
    if (existingUserWithUsername) {
      return res.json({ message: "Имя пользователя уже занято" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: "Пользователь не найден" });
    }

    user.username = newUsername;
    await user.save();

    res.json({ message: "Имя пользователя успешно обновлено" });
  } catch (error) {
    res.json({ message: "Произошла ошибка" });
  }
};

export const updateUserEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const existingUserWithEmail = await User.findOne({ email: newEmail });

    if (existingUserWithEmail) {
      return res.json({ message: "Email уже занят" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: "Пользователь не найден" });
    }

    user.email = newEmail;
    await user.save();

    res.json({ message: "Email успешно обновлен" });
  } catch (error) {
    res.json({ message: "Произошла ошибка" });
  }
};