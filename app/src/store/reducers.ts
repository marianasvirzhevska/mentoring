import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import auth from './auth';

const reducer = combineReducers({
  form: formReducer,
  //auth,
});

export default reducer;
