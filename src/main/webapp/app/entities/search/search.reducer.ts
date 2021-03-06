import axios from 'axios';
import { ICrudGetAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IItem, defaultValue } from 'app/shared/model/item.model';
import { cleanEntity } from 'app/shared/util/entity-utils';

export const ACTION_TYPES = {
  FETCH_ITEM_LIST: 'search/FETCH_ITEM_LIST',
  FETCH_ITEM: 'search/FETCH_ITEM',
  SET_BLOB: 'search/SET_BLOB',
  RESET: 'search/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0
};

export type SearchState = Readonly<typeof initialState>;

// Reducer

export default (state: SearchState = initialState, action): SearchState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ITEM_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FETCH_ITEM):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ITEM):
    case SUCCESS(ACTION_TYPES.FETCH_ITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/search';
// Actions

export const getEntities = (search, page, size, sort, checkedBooks, checkedGames, checkedMovies) => {
  if (checkedBooks === '' && checkedGames === '' && checkedMovies === '') {
    checkedBooks = 'Books';
    checkedGames = 'Games';
    checkedMovies = 'Movies';
  }
  const requestUrl = `${apiUrl}${
    sort
      ? `?page=${page}&size=${size}&sort=${sort}&search=${search
          .toLowerCase()
          .replace('#', '%23')}&category1=${checkedBooks}&category2=${checkedGames}&category3=${checkedMovies}`
      : `?search=${search.toLowerCase().replace('#', '%23')}&category1=${checkedBooks}&category2=${checkedGames}&category3=${checkedMovies}`
  }`;
  return {
    type: ACTION_TYPES.FETCH_ITEM_LIST,
    payload: axios.get<IItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getLikedEntities = (search, page, size, sort, checkedBooks, checkedGames, checkedMovies) => {
  if (checkedBooks === '' && checkedGames === '' && checkedMovies === '') {
    checkedBooks = 'Books';
    checkedGames = 'Games';
    checkedMovies = 'Movies';
  }
  const requestUrl = `${apiUrl}/interested${
    sort
      ? `?page=${page}&size=${size}&sort=${sort}&search=${search
          .toLowerCase()
          .replace('#', '%23')}&category1=${checkedBooks}&category2=${checkedGames}&category3=${checkedMovies}`
      : `?search=${search.toLowerCase().replace('#', '%23')}&category1=${checkedBooks}&category2=${checkedGames}&category3=${checkedMovies}`
  }`;
  return {
    type: ACTION_TYPES.FETCH_ITEM_LIST,
    payload: axios.get<IItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ITEM,
    payload: axios.get<IItem>(requestUrl)
  };
};

export const addNewInterest = item => {
  const requestUrl = `${apiUrl}`;
  return {
    type: ACTION_TYPES.FETCH_ITEM,
    payload: axios.put(requestUrl, cleanEntity(item))
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
