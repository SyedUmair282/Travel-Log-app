import { React, useState,useEffect,useRef } from "react";
import '../signup.css';
import { Room,Cancel } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import axios from 'axios';
const Signin = ({setLogintrue}) => {
  //use states.........................................................................
  const [oerror,setError]=useState();
  //use Ref............................................................................
    const name = useRef()
    const password = useRef()
  //Methods............................................................................
  const signin=async(e)=>{
    e.preventDefault()
    let obj={
      username:name.current.value,
      password:password.current.value
    }
  try {
    setError("success")
    if(name.current.value && password.current.value){
      const res=await axios.post("/user/login",obj)
      setError(null)
      localStorage.setItem('user',res.data.username)
      setLogintrue(false)
    }
    else{
      setError("error")
    }
  } catch (error) {
      setError("error")
      console.log(error)
  }
  }
  return (
    <div className="new">
        <form className="card3">
                <Cancel style={{position:"absolute",top:2,right:2,cursor:"pointer"}} onClick={()=>setLogintrue(false)}></Cancel>
                <h1><Room style={{marginTop:"5px"}}></Room>Travel Log</h1>
                <label>Username</label>
                <span className="desc2">
                  <input className="insty" required type="text" placeholder="Username" ref={name}/>
                </span>
                <br/>
                <label>Password</label>
                <span className="desc2">
                  <input className="insty" required type="password" placeholder="Password" ref={password}/>
                </span>
                <br/>
                <span className="btn">
                <input className="button" onClick={signin} type="submit" value="Sign in"/>
                </span>
                {oerror==="error"?<span className="error">
                  <p>Something went wrong!</p>
                </span>:oerror==="success"?<span className="success">
                  <CircularProgress color="success" size={30} style={{marginTop:"10px"}}/>
                </span>:null}
        </form>
    </div>
  );
};

export default Signin;