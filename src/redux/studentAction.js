// Action Types
export const ADD_DETAILS = "ADD_DETAILS";
export const EDIT_DETAILS = "EDIT_DETAILS";
export const DELETE_DETAILS = "DELETE_DETAILS";



// Action Creators
export const addDetails = (details) => ({
    type: ADD_DETAILS,
    payload: details
  });
  
  export const editDetails = (details) => ({
    type: EDIT_DETAILS,
    payload: details
  });
  
  export const deleteDetails = (index) => ({
    type: DELETE_DETAILS,
    payload: index
  });
  