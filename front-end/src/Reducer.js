import axios from "./Axios.js";
export const initialState = {
  user: null,
  channels: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANNELS": {
      var channels = action.channels;
      return {
        ...state,
        channels: channels,
      };
    }

    case "USER": {
      var user = action.user;
      return {
        ...state,
        user: user,
      };
    }
    default:
      return state;
  }
};
