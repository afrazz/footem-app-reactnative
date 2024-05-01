import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import userService from '../../service/user'

const initialState = {
  followingTeams: [],
  followingLeagues: [],
  followingTeamsLoading: false,
  followingLeaguesLoading: false,
}

export const fetchFollowingTeams = createAsyncThunk(
  'following/fetchAllFollowingTeams',
  async () => {
    const response = await userService.getFollowingTeams()
    return response
  }
)

export const fetchFollowingLeagues = createAsyncThunk(
  'following/fetchAllFollowingLeagues',
  async () => {
    const response = await userService.getFollowingLeagues()
    return response
  }
)

export const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    setTeamsFollow: (state, action) => {
      console.log(action.payload, 'weeeee')
      state.followingTeams = action.payload
    },
    setPushTeamFollow: (state, action) => {
      console.log(state.followingTeams, action.payload, 'heheheh')
      state.followingTeams.push(action.payload)
    },
    setRemoveFollowTeam: (state, action) => {
      state.followingTeams = state.followingTeams.filter(
        (team) => team.followingId != action.payload
      )
    },

    setLeaguesFollow: (state, action) => {
      console.log(action.payload, 'weeeee')
      state.followingLeagues = action.payload
    },
    setPushLeagueFollow: (state, action) => {
      state.followingLeagues.push(action.payload)
    },
    setRemoveFollowLeague: (state, action) => {
      state.followingLeagues = state.followingLeagues.filter(
        (league) => league.followingId != action.payload
      )
    },
    resetFollowingState: (state, action) => {
      state.followingLeagues = []
      state.followingTeams = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowingTeams.pending, (state) => {
        state.followingTeamsLoading = true
      })
      .addCase(fetchFollowingTeams.fulfilled, (state, action) => {
        state.followingTeams = action.payload
        state.followingTeamsLoading = false
      })
      .addCase(fetchFollowingTeams.rejected, (state) => {
        state.followingTeamsLoading = false
      })

      // FollowingLeagues
      .addCase(fetchFollowingLeagues.pending, (state) => {
        state.followingLeaguesLoading = true
      })
      .addCase(fetchFollowingLeagues.fulfilled, (state, action) => {
        state.followingLeagues = action.payload

        state.followingLeaguesLoading = false
      })
      .addCase(fetchFollowingLeagues.rejected, (state) => {
        state.followingLeaguesLoading = false
      })
  },
})

export const {
  setTeamsFollow,
  setPushTeamFollow,
  setRemoveFollowTeam,
  setLeaguesFollow,
  setPushLeagueFollow,
  setRemoveFollowLeague,
  resetFollowingState,
} = followSlice.actions

// Team
export const addTeamFollow = (data) => async (dispatch) => {
  dispatch(setPushTeamFollow(data))
  await userService.addTeamFollow(data)
}

export const removeTeamFollow = (id) => async (dispatch) => {
  dispatch(setRemoveFollowTeam(id))
  await userService.removeTeamFollow(id)
}

// League
export const addLeagueFollow = (data) => async (dispatch) => {
  dispatch(setPushLeagueFollow(data))
  await userService.addLeagueFollow(data)
}

export const setGroupOfLeagueFollows = (data) => async (dispatch) => {
  const leaguesFollows = await userService.setLeagueFollows(data)

  if (leaguesFollows) {
    dispatch(setLeaguesFollow(data))
  }
}

export const removeLeagueFollow = (id) => async (dispatch) => {
  dispatch(setRemoveFollowLeague(id))
  await userService.removeLeagueFollow(id)
}

export default followSlice.reducer
