import { React, useState,useEffect,useRef } from "react";
import '../signup.css';
import { Room,Cancel } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import axios from 'axios';
const Signup = ({setRegtrue}) => {
  //use states................................................................................
  const [oerror,setError]=useState();
  //use Ref...................................................................................
    const name = useRef()
    const email = useRef()
    const password = useRef()
  //Methods...................................................................................
  const signup=async(e)=>{
    e.preventDefault()
    let obj={
      username:name.current.value,
      email:email.current.value,
      password:password.current.value
    }
  try {
    setError("success")
    if(name.current.value && email.current.value && password.current.value){
      const res=await axios.post("/user/register",obj)
      setError(null)
      localStorage.setItem('user',obj.username)
      setRegtrue(false)
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
                <Cancel style={{position:"absolute",top:2,right:2,cursor:"pointer"}} onClick={()=>setRegtrue(false)}></Cancel>
                <h1><Room style={{marginTop:"5px"}}></Room>Travel Log</h1>
                <label>Name</label>
                <span className="place2">
                  <input className="insty" required type="text" placeholder="Enter your name" ref={name} />
                </span>
                <br/>
                <label>Email</label>
                <span className="desc2">
                  <input className="insty" required type="email" placeholder="Enter your mail" ref={email}/>
                </span>
                <br/>
                <label>Password</label>
                <span className="desc2">
                  <input className="insty" required type="password" placeholder="Enter your password" ref={password}/>
                </span>
                <br/>
                <span className="btn">
                   <input className="button" onClick={signup} type="submit" value="Sign up"/>
                </span>
                
                {oerror==="error"?<span className="error">
                  <p>Something went wrong! </p>
                </span>:oerror==="success"?<span className="success">
                <CircularProgress color="success" size={30} style={{marginTop:"10px"}}/>
                </span>:null}
        </form>
    </div>
  );
};

export default Signup;