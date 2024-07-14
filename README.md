# How to run the application
==========================
Open terminal 1
- command 1 -> npm install
- command 2 ->  npx json-server db.json

Open Terminal 2
- command 3 -> npm run dev

# Note: in env file, backend url is mentioned as -> VITE_BACKEND_BASE_URI = http://localhost:3000

- Generally json-server runs on 3000 . However its not guaranteed and if 3000 is busy then it will run in some other port as well
hence when second command "npx json-server db.json" is entered then in terminal it will display which port is used 
by json server. 
- If its other than 3000 then in env file the value of VITE_BACKEND_BASE_URI can be changed accordingly

# About application
=================
- Project created using Vite
- Typescript used
- Atomic Design Pattern
- "react-router-dom" is used 
- the category selected will persist as its value is stored in localStorage
- 2 custom hook created - one for storing/retrieving localStorage value and other for dataFetching