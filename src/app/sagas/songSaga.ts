import {
  LoadSongs,
  getSongs,
  updateSong,
  deleteSong,
  createSong,
} from "../../features/songs/songSlice"
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
function* createSongSaga(action: any): any {
  try {
    yield call(() => songsService.createSong(action.payload))
    yield put(getSongs())
    yield put(getStats())
    yield put(genreAction())
  } catch (error) {
    console.error(error)
  }
}
function* updateSongSaga(action: any): any {
  try {
    const id = action.payload.id
    const data = action.payload.data
    yield call(() => songsService.updateSong(id, data))
    yield put(getSongs())
    yield put(getStats())
    yield put(genreAction())
  } catch (error) {
    console.error(error)
  }
}
function* deleteSongSaga(action: any): any {
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
  yield takeEvery("song/updateSong", updateSongSaga)
}
export function* watchCreateSongAsync(): SagaIterator {
  yield takeEvery("song/createSong", createSongSaga)
}
export function* watchDeleteSongAsync(): SagaIterator {
  yield takeEvery("song/deleteSong", deleteSongSaga)
}
