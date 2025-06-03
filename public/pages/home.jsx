import * as React from "react"
import { animated } from "react-spring"
import { useWiggle } from "../hooks/wiggle"
import { Link } from "wouter"
import {useEffect} from "react"
import UserFetch from "../components/user-fetch"
import {UserIsLoggedIn} from "../components/user-fetch"


const Loggingin=false
const CreateAccount=false

export default function Home() {
  const Username=null
  const[Login, SetLogin]=React.useState(Loggingin)
  const [Createaccount, SetCAccount]=React.useState(CreateAccount)
  function ChangeLogin(){
    if(Login){
      SetLogin(false)
    }else{
      SetLogin(true)
  }
  }
  function CloseLogin(){
    ChangeLogin()
  }
  function ChangeNewAccount(){
    if(!Createaccount){
      SetCAccount(true)
    }else{
      SetCAccount(false)
    }
  }
  let user=document.querySelector("#Email")
  let password=document.querySelector("#Password")
  if(!Login&&!Createaccount&&UserIsLoggedIn()==false){
  return (
    <>
      <header>
        <h1>Carter 2</h1>
        <ul className="menu">
           <li className="menu"><button type="button" id="admin-login" onClick={()=>open("/administrator-login","Administrator Login","width=800,height800")}>Administrator Login</button></li>
          <li className="menu"><button type="button" className="login-button" onClick={ChangeLogin}>Login</button></li>
          <li className="menu"><div id="create-account-button-view"><button id="create-acount-button" onClick={ChangeNewAccount}>Create Account</button></div></li>
        </ul>
      </header>
      <main>
      </main>
    </>
  );}
  else if(Login){
    return(<>
      <main>
        <div id="login-username" className="popup">
          <div style={{ textAlign: "right" }}><button id="close-button1" onClick={ChangeLogin}>X</button></div>
          <h1 className="admin">Login</h1>
          <div style={{ textAlign: "center" }}>
          <form action="https://carter2dev.glitch.me/login" method="Post" name="Login" className="login">
            <label htmlFor="Email">Email</label>
            <input name="Email" type="email" placeholder="Email" id="Email" autoComplete="email"/>
            <label htmlFor="Password">Password</label>
            <input name="Password" type="password" placeholder="Password" id="Password" autoComplete="off"/>
            <input type="submit" value="Login"/>
          </form>
          </div>
        </div>
      </main>
    </>)}
  else if(Createaccount){return(
    <>
      <main>
      <div id="new-account" className="popup">
    <div style={{ textAlign: "right" }}>
      <button type="button" id="account-popup-close" onClick={ChangeNewAccount}>X</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <form action="/new-account" method="POST" name="new-account" autoComplete="off">
            <input name="Name" type="text" placeholder="Name" id="Name" required=""/>
            <input name="NewUserEmail" type="email" placeholder="Email" required="" id="NewUserEmail"/>
            <input name="NewUser" type="text" placeholder="Username" id="NewUser" required=""/>
            <input name="NewUserPassword" type="password" placeholder="Password" id="NewUserPassword" required=""/>
            <input name="ConfirmNewPassword" type="password" placeholder="Confirm Password" required=""/>
            <input type="submit" defaultValue="Create Account" />
          </form>
        </div>
      </div>
  </main>
</>)}
  else if(UserIsLoggedIn()==true){
    return(<><ul className="menu">
            <li className="menu"><button><a className="menu" href="/account-home">
            </a></button></li>
            <li className="menu"><button><a className="menu" href="https://carter2dev.glitch.me/logout">Log out</a></button></li>
            </ul></>)
  }
}
