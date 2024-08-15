db = db.getSiblingDB("kbc");
db.questions.insertMany([
  {
    question: "Who is india's prime minister?",
    options: ["Rahul gandhi", "Jay", "narendra modi", "mamta benarji"],
    answer: "narendra modi",
  },
  {
    question:
      "The process of understanding and specifying in detail what the information system should accomplish is called systems ____",
    options: ["Design", "Specification", "Analysis", "Administration"],
    answer: "Analysis",
  },
  {
    question:
      "Systems ____ means specifying in detail how the many components of the information system should be physically implemented",
    options: ["Design", "Specification", "Analysis", "Administration"],
    answer: "Design",
  },
  {
    question: "what is india's national language?",
    options: ["hindi", "english", "gujarati", "punjabi"],
    answer: "hindi",
  },
  {
    question:
      "The most important role of a systems analyst in business is ____",
    options: [
      "Technical understanding of information systems",
      "Problem-solving",
      "Knowing what data needs to be stored and used",
      "Special programming skills",
    ],
    answer: "Problem-solving",
  },
  {
    question: "Which of the following is the capital of gujarat?",
    options: ["ahmedabad", "gandhi nagar", "rajkot", "bhavnagar"],
    answer: "gandhi nagar",
  },
  {
    question: "Which is the largest coffee-producing state of India?",
    options: ["Gujarat", "Kerala", "Karnataka", "Arunachal Pradesh"],
    answer: "Karnataka",
  },
  {
    question: "How many days are there in a week?",
    options: ["3", "10", "6", "7"],
    answer: "7",
  },
  {
    question: "A data flow can",
    options: [
      "Only emanate from an external entity",
      "Only terminate in an external entity",
      "May emanate and terminate in an external entity",
      "May either emanate or terminate in an external entity but not both",
    ],
    answer: "May emanate and terminate in an external entity",
  },
  {
    question: "How many hours are there in a day?",
    options: ["30", "24", "26", "27"],
    answer: "24",
  },
  {
    question: "How many days are there in a year?",
    options: ["340", "444", "260", "365"],
    answer: "365",
  },
  {
    question: "SDLC stands for",
    options: [
      "System Development Life Cycle",
      "Structure Design Life Cycle",
      "System Design Life Cycle",
      "Structure development Life Cycle",
    ],
    answer: "System Development Life Cycle",
  },
  {
    question: "Name the National animal of India?",
    options: ["Tiger", "Lion", "Cat", "Dog"],
    answer: "Tiger",
  },
  {
    question: "Data cannot flow between two data stores because",
    options: [
      "it is not allowed in DFD",
      "a data store is a passive repository of data",
      "data can get corrupted",
      "they will get merged",
    ],
    answer: "they will get merged",
  },
  {
    question: "What is the National Anthem of India?",
    options: [
      "Jana Gana Mana",
      "Vande Matram",
      "Sare jaha se achha",
      "None of above",
    ],
    answer: "Jana Gana Mana",
  },
  {
    question: "A decision table facilitates conditions to be related to",
    options: ["Actions", "Programs", "Tables", "Operation"],
    answer: "Actions",
  },
  {
    question: "Name the National fruit of India?",
    options: ["Apple", "Mango", "Banana", "Orange"],
    answer: "Mango",
  },
  {
    question: "Select the letter a",
    options: ["a", "b", "c", "d"],
    answer: "a",
  },
  {
    question: "Select programming language",
    options: ["English", "JavaScript", "French", "Google"],
    answer: "JavaScript",
  },
  {
    question: "Who is the father of C language?",
    options: [
      "Steve Jobs",
      "James Gosling",
      "Dennis Ritchie",
      "Rasmus Lerdorf",
    ],
    answer: "Dennis Ritchie",
  },
  {
    question:
      "Which keyword is used to prevent any changes in the variable within a C program?",
    options: ["immutable", "mutable", "const", "volatile"],
    answer: "const",
  },
  {
    question: "C language is a successor to which language?",
    options: ["Basic", "Cobol", "B", "C++"],
    answer: "B",
  },
  {
    question: "What is an example of iteration in C?",
    options: ["for", "while", "do-while", "all of the mentioned"],
    answer: "all of the mentioned",
  },
  {
    question:
      'What will be the output of the following code snippet? "print(typeof(NaN));"',
    options: ["Object", "Number", "String", "Error"],
    answer: "Number",
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?",
    options: ["stringify()", "parse()", "convert()", "none"],
    answer: "stringify()",
  },
  {
    question: "Which of the following is not a Javascript framework?",
    options: ["Node", "React", "Nest", "MySql"],
    answer: "MySql",
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    options: ["var", "let", "A and B both", "Node of above"],
    answer: "A and B both",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    options: [
      "getElementById()",
      "GetElementsByClassName()",
      "A and B both",
      "Node of above",
    ],
    answer: "A and B both",
  },
  {
    question: "How do we write a comment in javascript?",
    options: [
      "``` commented ```",
      "/* commented */",
      "# ....",
      "$ commented $",
    ],
    answer: "/* commented */",
  },
]);
