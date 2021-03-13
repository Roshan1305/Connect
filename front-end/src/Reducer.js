import axios from "./Axios.js";
export const initialState = {
  user: null,
  channels: [],
  clickedChannel: null,
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
    case "LEFT_CHANNEL": {
      var channel = action.channelId;
      console.log(channel);
      return {
        ...state,
        clickedChannel: channel,
      };
    }

    default:
      return state;
  }
};
