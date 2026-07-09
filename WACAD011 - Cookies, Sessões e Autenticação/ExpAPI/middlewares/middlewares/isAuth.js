module.exports = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Acesso negado. Usuário não autenticado.' });
  }
  
  next(); 
};