import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AV from  'leancloud-storage';

class PageIndex extends Component  {
  componentDidMount() {
    if (!AV.User.current()) {
      this.props.history.push('/signin');
    }
    this.setState({
      current_user: AV.User.current()
    })
  }

  logout() {
    console.log('this', this.state)
    AV.User.logOut()
      .then((response) => {
        this.props.history.push('/signin');
        console.log('logout response')
        console.log(response)
        console.log('this2', this.state)
        this.setState({
          current_user: null,
        });
      })
  }
  render() {
    return (
      <div className="container">
        我是主页
        <span className="aWithoutHref" onClick={() => {this.logout()}}>登出</span>
      </div>
    )
  }
}

export default withRouter(PageIndex)
