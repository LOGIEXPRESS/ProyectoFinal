import { Response, Request, Router, NextFunction } from 'express';
import { uuid } from 'uuidv4';
import passport from 'passport';
import { SingUp } from '../models/Signup';
// import { User } from '../models/User';
// import { Carrier } from '../models/Carrier';
import jwt from 'jsonwebtoken'
import config from "../../config/config"
const bcrypt = require("bcryptjs");

const router = Router()

router.get('/user', passport.authenticate("jwt", { session: false }), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await SingUp.findAll()
        console.log("AQUI", req.user)
        if (user.length > 0) {
            return res.send(user)
        }
        res.send('data not found')
    }
    catch (err) {
        next(err)
    }
});

router.post('/verifytoken', async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    try {
        const decoded: any = jwt.verify(token, config.jwtSecret)
        const dataUser = await SingUp.findByPk(decoded.id)
        if (dataUser) {

            const payload = {
                id: dataUser?.id,
                name: dataUser?.name,
                lastname: dataUser?.lastName,
                phone: dataUser?.phone,
                eMail: dataUser?.eMail,
                role: dataUser?.role,
                photo: dataUser?.photo,
                // idRole: dataUser.role,
                mensaje: true
            }

            console.log("PAYLOAD en verifytoken", payload);

            return res.json({ payload, mensaje: 'the access token is valid' })
        }
    }
    catch (err) {
        next(err)
    }
});


router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    // const data1 = JSON.parse(req.body)
    // console.log("Estes es el body", req.body);

    const { name, lastName, phone, password, eMail, terminosCondiciones, role, photo, identification} = req.body

    let passwordHash = await bcrypt.hash(password, 8)

    let payload = {
        id: uuid(),
        name,
        lastName,
        password: passwordHash,
        phone,
        photo,
        identification, 
        terminosCondiciones,
        eMail,
        role
    }
    try {
        const [user/*usuario creado o excistente */, created/*boolean true->lo creo false->no lo creo pq exciste */] = await SingUp.findOrCreate({//crea un usuario si no excisiste 
            where: { eMail: eMail },
            defaults: payload,
        })

        if (!created) {
            const payload = {
                role: 1,
            };
            return res.json({ payload, mensaje: 'eMail usado' })//podria ser un boolean 
        }
        return res.json({
            mensaje: 'Usuario creado', payload
        }).status(300);
    }
    catch (err) {
        next(err)
    }
});



export default router