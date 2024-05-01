import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import onBoardFollowService from '../../service/onBoardFollowService'
import footballApiteamService from '../../service/footballApi/teamService'

// Here we are check for "suggested" or "global" teams. for the search part if the search is above 3 characters we will trigger global teams api. if search character is zero we will trigger suggested API and save to the state
export const fetchsuggestedTeams = createAsyncThunk(
  'onBoardFollowSlice/fetchsuggestedAllTeams',
  async (data) => {
    const { params, type } = data
    if (type === 'suggested') {
      const response = await onBoardFollowService.getSuggestedTeam()
      return { response }
    } else {
      const response = await footballApiteamService.getTeams(params)
      return { response }
    }
  }
)

export const fetchLocalTeams = createAsyncThunk(
  'onBoardFollowSlice/fetchLocalTeams',
  async (data) => {
    const { params } = data
    const response = await footballApiteamService.getTeams(params)
    return { response }
    // const { params } = data
    // const response = await
    // return { response }
  }
)

export const fetchLeagues = createAsyncThunk(
  'onBoardFollowSlice/fetchLeagues',
  async (data) => {
    // const { params } = data
    const response = await onBoardFollowService.getLeagues()
    return { response }
  }
)

const initialState = {
  suggestedTeams: [],
  localTeams: [],
  leagues: [],
  globalTeams: [],
  suggestedTeamLoading: false,
  localTeamsLoading: false,
  leagueLoading: false,
}

export const onBoardFollowSlice = createSlice({
  name: 'onBoardFollow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Teams List Showcase
      .addCase(fetchsuggestedTeams.pending, (state) => {
        state.suggestedTeamLoading = true
      })
      .addCase(fetchsuggestedTeams.fulfilled, (state, action) => {
        const { response } = action.payload

        state.suggestedTeams = response

        state.suggestedTeamLoading = false
      })
      .addCase(fetchsuggestedTeams.rejected, (state) => {
        state.suggestedTeamLoading = false
      })
      //   Local Teams List Showcase
      .addCase(fetchLocalTeams.pending, (state) => {
        state.localTeamsLoading = true
      })
      .addCase(fetchLocalTeams.fulfilled, (state, action) => {
        const { response } = action.payload

        state.localTeams = response

        state.localTeamsLoading = false
      })
      .addCase(fetchLocalTeams.rejected, (state) => {
        state.localTeamsLoading = false
      })
      //   Leagues List Showcase
      .addCase(fetchLeagues.pending, (state) => {
        state.leagueLoading = true
      })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        const { response } = action.payload

        state.leagues = response

        state.leagueLoading = false
      })
      .addCase(fetchLeagues.rejected, (state) => {
        state.leagueLoading = false
      })
  },
})

export default onBoardFollowSlice.reducer
