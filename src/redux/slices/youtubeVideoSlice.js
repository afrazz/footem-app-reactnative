import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import youtubeVideoService from '../../service/YoutubeVideo'

export const fetchYoutubeVideos = createAsyncThunk(
  'youtubeVideo/fetchAllYoutubeVideos',
  async ({ data, setHasLoadedAll }) => {
    const { params, method } = data

    // alert(method)
    const response = await youtubeVideoService.getYoutubeVideos(params)

    if (setHasLoadedAll) {
      if (response.length === 0) {
        setHasLoadedAll(true)
      } else {
        setHasLoadedAll(false)
      }
    }

    return { response, method }
  }
)

const initialState = {
  youtubeVideos: [],
  youtubeVideosLoading: false,
}

export const youtubeSlice = createSlice({
  name: 'youtubeVideo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutubeVideos.pending, (state) => {
        state.youtubeVideosLoading = true
      })
      .addCase(fetchYoutubeVideos.fulfilled, (state, action) => {
        const { response, method } = action.payload
        if (response?.length > 0) {
          if (method === 'create') {
            state.youtubeVideos = response
          } else {
            // console.log(method, response, 'heyety')
            state.youtubeVideos = [...state.youtubeVideos, ...response]
          }
        }
        state.youtubeVideosLoading = false
      })
      .addCase(fetchYoutubeVideos.rejected, (state) => {
        state.youtubeVideosLoading = false
      })
  },
})

export default youtubeSlice.reducer
