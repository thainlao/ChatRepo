import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWB_SECRET)
            req.userId = decoded.id;
            req.username = decoded.username;

            next()
        } catch (e) {
            return res.json({message: 'Нет доступа'})
        }
    } else {
        return res.json({message: 'Нет доступа'})
    }
}