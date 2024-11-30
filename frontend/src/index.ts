import express, { Request, Response } from "express";
import mysql from "mysql2/promise";
import path from 'path';
import ejs from 'ejs';
import session from 'express-session';

const app = express();
const axios = require('axios');


app.use(express.static('frontend'));


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));

declare module 'express-session' {
    interface SessionData {
      user?: { id: number; name: string; email: string; papel?: string };
    }
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'segredo', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.get('/singin', (req: Request, res: Response) => {
    res.render('singin');
})

app.post('/singin', (req, res) => {
   const { name, email, senha } = req.body;

    try {
    const response = axios.post('http://localhost:3001/users', 
    {
        name: name,
        email: email,
        password: senha,
        role: 'ADMIN'
    })
    }catch (error) {
        res.json(error)
    }
    res.redirect('/login')
  });

app.get('/login', (req: Request, res: Response) => {
    res.render('login');
})

app.post('/login', (req: Request, res: Response) => {
    
})


app.listen('3000', () => console.log("Server is listening on port 3000"));
