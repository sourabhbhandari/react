import {fork} from 'redux-saga/effects';
import watchQuestions from './questionWatchers';

export default function* startForman() {
  yield fork(watchQuestions);
}
