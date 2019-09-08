import { ADD_INSTITUTE_ADMIN, ADD_SUPER_ADMIN } from "./constants";
import produce from 'immer';

export const initialState = {
  superAdminInstance: '',
  instituteInstance: ''
};
const userDataReducer = (state = initialState, action) => 
  produce(state, draft => {
      switch(action.type) {
        case ADD_SUPER_ADMIN:
            draft.superAdminInstance = action.instance;
            break;
        case ADD_INSTITUTE_ADMIN:
            draft.instituteInstance = action.instance;
            break;
        default: 
        break;
      }
  });

export default userDataReducer;