import React, { Component } from 'react';
import SubjectComponent from '../subjectComponent/subjectComponent';
import AssignmentComponent from '../assignment/assignmentComponent';
import StudentComponent from '../studentComponents/studentComponent';
import NotificationComponent from '../announcement/notificationComponent';

class batchInformation extends Component {
  render() {
    const { status, batchId } = this.props;
    return (
      <div>
        {status === '1' ? <AssignmentComponent batchId={batchId} /> : null}
        {status === '2' ? <SubjectComponent batchId={batchId} /> : null}
        {status === '3' ? <StudentComponent batchId={batchId} /> : null}
        {status === '4' ? <NotificationComponent batchId={batchId} /> : null}
      </div>
    );
  }
}

export default batchInformation;
