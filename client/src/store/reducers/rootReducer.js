import {combineReducers} from 'redux';
import viewReducer from './viewReducer';
import globalStatsReducer from './globalStatsReducer';
import countryStatsReducer from './countryStatsReducer'
import countriesStatsReducer from './countriesStatsReducer';

const rootReducer = combineReducers({
    view: viewReducer,
    globalStats: globalStatsReducer,
    countryStats: countryStatsReducer,
    countriesStats: countriesStatsReducer
});

export default rootReducer;