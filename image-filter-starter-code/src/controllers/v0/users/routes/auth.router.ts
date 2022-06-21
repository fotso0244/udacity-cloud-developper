import { Router, Request, Response } from 'express';

//import {User} from '../models/User';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';

import * as EmailValidator from 'email-validator';
import { config } from '../../../../config/config';

const router: Router = Router();
class User  {
  
    public email: string;
    public password_hash: string; // for nullable fields
  
    constructor(email: string, password_hash: string){
      this.email = email;  
    this.password_hash = password_hash; 
    }
  
  }

async function generatePassword(plainTextPassword: string): Promise<string> {
    //@TODO Use Bcrypt to Generated Salted Hashed Passwords
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
}

async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    //@TODO Use Bcrypt to Compare your password to your Salted Hashed Password
    const compare = await bcrypt.compare(plainTextPassword, hash);
    return compare;
}

function generateJWT(user: User): string {
    //@TODO Use jwt to create a new JWT Payload containing
    return jwt.sign(JSON.stringify(user), config.jwt.secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    //console.warn("auth.router not yet implemented, you'll cover this in lesson 5")
     if (!req.headers || !req.headers.authorization){
         return res.status(401).send({ message: 'No authorization headers.' });
     }
    

     const token_bearer = req.headers.authorization.split(' ');
     if(token_bearer.length != 2){
         return res.status(401).send({ message: 'Malformed token.' });
     }
    
     const token = token_bearer[1];

     return jwt.verify(token, config.jwt.secret, (err, decoded) => {
       if (err) {
         return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
       }
       return next();
     });
}

router.get('/verification', 
    requireAuth, 
    async (req: Request, res: Response) => {
        return res.status(200).send({ auth: true, message: 'Authenticated.' });
});

//get a jwt token
router.get('/', async (req: Request, res: Response) => {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!plainTextPassword) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }


    const password_hash = await generatePassword(plainTextPassword);

    const newUser = new User(email, password_hash);



    // Generate JWT
    const jwt = generateJWT(newUser);

    res.status(201).send({token: jwt, user: newUser});
});

export const AuthRouter: Router = router;
