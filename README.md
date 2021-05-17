Note Taking Application
Write APIs to create a note taking application.
- All notes are to be written to a JSON file.
- One should be able to add new notes to the file, modify already written notes, delete notes and get all notes.
- Should follow Rest API conventions.
- Should handle errors gracefully with appropriate response codes.

To run the application follow the given steps: -
1. Clone the repositary
2. Run the command 'npm install' in the terminal to load all the libraries needed to run the code
3. use 'node app.js' to run the code


How to use the application:
after performing above given steps to use this application follow the further required steps
1. Open any browser you have
2. Search for the URL: localhost:3001
* It will show all the operation support by the application

To use any of the given ooperation use URL as follows

1. To add note : localhost:3001/add?title=Anuj Kapoor&body=Software Engineering Intern at SpringWorks
2. To remove note : localhost:3001/remove?title=Anuj Kapoor
3. To list note : localhost:3001/list
4. To read note : localhost:3001/read?title=Anuj Kapoor
5. To modify note : localhost:3001/modify?title=Anuj Kapoor&body=Student at Chandigarh University
