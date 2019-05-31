import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AV from  'leancloud-storage';

class Signin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sign_in_form: {
        nickname: '',
        password: '',
      },
      error_valid: {}
    }
  }

  onSignInFromValueChange (event, field) {
    const val = event.target.value
    let copy = JSON.parse(JSON.stringify(this.state))
    copy.sign_in_form[field] = val
    copy.error_valid = {}
    this.setState(copy)
  }

  login() {
    const { nickname, password } = this.state.sign_in_form
    //
    if (!this.checkValid()) {
      return
    }
    //
    AV.User.logIn(nickname, password)
      .then(user => {
        console.log(user)
        this.setState({
          current_user: user,
        })
        this.props.history.push('/index')
      }, error => {
        if (error.code === 210) {
          const copy = JSON.parse(JSON.stringify(this.state))
          let { error_valid } = copy
          error_valid.password = '用户名密码不匹配'
          this.setState(copy)
        } else if (error.code === 211) {
          const copy = JSON.parse(JSON.stringify(this.state))
          let { error_valid } = copy
          error_valid.nickname = '该用户名尚未被注册'
          this.setState(copy)
        } else {
          console.log(error)
          console.log(typeof error)
          console.log(Object.keys(error))
          console.log(error.code)
        }
      })
  }

  checkValid () {
    const {nickname, password } = this.state.sign_in_form
    const copy = JSON.parse(JSON.stringify(this.state))
    let { error_valid } = copy
    let noError = true
    
    if (nickname.length < 3) {
      error_valid.nickname = '用户名不能少于三个字符'
      noError = false
    }

    if (password.length < 6) {
      error_valid.password = '密码不能少于六个字符'
      noError = false
    }

    this.setState(copy)
    return noError
  }

  render () {
    return (
      <div className="container">
        <div className="sign_up">
          <h1>用户登录</h1>
          <p> 
            <input onChange={(e) => { this.onSignInFromValueChange(e, 'nickname')}} value={this.state.sign_in_form.nickname} className={this.state.error_valid.nickname ? 'middle error' : 'middle'} type="text" placeholder="用户名" />
            {this.state.error_valid.nickname ? <span className="error-tip">{this.state.error_valid.nickname}</span> : ''}
          </p>
          <p> 
            <input onChange={(e) => { this.onSignInFromValueChange(e, 'password')}} value={this.state.sign_in_form.password}  className={this.state.error_valid.password ? 'middle error' : 'middle'} type="password" placeholder="密码" />
            {this.state.error_valid.password ? <span className="error-tip">{this.state.error_valid.password}</span> : ''}
          </p>
          <p>
            <input onClick={() => { this.login() }} className="middle-button" type="submit" value="登录"/>
            <Link to="/signup" >去注册 >> </Link>
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(Signin);
