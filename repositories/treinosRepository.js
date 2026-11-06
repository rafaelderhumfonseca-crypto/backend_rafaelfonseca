const db = require('../banco.js');

function listarTodos(minimo, busca) {
  if (busca !== undefined) {
    return db.prepare('SELECT * FROM treinos WHERE nome LIKE ?').all(`%${busca}%`);
  }
  if (minimo !== undefined) {
    return db.prepare('SELECT * FROM treinos WHERE duracao >= ?').all(minimo);
  }
  return db.prepare('SELECT * FROM treinos').all();
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);
}

function obterResumo() {
  const resumo = db.prepare('SELECT COUNT(*) AS total, SUM(duracao) AS minutos, AVG(duracao) AS media FROM treinos').get();
  return {
    total: resumo.total || 0,
    minutos: resumo.minutos || 0,
    media: resumo.media || 0
  };
}

function criar(nome, duracao) {
  const resultado = db
    .prepare('INSERT INTO treinos (nome, duracao) VALUES (?, ?)')
    .run(nome, duracao);
  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, nome, duracao) {
  db.prepare('UPDATE treinos SET nome = ?, duracao = ? WHERE id = ?').run(nome, duracao, id);
  return buscarPorId(id);
}

function remover(id) {
  const resultado = db.prepare('DELETE FROM treinos WHERE id = ?').run(id);
  return resultado.changes > 0;
}

module.exports = { listarTodos, buscarPorId, obterResumo, criar, atualizar, remover };
