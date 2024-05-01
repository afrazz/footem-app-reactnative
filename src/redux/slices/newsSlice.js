import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import newsService from '../../service/News'
import { NEWS_TYPE } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const fetchNews = createAsyncThunk(
  'news/fetchAllNews',
  async ({ data, setHasLoadedAll }) => {
    const { params, type, method } = data

    const response = await newsService.getNews(params)
    console.log(setHasLoadedAll, 'kwkwkw')

    if (setHasLoadedAll) {
      if (response.length === 0) {
        setHasLoadedAll(true)
      } else {
        setHasLoadedAll(false)
      }
    }

    return { response, type, method }
  }
)

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async (data, { getState }) => {
    // const { newsId, languageId } = data
    const { newsId, languageId } = data
    // TODO: TEST
    const userLanguageId = getState().auth.language

    const languageIdResult = languageId || userLanguageId || null

    if (languageIdResult) {
      const response = await newsService.getNewsById(newsId, languageIdResult)

      return { response }
    } else {
      const response = await newsService.getNewsById(newsId)

      return { response }
    }

    // const response = await newsService.getNewsById(newsId, languageId)
  }
)

const initialState = {
  allNews: [],
  todayNews: [],
  leagueNews: [],
  transferNews: [],
  teamNews: [],
  leaguePageNews: [],
  selectedNews: {},
  allNewsLoading: false,
  todayNewsLoading: false,
  transferNewsLoading: false,
  leagueNewsLoading: false,
  leaguePageNewsLoading: false,
  selectedNewsLoading: false,
  teamNewsLoading: false,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    resetNews: (state, action) => {
      state[action.payload] = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        // const { type } = action.payload

        const type = action.meta.arg.data.type

        if (type === NEWS_TYPE.all) {
          state.allNewsLoading = true
        } else if (type === NEWS_TYPE.today) {
          state.todayNewsLoading = true
        } else if (type === NEWS_TYPE.transfer) {
          state.transferNewsLoading = true
        } else if (type === NEWS_TYPE.leagues) {
          state.leagueNewsLoading = true
        } else if (type === NEWS_TYPE.team) {
          state.teamNewsLoading = true
        } else if (type === NEWS_TYPE.leaguePage) {
          state.leaguePageNewsLoading = true
        }

        // TODO: Need to add loading for every news state
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const { response, type, method } = action.payload

        if (type === NEWS_TYPE.all) {
          state.allNewsLoading = false
        } else if (type === NEWS_TYPE.today) {
          state.todayNewsLoading = false
        } else if (type === NEWS_TYPE.transfer) {
          state.transferNewsLoading = false
        } else if (type === NEWS_TYPE.leagues) {
          state.leagueNewsLoading = false
        } else if (type === NEWS_TYPE.team) {
          state.teamNewsLoading = false
        } else if (type === NEWS_TYPE.leaguePage) {
          state.leaguePageNewsLoading = false
        }

        // state.allNewsLoading = false
        // state.todayNewsLoading = false
        // state.transferNewsLoading = false
        // state.leagueNewsLoading = false
        if (NEWS_TYPE.all === type) {
          if (method === 'create') {
            state.allNews = response
          } else {
            state.allNews = [...state.allNews, ...response]
          }
        } else if (NEWS_TYPE.leagues === type) {
          const result = response.reduce((acc, obj) => {
            const league = obj.league
            const existingLeague = acc.find(
              (item) => item.league._id === league._id
            )

            if (existingLeague) {
              existingLeague.items.push({ ...obj })
            } else {
              acc.push({ league, items: [{ ...obj }] })
            }

            return acc
          }, [])

          state.leagueNews = result
          // state.leagueNews = response
        } else if (NEWS_TYPE.today === type) {
          if (method === 'create') {
            state.todayNews = response
          } else {
            state.todayNews = [...state.todayNews, ...response]
          }
        } else if (NEWS_TYPE.transfer === type) {
          if (method === 'create') {
            state.transferNews = response
          } else {
            state.transferNews = [...state.transferNews, ...response]
          }
          // state.transferNews = response
        } else if (NEWS_TYPE.team === type) {
          if (method === 'create') {
            state.teamNews = response
          } else {
            state.teamNews = [...state.teamNews, ...response]
          }
        } else if (NEWS_TYPE.leaguePage === type) {
          if (method === 'create') {
            state.leaguePageNews = response
          } else {
            state.leaguePageNews = [...state.leaguePageNews, ...response]
          }
        } else {
          state.allNews = response
        }
        // state.user = action.payload.user
      })
      .addCase(fetchNews.rejected, (state, action) => {
        alert(action.error.message)

        const type = action.meta.arg.type

        if (type === NEWS_TYPE.all) {
          state.allNewsLoading = false
        } else if (type === NEWS_TYPE.today) {
          state.todayNewsLoading = false
        } else if (type === NEWS_TYPE.transfer) {
          state.transferNewsLoading = false
        } else if (type === NEWS_TYPE.leagues) {
          state.leagueNewsLoading = false
        } else if (type === NEWS_TYPE.team) {
          state.teamNewsLoading = false
        } else if (type === NEWS_TYPE.leaguePage) {
          state.leaguePageNewsLoading = false
        }
      })

      // builder
      .addCase(fetchNewsById.pending, (state) => {
        state.selectedNewsLoading = true
        // TODO: Need to add loading for every news state
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        const { response } = action.payload
        state.selectedNewsLoading = false
        state.selectedNews = response
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.selectedNewsLoading = false
      })
  },
})

// // Action creators are generated for each case reducer function
export const { resetNews } = newsSlice.actions

export default newsSlice.reducer
