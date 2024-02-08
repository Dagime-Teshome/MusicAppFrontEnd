import { configureStore } from "@reduxjs/toolkit"
import songReducer from "../features/songs/songSlice"
import statsReducer from "../features/stats/statslice"
import filterReducer from "../features/toolbar/toolbarslice"
import createSagaMiddleware from "@redux-saga/core"
import rootSaga from "./sagas/rootsaga"
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    song: songReducer,
    stat: statsReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
