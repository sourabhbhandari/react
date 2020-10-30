import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './dashboard.css';
import QuestionForm from '../components/forms/questions/form_question';
import SelectTest from '../components/forms/questions/select_test';
import UserProfile from './profile/user-profile';
import QuestionLibrary from '../Question_Library/Library';
import TestDetail from '../TestDetail/testComponents/createTest';
import TestList from '../TestDetail/testComponents/TestList';
import CreateBlog from '../Blog/pages/createBlog';
import BlogList from '../Blog/pages/blogList';
import CreateBatch from '../batch_management/batch_pages/createBatch';
import BatchList from '../batch_management/batch_pages/batchList';
import Batch from '../batch_management/batch_pages/batchDetails';
import AddStudent from '../batch_management/batch_pages/addStudent';
import AddTeacher from '../batch_management/batch_pages/addTeacher';
import TeacherList from '../batch_management/batch_pages/teacherList';
import StudentList from '../batch_management/batch_pages/studentList';
import QuestionsComponent from '../TestDetail/testDetailComponent/questionsComponent';
import Result from '../result/result';
import ScoreCard from '../TestDetail/scoreCardComponent/scoreCard';
//import DashboardRouter from './dashboard_router';

export default class DashboardRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    return (
      <div class="form-bg">
        <Route exact path="/dashboard/" component={UserProfile} />
        <Route exact path="/dashboard/test/create/" component={TestDetail} />
        <Route exact path="/dashboard/test/list/" component={TestList} />
        <Route
          exact
          path="/dashboard/test/:id/details"
          component={QuestionsComponent}
        />
        <Route exact path="/dashboard/test/:id/edit" component={TestDetail} />
        <Route
          exact
          path="/dashboard/questionlibrary"
          component={QuestionLibrary}
        />
        <Route
          exact
          path="/dashboard/questionlibrary/:id"
          component={QuestionLibrary}
        />
        <Route
          exact
          path="/dashboard/test/:testId/question/:questionId/edit"
          component={QuestionForm}
        />
        <Route
          exact
          path="/dashboard/question/create/"
          component={QuestionForm}
        />

        <Route
          exact
          path="/dashboard/test/:testId/question/create"
          component={QuestionForm}
        />
        <Route
          exact
          path="/dashboard/question/list/:id/"
          component={SelectTest}
        />
        <Route exact path="/dashboard/blog/create/" component={CreateBlog} />
        <Route exact path="/dashboard/blog/list/" component={BlogList} />

        <Route exact path="/dashboard/batch/details/:id" component={Batch} />

        <Route exact path="/dashboard/batch/create" component={CreateBatch} />
        <Route
          exact
          path="/dashboard/batch/create/:id"
          component={CreateBatch}
        />
        <Route
          exact
          path="/dashboard/batch/teacher/add"
          component={AddTeacher}
        />
        <Route
          exact
          path="/dashboard/batch/teacher/list"
          component={TeacherList}
        />

        <Route
          exact
          path="/dashboard/batch/student/add"
          component={AddStudent}
        />
        <Route
          exact
          path="/dashboard/batch/student/list"
          component={StudentList}
        />
        <Route exact path="/dashboard/batch/list" component={BatchList} />

        <Route exact path="/dashboard/question/list/" component={SelectTest} />
        <Route exact path="/dashboard/analytics/result/" component={Result} />
        <Route
          exact
          path="/dashboard/test/:testId/scorecard/"
          component={ScoreCard}
        />
      </div>
    );
  }
}
