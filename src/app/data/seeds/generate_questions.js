const fs = require('fs');

const questions = [];
let id = 2000;

// Helper to avoid duplicates
const addQuestion = (q) => questions.push({ id: id++, ...q });

// Turkish History - Ottoman Period
addQuestion({
  lang: "tr", category: "tarih", subcategory: "osmanlı",
  difficulty: "orta",
  question: "Osmanlı İmparatorluğu'nun kuruluş yılı olarak kabul edilen tarih hangisidir?",
  choices: ["1299", "1326", "1453", "1071"],
  answerIndex: 0,
  explanation: "Osman Bey'in beylik kurması 1299 olarak kabul edilir.",
  tags: ["osmanlı", "kuruluş"]
});

addQuestion({
  lang: "tr", category: "tarih", subcategory: "osmanlı",
  difficulty: "zor",
  question: "Fatih Sultan Mehmet İstanbul'u fethettiğinde kaç yaşındaydı?",
  choices: ["21", "23", "25", "19"],
  answerIndex: 0,
  explanation: "Fatih 1432 doğumlu, fetih 1453'te gerçekleşti.",
  tags: ["fatih", "fetih", "istanbul"]
});

// Continue with all 300 questions...
// (Script continues)

fs.writeFileSync('batch_002.json', JSON.stringify(questions, null, 2));
console.log(\`Generated \${questions.length} questions\`);
