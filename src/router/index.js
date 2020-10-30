import React, { Suspense, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';

import PrivateRoute from './private_routes';
import history from './history';
import Loading from '../components/global/loading/loading';
import Home from '../landing/Home';

import Category from '../category_home_page/categoryPage';
import CategoryHome from '../category_home_page/components/Main';
import First from '../Test/First';
import Second from '../Test/Second';
import Third from '../Test/Third';
import Feedback from '../Test/Feedback';
import Institute from '../institute_home_page/instituteHome';
import DashboardHOC from '../dashboard/hoc/dashboard';
import PageNotFound from '../components/global/error/page_not_found/page_not_found';
import QuestionLibrary from '../Question_Library/Library';
import About from '../components/home/about';
import Blog from '../Blog/pages/Blog';
import BlogHome from '../Blog/pages/BlogHome';

import BatchDetail from '../batch_management/batch_pages/batchDetails';

class CustomRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    let renderContent = [];
    if (this.state.loading) {
      renderContent.push(
        <div className="spin-list">
          <Spin spinning={this.state.loading}>from inside custome router</Spin>
        </div>
      );
    } else {
      renderContent.push(
        <Router history={history}>
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <Switch>
              <Route
                exact
                path="/category/:category"
                component={CategoryHome}
              />
              <Route exact path="/category/" component={Category} />

              <Route path="/dashboard/" component={DashboardHOC} />
              <PrivateRoute exact path="/first/:testLink" component={First} />
              <PrivateRoute
                exact
                path="/first/second/:testLink"
                component={Second}
              />
              <Route
                exact
                path="/institute/:institute/"
                component={Institute}
              />
              <Route exact path="/dashboard/batch" component={BatchDetail} />
              <Route exact path="/blog/home/" component={BlogHome} />
              <Route exact path="/blog/home/:category" component={BlogHome} />
              <Route exact path="/blog/:id" component={Blog} />
              <Route exact path="/third/" component={Third} />

              <Route
                exact
                path="/questionlibrary/:id"
                component={QuestionLibrary}
              />
              <Route
                exact
                path="/questionlibrary/"
                component={QuestionLibrary}
              />
              <PrivateRoute
                exact
                path="/first/second/third/:testLink"
                component={Third}
              />

              <Route exact path="/feedback/:id" component={Feedback} />
              <Route exact path="/about/" component={About} />
              <Route exact path="/contact-us/" component={Home} />
              <Route exact path="/" component={Home} />
              <Route component={PageNotFound} />
            </Switch>
          </Suspense>
        </Router>
      );
    }

    return <>{renderContent}</>;
  }
}

export default CustomRouter;
