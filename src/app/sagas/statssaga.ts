import { put, call, takeEvery } from "redux-saga/effects"
import { LoadStats } from "../../features/stats/statslice"
import statsService from "../../services/statsApi"

function* fetchStats(): any {
  try {
    const stats = yield call(() => statsService.getAllStats())
    yield put(LoadStats(stats))
  } catch (error) {
    console.error(error)
  }
}

export function* watchFetchStats() {
  yield takeEvery("stat/getStats", fetchStats)
}
