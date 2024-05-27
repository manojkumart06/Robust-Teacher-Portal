import { ADD_DETAILS, EDIT_DETAILS, DELETE_DETAILS } from '../actions/studentActions';

const initialState = {
  students: []
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      return {
        ...state,
        students: [...state.students, action.payload]
      };

    case EDIT_DETAILS:
      return {
        ...state,
        students: state.students.map((student, index) =>
          index === action.payload.index ? { ...student, ...action.payload.details } : student
        )
      };

    case DELETE_DETAILS:
      state.students.splice(action.index,1);
      return {
        ...state,
        students : [...state.students]
        //students: state.students.filter((_, index) => index !== action.payload)
      };

    default:
      return state;
  }
};

export default studentReducer;
