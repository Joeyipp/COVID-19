import {combineReducers} from 'redux';
import viewReducer from './viewReducer';
import globalStatsReducer from './globalStatsReducer';
import countryStatsReducer from './countryStatsReducer'
import countriesStatsReducer from './countriesStatsReducer';
import statesStatsReducer from './statesStatsReducer';
import stateStatsReducer from './stateStatsReducer';
import countyStatsReducer from './countyStatsReducer';
import countiesStatsReducer from './countiesStatsReducer';

const rootReducer = combineReducers({
    view: viewReducer,
    countyStats: countyStatsReducer,
    countiesStats: countiesStatsReducer,
    stateStats: stateStatsReducer,
    statesStats: statesStatsReducer,
    globalStats: globalStatsReducer,
    countryStats: countryStatsReducer,
    countriesStats: countriesStatsReducer
});

export default rootReducer;