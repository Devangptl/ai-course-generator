/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following Detail with field as Course Name, Description, Along with Chapter Name, about , Duration: Category : \"Programming\", Topic : Python, Level:Basic , Duration : 1 hours, No of Chapter : 5 , in JSON Format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course_name\": \"Python Programming Fundamentals\",\n  \"description\": \"This course provides a comprehensive introduction to Python programming, covering fundamental concepts and practical applications. It's perfect for beginners with no prior programming experience.\",\n  \"chapters\": [\n    {\n      \"chapter_name\": \"Introduction to Python\",\n      \"about\": \"This chapter introduces the basics of Python programming, including its history, syntax, data types, variables, and operators.\",\n      \"duration\": 15\n    },\n    {\n      \"chapter_name\": \"Control Flow and Functions\",\n      \"about\": \"This chapter covers essential control flow structures like conditional statements, loops, and functions, allowing you to write more complex programs.\",\n      \"duration\": 20\n    },\n    {\n      \"chapter_name\": \"Data Structures\",\n      \"about\": \"This chapter introduces various data structures used in Python, including lists, tuples, dictionaries, and sets, along with their manipulation methods.\",\n      \"duration\": 25\n    },\n    {\n      \"chapter_name\": \"Modules and Libraries\",\n      \"about\": \"This chapter explores the concept of modules and libraries, showcasing how to leverage pre-written code to extend your Python programs.\",\n      \"duration\": 10\n    },\n    {\n      \"chapter_name\": \"Introduction to Object-Oriented Programming\",\n      \"about\": \"This chapter provides an overview of object-oriented programming (OOP) concepts in Python, including classes, objects, and inheritance.\",\n      \"duration\": 10\n    }\n  ],\n  \"duration\": 60,\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\"\n}\n```\n"},
          ],
        },
      ],
    });
  

    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic:python , Chapter:introduction of python, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in code format) if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Introduction to Python\",\n    \"explanation\": \"Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability and simplicity. Python is dynamically typed, meaning you don't need to explicitly declare variable types. It supports multiple programming paradigms, including object-oriented, imperative, functional, and procedural programming.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Why Choose Python?\",\n    \"explanation\": \"Python has gained immense popularity due to several advantages:\\n\\n* **Readability:** Python's syntax is clean and straightforward, making it easy to learn and understand.\\n* **Versatility:** Python is widely used in web development, data science, machine learning, scripting, and more.\\n* **Large Community and Libraries:** Python has a vast and active community, providing extensive libraries and frameworks for various tasks.\\n* **Beginner-Friendly:** Its simple syntax and extensive resources make it ideal for beginners in programming.\\n* **Open-Source:** Python is open-source, meaning it's free to use, distribute, and modify.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Setting Up Python\",\n    \"explanation\": \"To get started with Python, you need to install the Python interpreter on your system. You can download the latest version from the official Python website (https://www.python.org/downloads/). Follow the installation instructions for your operating system.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Running Python Code\",\n    \"explanation\": \"You can execute Python code in several ways:\\n\\n* **Interactive Interpreter:** This is a REPL (Read-Eval-Print Loop) that allows you to type and execute Python commands one at a time.\\n* **Script Files:** You can write Python code in text files with the .py extension and execute them from the command line.\\n* **Integrated Development Environments (IDEs):** IDEs like PyCharm, VS Code, and IDLE provide features like code completion, debugging, and syntax highlighting.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Basic Syntax\",\n    \"explanation\": \"Let's explore some fundamental Python syntax:\\n\\n* **Comments:** Comments are used to explain your code. They are ignored by the interpreter.\\n\\n<precode> # This is a single-line comment\\n\\\"\\\"\\\" This is a multi-line comment\\nSpanning multiple lines \\\"\\\"\\\"</precode>\\n\\n* **Variables:** Variables store data. Python is dynamically typed, so you don't need to explicitly declare their type.\\n\\n<precode> name = \\\"Alice\\\"\\n age = 30</precode>\\n\\n* **Data Types:** Python supports various data types, including:\\n\\n   * **Integers:**  `10, 25, -5`\\n   * **Floating-Point Numbers:** `3.14, 2.718`\\n   * **Strings:** `\\\"Hello World!\\\", 'Python' `\\n   * **Booleans:** `True, False`\\n\\n* **Operators:** Python provides various operators for performing calculations and comparisons.\\n\\n   * **Arithmetic Operators:** `+, -, *, /, //, %`\\n   * **Comparison Operators:** `==, !=, >, <, >=, <=`\\n   * **Logical Operators:** `and, or, not`\\n\\n* **Control Flow Statements:** These statements control the execution flow of your program.\\n\\n   * **if-else Statements:** Execute different code blocks based on conditions.\\n   * **for Loops:** Iterate over a sequence of items.\\n   * **while Loops:** Repeat a block of code as long as a condition is True.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Functions\",\n    \"explanation\": \"Functions are reusable blocks of code that perform specific tasks. They help in organizing code and promoting reusability.\\n\\n<precode> def greet(name):\\n  \\\"\\\"\\\"Greets the user with their name.\\\"\\\"\\\"\\n  print(f\\\"Hello, {name}!\\\")\\n\\ngreet(\\\"Bob\\\")  # Output: Hello, Bob!</precode>\\n\\n* **Defining Functions:** Use the `def` keyword to define functions.\\n* **Parameters:** Functions can take input values called parameters.\\n* **Return Values:** Functions can return a value using the `return` statement.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Data Structures\",\n    \"explanation\": \"Python offers various data structures for organizing data:\\n\\n* **Lists:** Ordered, mutable sequences of items.\\n\\n<precode> my_list = [1, 2, 3, \\\"apple\\\", \\\"banana\\\"]</precode>\\n\\n* **Tuples:** Ordered, immutable sequences of items.\\n\\n<precode> my_tuple = (1, 2, 3, \\\"apple\\\", \\\"banana\\\")</precode>\\n\\n* **Dictionaries:** Key-value pairs that allow efficient data retrieval based on keys.\\n\\n<precode> my_dict = { \\\"name\\\": \\\"Alice\\\", \\\"age\\\": 30, \\\"city\\\": \\\"New York\\\" }</precode>\\n\\n* **Sets:** Unordered collections of unique items.\\n\\n<precode> my_set = {1, 2, 3, 4, 5}</precode>\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Modules and Libraries\",\n    \"explanation\": \"Modules and libraries provide reusable code for various tasks. You can import modules to extend the functionality of your Python programs.\\n\\n<precode> import math\\n\\nprint(math.sqrt(25))  # Output: 5.0</precode>\\n\\n* **Importing Modules:** Use the `import` statement to import modules.\\n* **Using Functions and Classes:** Access functions and classes within imported modules using the dot notation.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Object-Oriented Programming (OOP)\",\n    \"explanation\": \"Python supports object-oriented programming (OOP), which allows you to model real-world concepts as objects. OOP principles include:\\n\\n* **Classes:** Blueprints for creating objects.\\n* **Objects:** Instances of classes.\\n* **Attributes:** Data associated with an object.\\n* **Methods:** Functions associated with an object.\",\n    \"code\": \"\"\n  }\n]\n```"},
          ],
        },
      ],
    });
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
 
 