import { SET_CURRENT_USER, 
          SET_MEME_PHOTOS, 
          ADD_MEME, 
          DELETE_MEME,
          SHOW_NEW_MEME_FORM,
          SET_MEMES } from './actions';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
  memePhotos: [],
  memes: []
};

export default function (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {...state, 
        isAuthenticated: !!(Object.keys(action.user).length),
        user: action.user
      };
    
    case SET_MEME_PHOTOS:
      return {...state, memePhotos: action.memePhotos}

    case SET_MEMES:
      return {...state, memes: action.memes}

    case SHOW_NEW_MEME_FORM:
      return {...state, selectedPhoto: action.photo}

    case ADD_MEME:
      return {...state, memes: [...state.memes, action.meme]}

    case DELETE_MEME:
      let remainingMemes = state.memes.filter(meme => meme._id !== action.id);
      return {...state, memes: remainingMemes}

    default: return state;
  }
}
