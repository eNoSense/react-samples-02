import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AV from 'leancloud-storage';

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sign_up_form: {
        nickname: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      error_valid: {}
    }
  }

  onValueChange (event, field) {
    const val = event.target.value
    let copy = JSON.parse(JSON.stringify(this.state))
    copy.sign_up_form[field] = val
    copy.error_valid = {}
    this.setState(copy)
  }

  onSubmitSignUpForm () {
    const {nickname, email, password} = this.state.sign_up_form
    //
    if (!this.checkValid()) {
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
        let { error_valid } = copy
        error_valid.email = '邮箱格式不正确'
        this.setState(copy)
      } else if (error.code === 202) {
        const copy = JSON.parse(JSON.stringify(this.state))
        let { error_valid } = copy
        error_valid.nickname = '用户名已被占用'
        this.setState(copy)
      }  else if (error.code === 203) {
        const copy = JSON.parse(JSON.stringify(this.state))
        let { error_valid } = copy
        error_valid.email = error.rawMessage
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
    const {nickname, email, password, confirm_password} = this.state.sign_up_form
    const copy = JSON.parse(JSON.stringify(this.state))
    let { error_valid } = copy
    let noError = true
    
    if (nickname.length < 3) {
      error_valid.nickname = '用户名不能少于三个字符'
      noError = false
    }

    if (email.indexOf('@') < 0) {
      error_valid.email = '邮箱格式不正确'
      noError = false
    }

    if (password.length < 6) {
      error_valid.password = '密码不能少于六个字符'
      noError = false
    }

    if (confirm_password !== password) {
      error_valid.confirm_password = '两次输入密码不一致'
      noError = false
    }

    this.setState(copy)
    return noError
  }

  render () {
    return (
      <div className="container">
        <div className="sign_up">
          <h1>用户注册</h1>
          <p> 
            <input onChange={(e) => { this.onValueChange(e, 'nickname')}} value={this.state.sign_up_form.nickname} className={this.state.error_valid.nickname ? 'middle error' : 'middle'} type="text" placeholder="昵称" />
            {this.state.error_valid.nickname ? <span className="error-tip">{this.state.error_valid.nickname}</span> : ''}
          </p>
          <p> 
            <input onChange={(e) => { this.onValueChange(e, 'email')}} value={this.state.sign_up_form.email}  className={this.state.error_valid.email ? 'middle error' : 'middle'} type="text" placeholder="Email" />
            {this.state.error_valid.email ? <span className="error-tip">{this.state.error_valid.email}</span> : ''}
          </p>
          <p> 
            <input onChange={(e) => { this.onValueChange(e, 'password')}} value={this.state.sign_up_form.password}  className={this.state.error_valid.password ? 'middle error' : 'middle'} type="password" placeholder="密码" />
            {this.state.error_valid.password ? <span className="error-tip">{this.state.error_valid.password}</span> : ''}
          </p>
          <p> 
            <input onChange={(e) => { this.onValueChange(e, 'confirm_password')}} value={this.state.sign_up_form.confirm_password}  className={this.state.error_valid.confirm_password ? 'middle error' : 'middle'} type="password" placeholder="重复密码" /> 
            {this.state.error_valid.confirm_password ? <span className="error-tip">{this.state.error_valid.confirm_password}</span> : ''}
          </p>
          <p> <input onClick={() => { this.onSubmitSignUpForm() }} className="middle-button" type="submit" value="注册"/> </p>
        </div>
      </div>
    )
  }
}

export default withRouter(Signup);
