(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){e.exports=a(36)},25:function(e,t,a){},27:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(17),i=a.n(s),o=(a(25),a(4)),l=a(5),c=a(3),m=a.n(c),u=(a(27),a(6)),p=a(7),d=a(9),h=a(8),g=a(10),f=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={sign_in_form:{nickname:"",password:""},error_valid:{}},a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"onSignInFromValueChange",value:function(e,t){var a=e.target.value,n=JSON.parse(JSON.stringify(this.state));n.sign_in_form[t]=a,n.error_valid={},this.setState(n)}},{key:"login",value:function(){var e=this,t=this.state.sign_in_form,a=t.nickname,n=t.password;this.checkValid()&&m.a.User.logIn(a,n).then(function(t){console.log(t),e.setState({current_user:t}),e.props.history.push("/index")},function(t){if(210===t.code){var a=JSON.parse(JSON.stringify(e.state));a.error_valid.password="\u7528\u6237\u540d\u5bc6\u7801\u4e0d\u5339\u914d",e.setState(a)}else if(211===t.code){var n=JSON.parse(JSON.stringify(e.state));n.error_valid.nickname="\u8be5\u7528\u6237\u540d\u5c1a\u672a\u88ab\u6ce8\u518c",e.setState(n)}else console.log(t),console.log(typeof t),console.log(Object.keys(t)),console.log(t.code)})}},{key:"checkValid",value:function(){var e=this.state.sign_in_form,t=e.nickname,a=e.password,n=JSON.parse(JSON.stringify(this.state)),r=n.error_valid,s=!0;return t.length<3&&(r.nickname="\u7528\u6237\u540d\u4e0d\u80fd\u5c11\u4e8e\u4e09\u4e2a\u5b57\u7b26",s=!1),a.length<6&&(r.password="\u5bc6\u7801\u4e0d\u80fd\u5c11\u4e8e\u516d\u4e2a\u5b57\u7b26",s=!1),this.setState(n),s}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"sign_up"},r.a.createElement("h1",null,"\u7528\u6237\u767b\u5f55"),r.a.createElement("p",null,r.a.createElement("input",{onChange:function(t){e.onSignInFromValueChange(t,"nickname")},value:this.state.sign_in_form.nickname,className:this.state.error_valid.nickname?"middle error":"middle",type:"text",placeholder:"\u7528\u6237\u540d"}),this.state.error_valid.nickname?r.a.createElement("span",{className:"error-tip"},this.state.error_valid.nickname):""),r.a.createElement("p",null,r.a.createElement("input",{onChange:function(t){e.onSignInFromValueChange(t,"password")},value:this.state.sign_in_form.password,className:this.state.error_valid.password?"middle error":"middle",type:"password",placeholder:"\u5bc6\u7801"}),this.state.error_valid.password?r.a.createElement("span",{className:"error-tip"},this.state.error_valid.password):""),r.a.createElement("p",null,r.a.createElement("input",{onClick:function(){e.login()},className:"middle-button",type:"submit",value:"\u767b\u5f55"}),r.a.createElement(o.b,{to:"/signup"},"\u53bb\u6ce8\u518c >> "))))}}]),t}(n.Component),v=Object(l.f)(f),_=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={sign_up_form:{nickname:"",email:"",password:"",confirm_password:""},error_valid:{}},a}return Object(g.a)(t,e),Object(p.a)(t,[{key:"onValueChange",value:function(e,t){var a=e.target.value,n=JSON.parse(JSON.stringify(this.state));n.sign_up_form[t]=a,n.error_valid={},this.setState(n)}},{key:"onSubmitSignUpForm",value:function(){var e=this,t=this.state.sign_up_form,a=t.nickname,n=t.email,r=t.password;if(this.checkValid()){var s=new m.a.User;s.setUsername(a),s.setEmail(n),s.setPassword(r),s.signUp().then(function(t){console.log("loginedUser"),console.log(t),e.props.history.push("/index")},function(t){if(125===t.code){var a=JSON.parse(JSON.stringify(e.state));a.error_valid.email="\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e",e.setState(a)}else if(202===t.code){var n=JSON.parse(JSON.stringify(e.state));n.error_valid.nickname="\u7528\u6237\u540d\u5df2\u88ab\u5360\u7528",e.setState(n)}else if(203===t.code){var r=JSON.parse(JSON.stringify(e.state));r.error_valid.email=t.rawMessage,e.setState(r)}else console.log(t),console.log(typeof t),console.log(Object.keys(t)),console.log(t.code)})}}},{key:"checkValid",value:function(){var e=this.state.sign_up_form,t=e.nickname,a=e.email,n=e.password,r=e.confirm_password,s=JSON.parse(JSON.stringify(this.state)),i=s.error_valid,o=!0;return t.length<3&&(i.nickname="\u7528\u6237\u540d\u4e0d\u80fd\u5c11\u4e8e\u4e09\u4e2a\u5b57\u7b26",o=!1),a.indexOf("@")<0&&(i.email="\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e",o=!1),n.length<6&&(i.password="\u5bc6\u7801\u4e0d\u80fd\u5c11\u4e8e\u516d\u4e2a\u5b57\u7b26",o=!1),r!==n&&(i.confirm_password="\u4e24\u6b21\u8f93\u5165\u5bc6\u7801\u4e0d\u4e00\u81f4",o=!1),this.setState(s),o}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"sign_up"},r.a.createElement("h1",null,"\u7528\u6237\u6ce8\u518c"),r.a.createElement("p",null,r.a.createElement("input",{onChange:function(t){e.onValueChange(t,"nickname")},value:this.state.sign_up_form.nickname,className:this.state.error_valid.nickname?"middle error":"middle",type:"text",placeholder:"\u6635\u79f0"}),this.state.error_valid.nickname?r.a.createElement("span",{className:"error-tip"},this.state.error_valid.nickname):""),r.a.createElement("p",null,r.a.createElement("input",{onChange:function(t){e.onValueChange(t,"email")},value:this.state.sign_up_form.email,className:this.state.error_valid.email?"middle error":"middle",type:"text",placeholder:"Email"}),this.state.error_valid.email?r.a.createElement("span",{className:"error-tip"},this.state.error_valid.email):""),r.a.createElement("p",null,r.a.createElement("input",{onChange:function(t){e.onValueChange(t,"password")},value:this.state.sign_up_form.password,className:this.state.error_valid.password?"middle error":"middle",type:"password",placeholder:"\u5bc6\u7801"}),this.state.error_valid.password?r.a.createElement("span",{className:"error-tip"},this.state.error_valid.password):""),r.a.createElement("p",null,r.a.createElement("input",{onChange:function(t){e.onValueChange(t,"confirm_password")},value:this.state.sign_up_form.confirm_password,className:this.state.error_valid.confirm_password?"middle error":"middle",type:"password",placeholder:"\u91cd\u590d\u5bc6\u7801"}),this.state.error_valid.confirm_password?r.a.createElement("span",{className:"error-tip"},this.state.error_valid.confirm_password):""),r.a.createElement("p",null," ",r.a.createElement("input",{onClick:function(){e.onSubmitSignUpForm()},className:"middle-button",type:"submit",value:"\u6ce8\u518c"})," ")))}}]),t}(n.Component),w=Object(l.f)(_),k=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){m.a.User.current()||this.props.history.push("/signin"),this.setState({current_user:m.a.User.current()})}},{key:"logout",value:function(){var e=this;console.log("this",this.state),m.a.User.logOut().then(function(t){e.props.history.push("/signin"),console.log("logout response"),console.log(t),console.log("this2",e.state),e.setState({current_user:null})})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},"\u6211\u662f\u4e3b\u9875",r.a.createElement("span",{className:"aWithoutHref",onClick:function(){e.logout()}},"\u767b\u51fa"))}}]),t}(n.Component),E=Object(l.f)(k);var O=function(){return console.log("init app"),m.a.init({appId:"FYCTcKYDOcOsKw2vnRmNvBwQ-gzGzoHsz",appKey:"BVDwbxfu4n7ziAUpuEDnf2z3"}),r.a.createElement("div",{className:"App"},r.a.createElement(o.a,null,r.a.createElement(l.d,null,r.a.createElement(l.b,{exact:!0,path:"/",render:function(){return r.a.createElement(l.a,{to:"/signin"})}}),r.a.createElement(l.b,{path:"/signin",component:v}),r.a.createElement(l.b,{path:"/signup",component:w}),r.a.createElement(l.b,{path:"/index",component:E}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.682adf58.chunk.js.map