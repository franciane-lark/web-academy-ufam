module.exports = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Acesso negado. Usuário não autenticado.' });
  }

  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso proibido. Requer privilégios de Administrador.' });
  }

  next(); // É admin, pode prosseguir
};