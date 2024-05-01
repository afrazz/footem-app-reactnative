import { configureStore } from '@reduxjs/toolkit'
import youtubeVideoSlice from './slices/youtubeVideoSlice'
import authSliceReducer from './slices/authSlice'
import newsSlice from './slices/newsSlice'
import onBoardFollowSlice from './slices/onBoardFollowSlice'
import counterSlice from './slices/counterSlice'
import followSlice from './slices/followSlice'
import fixtureDetailsSlice from './slices/footballApi/fixtureDetailsSlice'
import fixtureSlice from './slices/footballApi/fixture'

const store = configureStore({
  reducer: {
    follow: followSlice,
    auth: authSliceReducer,
    news: newsSlice,
    youtubeVideo: youtubeVideoSlice,
    onBoardFollow: onBoardFollowSlice,
    counter: counterSlice,
    fixture: fixtureSlice,
    fixtureDetails: fixtureDetailsSlice,
  },
})

export default store
