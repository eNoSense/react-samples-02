import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AV from 'leancloud-storage';
import Validator from './validate'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signUpData: {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: {}
    }
  }

  onValueChange (event, field) {
    const val = event.target.value
    let copy = JSON.parse(JSON.stringify(this.state))
    copy.signUpData[field] = val
    copy.errors = {}
    this.setState(copy)
  }

  onSubmitSignUpForm () {
    const {nickname, email, password, confirmPassword} = this.state.signUpData
    //
    const data = this.state.signUpData
    let rules = [
      {key: 'nickname', minLength: 3},
      {key: 'password', minLength: 6},
      {key: 'email', pattern: 'email'},
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    //
    if (confirmPassword !== password) {
      errors.confirmPassword = {pattern: '两次密码输入不一致'}
    }
    console.log(errors)
    this.setState({
      errors
    })
    if (Object.keys(errors).length > 0) {
      return
    }
    //
    const user = new AV.User()
    user.setUsername(nickname)
    user.setEmail(email)
    user.setPassword(password)
    user.signUp().then((loginedUser) => {
      console.log('loginedUser')
      console.log(loginedUser)
      this.props.history.push('/index');
    }, (error) => {
      if (error.code === 125) {
        const copy = JSON.parse(JSON.stringify(this.state))
        let { errors } = copy
        errors.email = { email: '邮箱格式不正确' }
        this.setState(copy)
      } else if (error.code === 202) {
        const copy = JSON.parse(JSON.stringify(this.state))
        let { errors } = copy
        errors.nickname = { minLength: '用户名已被占用' }
        this.setState(copy)
      }  else if (error.code === 203) {
        const copy = JSON.parse(JSON.stringify(this.state))
        let { errors } = copy
        errors.email = { pattern: error.rawMessage }
        this.setState(copy)
      } else {
        console.log(error)
        console.log(typeof error)
        console.log(Object.keys(error))
        console.log(error.code)
      }
    })
  }

  render () {
    return (
      <div className="container">
        <div className="sign_up">
          <h1>用户注册</h1>
          <p>
            <input onChange={(e) => { this.onValueChange(e, 'nickname')}} value={this.state.signUpData.nickname}
              className={this.state.errors.nickname ? 'middle error' : 'middle'} type="text" placeholder="昵称" />
            {this.state.errors.nickname ? <span className="error-tip">{this.state.errors.nickname.minLength}</span> : ''}
          </p>
          <p>
            <input onChange={(e) => { this.onValueChange(e, 'email')}} value={this.state.signUpData.email}
              className={this.state.errors.email ? 'middle error' : 'middle'} type="text" placeholder="Email" />
            {this.state.errors.email ? <span className="error-tip">{this.state.errors.email.pattern}</span> : ''}
          </p>
          <p>
            <input onChange={(e) => { this.onValueChange(e, 'password')}}
              value={this.state.signUpData.password}  className={this.state.errors.password ? 'middle error' : 'middle'} type="password" placeholder="密码" />
            {this.state.errors.password ? <span className="error-tip">{this.state.errors.password.minLength}</span> : ''}
          </p>
          <p>
            <input onChange={(e) => { this.onValueChange(e, 'confirmPassword')}}
              value={this.state.signUpData.confirmPassword}
              className={this.state.errors.confirmPassword ? 'middle error' : 'middle'}
              type="password" placeholder="重复密码" />
            {this.state.errors.confirmPassword ?
              <span className="error-tip">{this.state.errors.confirmPassword.pattern}</span> : ''}
          </p>
          <p> <input onClick={() => { this.onSubmitSignUpForm() }} className="middle-button" type="submit" value="注册"/> </p>
        </div>
      </div>
    )
  }
}

export default withRouter(Signup);
