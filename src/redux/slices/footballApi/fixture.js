import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fixtureService from '../../../service/footballApi/fixture'
import { singleFixtureDetails } from '../../../dummyDatas/fixture'

// TODO: Make Real Api Calls
export const fetchFixture = createAsyncThunk(
  'fixture/fetchFixture',
  async (params) => {
    const response = await fixtureService.getFixtures(params)
    return response
  }
)

// TODO: Remove this singleFixtureDetails
const initialState = {
  fixtures: [],
  loading: false,
}

export const fixtureSlice = createSlice({
  name: 'fixture',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setFixtures: (state, action) => {
      state.fixtures = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixture.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFixture.fulfilled, (state, action) => {
        state.fixtures = action.payload

        // alert(JSON.stringify(action.payload))
        state.loading = false
      })
      .addCase(fetchFixture.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setLoading, setFixtures } = fixtureSlice.actions

export default fixtureSlice.reducer
