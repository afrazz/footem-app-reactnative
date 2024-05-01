import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fixtureService from '../../../service/footballApi/fixture'
import { singleFixtureDetails } from '../../../dummyDatas/fixture'

// TODO: Make Real Api Calls
export const fetchFixtureDetails = createAsyncThunk(
  'fixture/fetchFixtureDetails',
  async (params) => {
    const response = await fixtureService.getFixtures(params)
    return response[0]
  }
)

// TODO: Remove this singleFixtureDetails
const initialState = {
  fixtureDetails: {},
  isInitialFixtureDetailsLoading: true,
  fixtureDetailsLoading: true,
  // Fixture Screen Search Term
  fixtureSearchTerm: null,
}

export const fixtureDetailsSlice = createSlice({
  name: 'fixtureDetails',
  initialState,
  reducers: {
    // setIsInitialFixtureDetailsLoading: (state, action) => {
    //   state.isInitialFixtureDetailsLoading = action.payload
    // },
    setFixtureSearchTerm: (state, action) => {
      state.fixtureSearchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtureDetails.pending, (state) => {
        state.fixtureDetailsLoading = true
      })
      .addCase(fetchFixtureDetails.fulfilled, (state, action) => {
        state.fixtureDetails = action.payload

        // alert(JSON.stringify(action.payload))
        state.fixtureDetailsLoading = false
        state.isInitialFixtureDetailsLoading = false
      })
      .addCase(fetchFixtureDetails.rejected, (state) => {
        state.fixtureDetailsLoading = false
        state.isInitialFixtureDetailsLoading = false
      })
  },
})

export const { setFixtureSearchTerm } = fixtureDetailsSlice.actions

export default fixtureDetailsSlice.reducer
