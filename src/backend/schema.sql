create table if not exists responses(
  answerId TEXT, 
  questionId TEXT, 
  time TEXT,
);

create table if not exists questions(
  id TEXT, 
  title TEXT,
  description TEXT
);

create table if not exists answers(
  id TEXT, 
  label TEXT,
  isCorrect BOOLEAN
);