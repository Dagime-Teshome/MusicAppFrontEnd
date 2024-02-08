import { LoadSongs, getSongs } from "../../features/songs/songSlice"
import { put, call, takeEvery } from "redux-saga/effects"
import songsService from "../../services/songsApi"
import { getStats } from "../../features/stats/statslice"
import { genreAction } from "../../features/toolbar/toolbarslice"
import type { SagaIterator } from "redux-saga"

function* fetchSongs(): any {
  try {
    const Songs = yield call(() => songsService.getAllSongs())
    yield put(LoadSongs(Songs))
  } catch (error) {
    console.error(error)
  }
}
function* createSong(action: any): any {
  try {
    yield call(() => songsService.createSong(action.payload))
    yield put(getSongs())
    yield put(getStats())
    yield put(genreAction())
  } catch (error) {
    console.error(error)
  }
}
function* updateSong(action: any): any {
  try {
    const id = action.payload.id
    const updateObject = action.payload.data
    yield call(() => songsService.updateSong(id, updateObject))
    yield put(getSongs())
    yield put(getStats())
    yield put(genreAction())
  } catch (error) {
    console.error(error)
  }
}
function* deleteSong(action: any): any {
  try {
    yield call(() => {
      songsService.deleteSong(action.payload.id)
    })
    yield put(getSongs())
    yield put(getStats())
    yield put(genreAction())
  } catch (error) {
    console.error(error)
  }
}

export function* watchFetchSongAsync(): SagaIterator {
  yield takeEvery("song/getSongs", fetchSongs)
}
export function* watchUpdateSongAsync(): SagaIterator {
  yield takeEvery("song/updateSong", updateSong)
}
export function* watchCreateSongAsync(): SagaIterator {
  yield takeEvery("song/createSong", createSong)
}
export function* watchDeleteSongAsync(): SagaIterator {
  yield takeEvery("song/deleteSong", deleteSong)
}
