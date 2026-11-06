const service = require('./services/treinosService.js');

console.log('--- Listagem ---');
console.log(service.listarTodos());

console.log('\n--- Treino Válido ---');
console.log(service.criarTreino({ nome: 'Teste sem servidor', duracao: 15 }));

console.log('\n--- Treino Sem Nome (Erro) ---');
console.log(service.criarTreino({ nome: '', duracao: 15 }));

console.log('\n--- Treino Maior que 180 min (Exercício 14) ---');
console.log(service.criarTreino({ nome: 'Maratona', duracao: 200 }));
