import { all, fork } from 'redux-saga/effects';
import { watchGetProfile, watchLogout, watchLogin } from './access.sagas';
import watchToggleModal from './modals.sagas';

export default function* rootSaga() {
  yield all([
    fork(watchGetProfile),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchToggleModal),
  ]);
}
