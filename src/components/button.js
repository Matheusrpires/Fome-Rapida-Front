import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Google from '../style/img/icons/google.png';
import axios from 'axios';

class Button extends Component {

  handleOnclick = (props) => {
    this.props.handleEvent();
    console.log('teste')
  }

  googleLogin = () => {
    axios.get('http://localhost:5000/auth/google')
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  flogin = () => {

    let a = window.open('http://localhost:5000/auth/google', "_self");
    // a.open();
  //   a.onbeforeunload = function(){
  //     // Do something
  //     console.log('mains')
  //  }
    // const listener = await window.addEventListener('message', (message) => {
    //   //message will contain facebook user and details
    //   console.log(message)
    //   console.log('status',message[0].statusCode)
    //   return message
    // });
    // quando tiver logado chamar  mywindow.close();
  }


  render() {

    const btn_class = {
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: "600",
      letterSpacing: "1px",
      lineHeight: "19px",
      width: "100%",
      textAlign: "center",
      color: `white`,
      textDecoration: 'none'
    }

    const btn_class2 = {
      color: "#4A4A4A",
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: "600",
      letterSpacing: "1px",
      lineHeight: "19px",
      textAlign: "center",
      textDecoration: 'none',
    }

    const btn_class3 = {
      color: "#4A4A4A",
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: "600",
      letterSpacing: "1px",
      lineHeight: "19px",
      textAlign: "center",
      textDecoration: 'none',
      marginLeft: '-35px'
    }

    const btn = {
      border: " 1px solid #9B9B9B",
      width: "100%",
      height: "33px",
      textAlign: "center",
      paddingTop: "12px",
      margin: '35px 0px',
      marginBottom: '0px'
    }

    const background = {
      backgroundImage: "linear-gradient(134.72deg, #AE23A9 0%, #DC4E1B 100%)",
      border: " 1px solid #9B9B9B",
      width: "100%",
      height: "47px",
      // textAlign: "center",
      // paddingTop: "12px",
      margin: '15px 0px 5px 0px',
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: "600",
      letterSpacing: "1px",
      // lineHeight: "19px",
      width: "100%",
      color: `white`,
    }

    const backgroundGoogle = {
      border: " 1px solid #9B9B9B",
      width: "100%",
      height: "33px",
      textAlign: "center",
      paddingTop: "12px",
      margin: '35px 0px'
    }

    return (
      <React.Fragment>
        {
          this.props.type === "color" ?
            <div>
              {/* <Link to="/category" style={btn_class} onClick={this.handleOnclick}>{this.props.children}</Link> */}
              {/* <button type="submit" onClick={this.handleOnclick} style={background}}> {this.props.children}</button> */}
              <button type="submit" onClick={this.handleOnclick} style={background}>{this.props.children}</button>
            </div>
            : this.props.type === "google" ?
              <div style={backgroundGoogle}>
                <img src={Google} className="login__google" />
                <a to="/category" style={btn_class3} onClick={this.flogin}>
                  {this.props.children}</a>
              </div>
              :
              <div onClick={this.handleOnclick} style={btn}>
                <Link to="/category" style={btn_class2} onClick={this.handleOnclick}>{this.props.children}</Link>
              </div>
        }
      </React.Fragment>
    )
  }
}

export default Button;