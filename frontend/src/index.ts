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

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar123",
    database: "unicesumar"
});

// Middleware para permitir dados no formato JSON
app.use(express.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async function (req: Request, res: Response) {
    return res.render("posts");
});

// Definir a função formatDate
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formatar no padrão brasileiro (dd/mm/yyyy)
}

// Middleware de sessão (deve ser antes das rotas que acessam a sessão)
app.use(session({
    secret: 'segredo', // Substitua por uma chave secreta
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Em produção, use 'true' com HTTPS
}));

app.get('/users', async function (req: Request, res: Response) {
    const [rows]: any = await connection.query("SELECT * FROM users");

    // Formatar as datas antes de enviar para a view
    const users = rows.map((user: any) => {
        user.data_cadastro = formatDate(user.data_cadastro);
        return user;
    });

    return res.render('register/index', {
        users: users // Alterado para 'users' para refletir os dados formatados
    });
});

// Rota para exibir o formulário de cadastro de usuário
app.get('/users/register', (req: Request, res: Response) => {
    const { id, name, email, senha } = req.query;

    res.render('register/users', {
        id_usuario: id || '',
        name: name || '',
        email: email || '',
        senha: senha || ''
    }); 

});

// Função para registrar usuário
app.post('/users/save', async function (req: Request, res: Response) {
    const { name, email, senha, confirma_senha } = req.body;

     // Log para verificação
     console.log(req.body); // Para verificar os dados recebidos

    // Verifica se as senhas coincidem
    if (senha !== confirma_senha) {
        return res.status(400).send("As senhas não coincidem");
    }

    try {        
        // Inserindo no banco de dados
        const insertQuery = "INSERT INTO users (name, email, senha) VALUES (?, ?, ?)";
        await connection.query(insertQuery, [name, email, senha ]);

        res.redirect('/users'); // Redireciona para a lista de usuários após o cadastro
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao registrar usuário");
    }

});

app.get('/login', (req: Request, res: Response) => {
    res.render('login');
});

app.get('/dashboard', async function (req: Request, res: Response) {

    // const user = {
    //     name: 'Usuário Teste',
    //     email: 'teste@exemplo.com'
    // };

    console.log(req.session); // Adicione um log para verificar o conteúdo da sessão
    const usuario = req.session.user; // Pegue o usuário logado da sessão (se estiver usando sessão)

    if (!usuario) {
        return res.redirect('/login'); // Se não estiver logado, redireciona para login
    }

    const tasks = {
        toDo: [{ name: 'Tarefa 1' }, { name: 'Tarefa 2' }],
        inProgress: [{ name: 'Tarefa 3' }],
        done: [{ name: 'Tarefa 4' }]
    };

    res.render('dashboard', { user: usuario, tasks: tasks  });

});

// Rota para login
app.post('/users/login', async function (req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
        // Buscando o usuário pelo email
        const [rows]: any = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        const usuario = rows[0];

        if (!usuario) {
            return res.render('Login', { message: 'Usuário não encontrado' });
        }

        // Comparando a senha
        if (senha === usuario.senha) {
            // Senha está correta
            req.session.user = usuario;
            res.redirect('/dashboard');
        } else {
            // Senha está incorreta
            res.status(401).render('Login', { message: 'Senha incorreta' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).render('error', { message: 'Erro ao verificar a senha' });
    }
});

app.post('/users/delete/:id_usuario', async function (req: Request, res: Response) {
    const id_usuario = req.params.id_usuario;

    await connection.query("DELETE FROM users WHERE id_usuario = ?", [id_usuario]);

    // Verificar se não há mais usuários
    const [rows]: any = await connection.query("SELECT * FROM users");

    // Se não houver mais usuários, redefine o auto incremento
    if (rows.length === 0) {
        await connection.query("ALTER TABLE users AUTO_INCREMENT = 1");
    }

    res.redirect("/users"); // Redireciona para a lista de usuários
    
});

// Rota -> Perfil de usuário
app.get('/profile', async (req: Request, res: Response) => {
    const usuario = req.session.user;

    if (!usuario) {
        return res.redirect('/login'); // Redirecionar para login se não estiver logado
    }

    // Dados de exemplo
    const user = {
        name: usuario.name,
        email: usuario.email,
        papel: usuario.papel || 'Usuário',
        times: [
            { nome: 'Time A' },
            { nome: 'Time B' },
            { nome: 'Time C' }
        ],
        tarefas: []
    };

    const tasks = {
        toDo: [{ name: 'Planejar a semana' }],
        inProgress: [{ name: 'Implementar funcionalidade X' }],
        done: [{ name: 'Concluir relatório' }]
    };

    res.render('profile', { user, tasks });
});

app.get('/test-profile', (req: Request, res: Response) => {
    const user = {
        name: 'Teste',
        email: 'teste@exemplo.com',
        papel: 'Administrador',
        times: [{ nome: 'Time A' }, { nome: 'Time B' }]
    };

    const tasks = {
        toDo: [{ name: 'Tarefa 1' }],
        inProgress: [{ name: 'Tarefa 2' }],
        done: [{ name: 'Tarefa 3' }]
    };

    res.render('profile', { user, tasks });
});


app.listen('3000', () => console.log("Server is listening on port 3000"));
