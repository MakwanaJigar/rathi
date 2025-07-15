import { combineReducers } from 'redux';
import warehouseReducer from '../redux/reducers/warehouseReducer';
import clientReducer from '../redux/reducers/clientReducer';
import representativeReducer from '../redux/reducers/representativeReducer';
import itemReducer from '../redux/reducers/itemReducer';
import makeReducer from '../redux/reducers/makeReducer';
import userReducer from '../redux/reducers/userReducer';

const rootReducer = combineReducers({
  warehouse: warehouseReducer,
  client: clientReducer,
  salesRep: representativeReducer,
  item: itemReducer,
  make: makeReducer,
  user: userReducer,
});

export default rootReducer;
