# Teacher Portal with React.js

This project aims to create a robust teacher portal using React.js, providing features such as a login screen, a home screen displaying student listings, and the ability to add new students. It utilizes modern UI frameworks like Material-UI for responsive design and efficient state management with Redux. Additionally, it implements extra features like code splitting, search functionality, and React lazy loading for improved performance.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this application locally, follow these steps:

1. Clone the repository:
  - git clone <https://github.com/manojkumart06/Robust-Teacher-Portal>

2. Navigate to the project directory:
  - cd teacherportal

3. Install dependencies:
  - npm install

4. Start the development server:
  - npm start

5. Open http://localhost:8000 to view it in the browser.(use respective port number)

6. Use following hardcoded username and password for login

    { username: 'user1', password: 'password1' }
    { username: 'user2', password: 'password2' }
    { username: 'user3', password: 'password3' }

## Usage
Upon running the application, you will encounter a login screen where you can input your username and password. After successful authentication, you'll be redirected to the home screen, which also serves as the student listing screen. From here, you can view a list of students along with their Name, Subject Name, and Marks. You can also add new students by clicking on the "Add Student" button, which opens a popup/modal for entering student details and also Edit/Delete actions also can be performed.

## Features
1. Login Screen:

    - Input fields for username and password.
    - Authentication using hard-coded username and password combinations.
    - Secure handling of user credentials and validation of login inputs.

2. Teacher Portal Home & Student Listing Screen:

    - Home screen serving as the landing page and student listing.
    - Display of student list with Name, Subject Name, and Marks.
    - Efficient state management using Redux.
    - Smooth rendering and performance optimization, including dealing with large datasets.

3. New Student Entry:

    - Feature for adding details of a new student using a popup/modal.
    - Form validation for data integrity.
    - Utilization of React hooks for managing form state.
    - Update marks for existing students if a matching record is found.

4. Extra Features:

    - Code splitting for optimized loading.
    - Search functionality for finding students.
    - React lazy loading for improved performance.

## Technologies Used

    - React.js
    - React Router
    - Redux
    - Material-UI
    - React Lazy Load

## Folder Structure
teacherportal/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── Login/
  │   │   ├── Home/
  │   │   ├── Error/
  │   │   ├── Modal/
  │   ├── redux/
  │   │   ├── actions/
  │   │   ├── reducers/
  │   │   ├── store/
  │   ├── App.js
  │   ├── index.js
  ├── package.json
  ├── README.md

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or additional features you'd like to see.

## License

This project is licensed under the [MIT License](LICENSE).
