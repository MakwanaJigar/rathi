// import { createStore, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import rootReducer from './rootReducer';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../redux/rootReducer';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
