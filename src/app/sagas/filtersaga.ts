import { put, call, takeEvery } from "redux-saga/effects"
import { LoadSongs } from "../../features/songs/songSlice"
import { loadGenres } from "../../features/toolbar/toolbarslice"
import filterService from "../../services/filterApi"

function* filter(action: any): any {
  try {
    const filteredList = yield call(() =>
      filterService.filterSongs(action.payload),
    )
    yield put(LoadSongs(filteredList))
  } catch (error) {
    console.error(error)
  }
}

function* getGenres(): any {
  try {
    const genreList = yield call(() => filterService.getGenres())
    yield put(loadGenres(genreList))
  } catch (error) {
    console.error(error)
  }
}
export function* watchGenreFilter() {
  yield takeEvery("filter/genreAction", getGenres)
}
export function* watchFetchStats() {
  yield takeEvery("filter/filterSongs", filter)
}
