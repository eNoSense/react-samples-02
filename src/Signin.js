import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AV from  'leancloud-storage';
import Validator from './validate'


class Signin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signInData: {
        nickname: '',
        password: '',
      },
      errors: {}
    }
  }

  onSignInFromValueChange (event, field) {
    const val = event.target.value
    let copy = JSON.parse(JSON.stringify(this.state))
    copy.signInData[field] = val
    copy.errors = {}
    this.setState(copy)
  }

  login() {
    const { nickname, password } = this.state.signInData
    //
    const data = this.state.signInData
    let rules = [
      {key: 'nickname', minLength: 3},
      {key: 'password', minLength: 6},
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    console.log(errors)
    this.setState({
      errors
    })
    if (Object.keys(errors).length > 0) {
      return
    }
    //
    AV.User.logIn(nickname, password)
      .then(user => {
        console.log(user)
        this.props.history.push('/index')
      }, error => {
        if (error.code === 210) {
          const copy = JSON.parse(JSON.stringify(this.state))
          let { errors } = copy
          //
          errors.password = { minLength: '用户名密码不匹配' }
          this.setState(copy)
        } else if (error.code === 211) {
          const copy = JSON.parse(JSON.stringify(this.state))
          let { errors } = copy
          //
          errors.nickName = { minLength: '用户名密码不匹配' }
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
          <h1>用户登录</h1>
          <p>
            <input onChange={(e) => { this.onSignInFromValueChange(e, 'nickname')}} value={this.state.signInData.nickname} className={this.state.errors.nickname ? 'middle error' : 'middle'} type="text" placeholder="用户名" />
            {this.state.errors.nickname ? <span className="error-tip">{this.state.errors.nickname.minLength}</span> : ''}
          </p>
          <p>
            <input onChange={(e) => { this.onSignInFromValueChange(e, 'password')}} value={this.state.signInData.password}  className={this.state.errors.password ? 'middle error' : 'middle'} type="password" placeholder="密码" />
            {this.state.errors.password ? <span className="error-tip">{this.state.errors.password.minLength}</span> : ''}
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
