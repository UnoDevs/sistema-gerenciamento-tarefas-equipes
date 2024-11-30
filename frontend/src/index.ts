import express, { Request, Response } from "express";
import mysql from "mysql2/promise";
import path from 'path';
import ejs from 'ejs';
import session from 'express-session';

const app = express();

// Servir arquivos estáticos da pasta public
app.use(express.static('frontend'));

// Configura EJS como a engine de renderização de templates
app.set('view engine', 'ejs');
//app.set('views', path.join(`${__dirname}, src, views`));
app.set('views', path.join(__dirname, '/views'));

declare module 'express-session' {
    interface SessionData {
      user?: { id: number; name: string; email: string; papel?: string };
    }
}

// Middleware para permitir dados no formato JSON
app.use(express.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware de sessão (deve ser antes das rotas que acessam a sessão)
app.use(session({
    secret: 'segredo', // Substitua por uma chave secreta
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Em produção, use 'true' com HTTPS
}));

app.get('/singin', (req: Request, res: Response) => {
    
})




app.listen('3000', () => console.log("Server is listening on port 3000"));
