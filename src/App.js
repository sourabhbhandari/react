import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import * as Sentry from '@sentry/browser';
import 'antd/dist/antd.css';
import './App.css';
import CustomRouter from './router';
import ErrorBoundary from './error/ErrorBoundary';

//Sentry.init({dsn: "https://e649081cb296487aa482c949985c99f0@sentry.io/1832499"});

function App() {
  return (
    <div className="react-main-container">
      <ErrorBoundary>
        <BrowserRouter>
          <CustomRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
