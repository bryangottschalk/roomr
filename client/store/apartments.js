import axios from 'axios';
import { ngrok } from './';
/**
 * ACTION TYPES
 */

export const GET_APARTMENTS = 'GET_APARTMENTS';
export const GET_APARTMENT = 'GET_APARTMENT';
/**
 * ACTION CREATORS
 */

export const getApartments = apartments => ({
  type: GET_APARTMENTS,
  apartments
});

// NEW
export const getApartment = apartment => ({
  type: GET_APARTMENT,
  apartment
});

/**
 * THUNK CREATORS
 */

export const getApartmentsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${ngrok}/api/apartments`);
      console.log('TCL: getApartmentsThunk -> data', data);
      dispatch(getApartments(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getApartmentThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${ngrok}/api/${id}`);
      console.log('TCL: DATA HERE', data);
      dispatch(getApartment(id));
    } catch (error) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */

const apartmentsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_APARTMENTS:
      return action.apartments;
    case getApartment:
      return action.apartment;
    default:
      return state;
  }
};

export default apartmentsReducer;
