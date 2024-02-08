import { all } from "redux-saga/effects"
import * as songSagas from "./songSaga"
import * as statSagas from "./statssaga"
import * as filterSagas from "./filtersaga"

export default function* rootSaga() {
  yield all([
    ...Object.values(songSagas).map(songSagas => songSagas()),
    ...Object.values(statSagas).map(statSagas => statSagas()),
    ...Object.values(filterSagas).map(filterSaga => filterSaga()),
  ])
}
