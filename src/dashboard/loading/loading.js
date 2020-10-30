import React, { Component } from 'react';
import { Spin } from 'antd';
import "./loading.css"

export default class Loading extends React.Component {
    state = { loading: false };
    constructor(props) {
        super(props);
        this.state = { loading: props.loading };
       }
    componentDidMount() {
        this.setState({loading: false})
    }
    render() {
        let renderContent;
        if (this.state.loading) {
          renderContent = (
            <div className="spin-list">
            <Spin spinning={this.state.loading}>
            </Spin>
            </div>
         )   
        } else {
          renderContent = (
                this.props.children
            )
        }
        return (
            <> 
                {renderContent}
            </>

        )
    }
}