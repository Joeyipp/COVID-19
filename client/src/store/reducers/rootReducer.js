import {combineReducers} from 'redux';
import viewReducer from './viewReducer';
import globalStatsReducer from './globalStatsReducer';
import countryStatsReducer from './countryStatsReducer'
import countriesStatsReducer from './countriesStatsReducer';
import statesStatsReducer from './statesStatsReducer';

const rootReducer = combineReducers({
    view: viewReducer,
    statesStats: statesStatsReducer,
    globalStats: globalStatsReducer,
    countryStats: countryStatsReducer,
    countriesStats: countriesStatsReducer
});

export default rootReducer;