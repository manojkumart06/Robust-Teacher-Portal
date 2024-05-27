import { ADD_DETAILS, EDIT_DETAILS, DELETE_DETAILS } from './studentAction';

const initialState = {
    students: [
      { name: 'John Doe', subject: 'Math', marks: 85 },
      { name: 'Jane Smith', subject: 'Science', marks: 92 },
      { name: 'Alice Johnson', subject: 'History', marks: 78 }
    ]
  };
  

const studentReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case ADD_DETAILS:
      return {
        ...state,
        students: [...state.students, action.payload]
      };

      case EDIT_DETAILS:
        const updatedStudents = state.students.map((student, index) => {
          if (index === action.payload.index) {
            console.log("Updating student:", student);
            console.log("With details:", action.payload.details);
          }
          return index === action.payload.index ? { ...student, ...action.payload.details } : student;
        });
        console.log("Updated students array:", updatedStudents);
        return {
          ...state,
          students: updatedStudents
        };

    case DELETE_DETAILS:
      return {
        ...state,
        students: state.students.filter((_, index) => index !== action.payload)
      };

    default:
      return state;
  }
};

export default studentReducer;
