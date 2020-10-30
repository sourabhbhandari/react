import { all, fork } from 'redux-saga/effects';
import watchUserAuthentication from './auth/sagas/watchers';
import watchQuestions from './components/forms/questions/question-state/sagas/questionWatchers';
import watchTest from './TestDetail/state/sagas/watchUserTest';
import watchInstitute from './institute_home_page/state/sagas/watchInstitute';
import watchUserTest from './Test/state/saga/watchUserTest';
import categoryWatcher from './category_home_page/state/sagas/categoryWatcher';
import watchLibrary from './Question_Library/state/saga/watchLibrary';
import blogWatcher from './Blog/state/saga/blogWatcher';
import batchWatcher from './batch_management/state/sagas/batchWatcher';
import resultWatcher from './result/state/saga/resultWatcher';

export default function* startForman() {
  yield all([
    fork(watchUserAuthentication),
    fork(watchQuestions),
    fork(watchTest),
    fork(watchInstitute),
    fork(watchUserTest),
    fork(categoryWatcher),
    fork(watchLibrary),
    fork(blogWatcher),
    fork(batchWatcher),
    fork(resultWatcher)
  ]);
}
