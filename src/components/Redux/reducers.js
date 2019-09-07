import { ADD_USER } from "./constants";
import produce from 'immer';

export const initialState = {name: ""};
const userDataReducer = (state = initialState, action) => 
  produce(state, draft => {
      switch(action.type) {
          case ADD_USER:
            draft.name = action.user;
      }
  });

export default userDataReducer;