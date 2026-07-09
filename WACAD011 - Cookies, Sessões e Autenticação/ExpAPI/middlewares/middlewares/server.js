require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/change-lang', (req, res) => {
  const { lang } = req.query;

  if (!lang) {
    return res.status(400).json({ error: 'O parâmetro lang é obrigatório.' });
  }

  res.cookie('lang', lang, {
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    httpOnly: false,
    path: '/'
  });

  return res.json({ message: `Idioma alterado para ${lang} com sucesso!` });
});

app.get('/welcome', (req, res) => {
  const lang = req.cookies.lang || 'pt-BR';

  const messages = {
    'pt-BR': 'Bem-vindo ao nosso sistema!',
    'en-US': 'Welcome to our system!'
  };

  return res.json({
    selectedLang: lang,
    message: messages[lang] || messages['pt-BR']
  });
});

app.post('/auth/login-user', (req, res) => {
  req.session.user = {
    id: "user-123",
    name: "Fulano Silva",
    role: "client" 
  };
  return res.json({ message: "Logado como Usuário Comum!", user: req.session.user });
});

app.post('/auth/login-admin', (req, res) => {
  req.session.user = {
    id: "admin-999",
    name: "Diretor da Loja",
    role: "admin" 
  };
  return res.json({ message: "Logado como Administrador!", user: req.session.user });
});

app.post('/auth/logout', (req, res) => {
  req.session.destroy();
  return res.json({ message: "Sessão encerrada com sucesso!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));