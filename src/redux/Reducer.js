import {
  MAKE_REQ,
  OPEN_POPUP,
  REQ_ADD_SUCC,
  REQ_DELETE_SUCC,
  REQ_GETALL_FAIL,
  REQ_GETALL_SUCC,
  REQ_GETBYCODE_SUCC,
  REQ_UPDATE_SUCC,
} from "./ActionType";

export const initialstate = {
  isLoading: false,
  contactList: [],
  contactobj: [],
  errorMessage: "",
};

export const ContactReducer = (state = initialstate, action) => {
  switch (action.type) {
    case MAKE_REQ:
      return {
        ...state,
        isLoading: true,
      };

    case REQ_GETALL_SUCC:
      return {
        ...state,
        isLoading: false,
        contactList: action.payload,
      };

    case REQ_GETBYCODE_SUCC:
      return {
        ...state,
        contactobj: action.payload,
      };

    case REQ_GETALL_FAIL:
      return {
        ...state,
        isLoading: false,
        contactList: [],
        errorMessage: action.payload,
      };

    case OPEN_POPUP:
      return {
        ...state,
        contactobj: {},
      };

    case REQ_ADD_SUCC:
      const _inputdata = { ...action.payload };
      const _maxid = Math.max(...state.contactList.map((o) => o.id));
      _inputdata.id = _maxid + 1;
      return {
        ...state,
        contactList: [...state.contactList, _inputdata],
      };

    case REQ_UPDATE_SUCC:
      const _data = { ...action.payload };
      const _finaldata = state.contactList.map((item) => {
        return item.id === _data.id ? _data : item;
      });
      return {
        ...state,
        contactList: _finaldata,
      };

    case REQ_DELETE_SUCC:
      const _filterdata = state.contactList.filter((data) => {
        return data.id !== action.payload;
      });
      return {
        ...state,
        contactList: _filterdata,
      };

    default:
      return state;
  }
};
