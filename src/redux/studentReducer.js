import { ADD_DETAILS, EDIT_DETAILS, DELETE_DETAILS } from './studentAction';

// Initial state with a some of predefined list of students
const initialState = {
  students: [
    { name: "Sean Abot", subject: "Maths", marks: 77 },
    { name: "Shawn Tate", subject: "English", marks: 72 },
    { name: "Shivam", subject: "Physics", marks: 78 },
    { name: "Mitchelle", subject: "Maths", marks: 78 },
    { name: "Shiv Yadav", subject: "Chemistry", marks: 80 },
    { name: "Shiv Yadav", subject: "Hindi", marks: 76 },
    { name: "Shiv Yadav", subject: "Physics", marks: 77 },
    
  ]
};

// Reducer function to manage student state
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DETAILS: {
      const { name, subject, marks } = action.payload;
      
      // Trim whitespace from name and subject for accurate comparison
      const trimmedName = name.trim();
      const trimmedSubject = subject.trim();
        
      const existingStudentIndex = state.students.findIndex(
            student => student.name.trim() === trimmedName && student.subject.trim() === trimmedSubject
      );

   
     //If a matching record is found, updating the marks for that student by adding the new marks to the existing ones.
      if (existingStudentIndex !== -1) {
        
        const updatedStudents = state.students.map((student, index) =>
          index === existingStudentIndex
            ? { ...student, marks:marks }
            : student
        );
        return {
          ...state,
          students: updatedStudents
        };
      } else {
        return {
          ...state,
          students: [...state.students, action.payload]
        };
      }
    }

    case EDIT_DETAILS:
      // Updates the details of an existing student
      const updatedStudents = state.students.map((student, index) => {
        if (index === action.payload.index) {
          //console.log("Updating student:", student);
          //console.log("With details:", action.payload.details);
        }
        return index === action.payload.index ? { ...student, ...action.payload.details } : student;
      });
      //console.log("Updated students array:", updatedStudents);
      return {
        ...state,
        students: updatedStudents
      };

    case DELETE_DETAILS:
      // Removes a student from the students array
      return {
        ...state,
        students: state.students.filter((_, index) => index !== action.payload)
      };

    default:
      // Returns the current state if no action matches
      return state;
  }
};

export default studentReducer;
