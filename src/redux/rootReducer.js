import { combineReducers } from 'redux';
import warehouseReducer from '../redux/reducers/warehouseReducer';
import clientReducer from '../redux/reducers/clientReducer';
// import representativeReducer from '../redux/reducers/representativeReducer';
import itemReducer from '../redux/reducers/itemReducer';
import makeReducer from '../redux/reducers/makeReducer';
import userReducer from '../redux/reducers/userReducer';
import salesRepReducer from "../redux/reducers/representativeReducer";
import deliveryChallanReducer from "../redux/reducers/deliveryChallanReducer"

const rootReducer = combineReducers({
  // warehouse: warehouseReducer,
  warehouse: warehouseReducer,
  client: clientReducer,
  // salesRep: representativeReducer,
  salesRep: salesRepReducer,
  item: itemReducer,
  make: makeReducer,
  user: userReducer,
  deliveryChallan: deliveryChallanReducer, 
});

export default rootReducer;
