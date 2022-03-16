import { React, useState,useEffect } from "react";
import Map, { Marker, Popup,NavigationControl,FullscreenControl,GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Star,Room,Cancel } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import '../App.css';
import axios from 'axios';
import {format} from 'timeago.js';
import Signup from "./sign-up";
import Signin from "./sign-in";
const Mapping = () => {
  //use states.....................................................................................
  const [viewState, setViewState] = useState({
    longitude: 69.3451,
    latitude: 30.3753 ,
    zoom: 5,
  });
  const [showPopup, setShowPopup] = useState(null);
  const [getPin,setPin]=useState([]);
  const [dbl,setDbl]=useState(false)
  const [login,setLogin]=useState(false)
  const [regTrue,setRegtrue]=useState(false)
  const [loginTrue,setLogintrue]=useState(false)
  const [post,setPost]=useState()

  //useEffect......................................................................................
  useEffect(() => {
    const getPins=async()=>{
      try {
        const res=await axios.get('/pin');
        setPin(res.data); 
      } catch (error) {
        console.log(error);
      }
    }
    getPins();
  }, []);


  useEffect(() => {
    const res=localStorage.getItem("user");
    if(res){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  }, [loginTrue,regTrue]);

  //Methods........................................................................................
  const Handle=(id,long,lat)=>{
    setShowPopup(id);
    setViewState({
      ...viewState,
      longitude: long,
    latitude: lat,
    zoom: 12,
    })
  }
  const postPin=async()=>{
    let obj={
      username:localStorage.getItem('user'),
      desc:dbl.desc,
      lat:dbl.Lat,
      long:dbl.Long,
      rating:dbl.rating,
      title:dbl.title
    }
    setPost(true)
    try {
      const res=await axios.post('/pin',obj);
      setPin([...getPin,res.data]);
      setPost(false)
    } catch (error) {
      console.log(error);
    }
  }
  const logout=()=>{
    localStorage.removeItem("user");
    setLogin(false);
  }


  return (
    <div>
      <Map
        {...viewState}
        mapboxAccessToken={"pk.eyJ1IjoidW1taTEyMzQ1IiwiYSI6ImNrenUzZjR1bjEzNG8ydm1vZmF3aG52amYifQ.zF0xpayK-pGC2mDVYjf8PA"}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {/* Detail pop up */}
          {getPin.map((v,i)=>{
            return <div key={i}>
            <Marker longitude={v.long} latitude={v.lat}  >
              {v.username===localStorage.getItem('user')?
              <Room onClick={()=>Handle(v._id,v.long,v.lat)} style={{color:"purple",cursor:"pointer"}}/>:
              <Room onClick={()=>Handle(v._id,v.long,v.lat)} style={{color:"red",cursor:"pointer"}}/>}
            </Marker>
          {showPopup===v._id && (
          <Popup
            longitude={v.long}
            latitude={v.lat}
            anchor="left"
            closeButton={true} 
            closeOnClick={false}
            onClose={function() {
              setShowPopup(null)
            }}
          >
            <div className="card">
                <label className="label1">Place</label>
                <span className="place">{v.title}</span>
                <label className="label1">Review</label>
                <span className="desc">{v.desc}</span>
                <label className="label1">Rating</label>
                <div className="star">
                  {Array(v.rating).fill(<Star/>)}
                </div>
                <label className="label1">Information</label>
                <span className="username">Created by <b>{v.username}</b></span>
                <span className="date">{format(v.createdAt)}</span>
            </div>
          </Popup>
        )}
        </div>
      })}

      {/* Add detail pop up */}
      {dbl && (
            <div className="card2">
              <Cancel style={{position:"absolute",top:2,right:2,cursor:"pointer"}} onClick={()=>setDbl(false)} ></Cancel>
                <label>Place</label>
                <span className="place2">
                  <input className="insty" type="text" placeholder="Enter place" onChange={(e)=>setDbl({
                    ...dbl,
                    title:e.target.value
                  })} />
                </span>
                <br/>
                <label>Description</label>
                <span className="desc2">
                  <textarea className="insty" style={{resize:"none"}} placeholder="Enter some reviews" onChange={(e)=>setDbl({
                    ...dbl,
                    desc:e.target.value
                  })}></textarea>
                </span>
                <br/>
                <label>Rating</label>
                <select className="insty" onChange={(e)=>setDbl({
                    ...dbl,
                    rating:e.target.value
                  })}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <br/>
                <label>Longitude</label>
                <span className="lng2">
                  <input type="number" className="insty" placeholder="Enter Longitude" onChange={(e)=>setDbl({
                    ...dbl,
                    Long:e.target.value
                  })} />
                </span>
                <br/>
                <label>Latitude</label>
                <span className="lat2">
                  <input type="number" className="insty" placeholder="Enter Latitude" onChange={(e)=>setDbl({
                    ...dbl,
                    Lat:e.target.value
                  })} />
                </span>
                <br/>
                <span className="btn">
                  <button onClick={()=>{postPin();setDbl(false)}}>Submit</button>
                </span>
                {post && (
                  <CircularProgress color="success" size={30} style={{marginTop:"10px"}}/>
                )}
            </div>
        )}


        {/* BUTTONS */}
        <FullscreenControl />
        <NavigationControl showCompass={false} />
        <div style={{position:'absolute',top:"10px",left:"5px",display:"flex",flexDirection:"column"}}>
          {login && (
            <div>
              <button className="addBtn" style={{backgroundColor:"black",cursor:"auto",opacity:"0.7"}} disabled onClick={()=>console.log("hello")}>{localStorage.getItem("user")}</button>
              <br />
              <br />
              <button className="addBtn" onClick={()=>setDbl(true)}>Add pin</button>
              <br />
              <br />
              <button className="logoutBtn" onClick={logout}>Logout</button>
            </div>
          )}
          {!login &&(
            <div>
              <button className="loginBtn" onClick={()=>setLogintrue(true)}>Login</button>
              <br />
              <br />
              <button className="regBtn" onClick={()=>setRegtrue(true)}>Register</button>
            </div>
          )}
        </div>
        {regTrue && <Signup setRegtrue={setRegtrue} />}
        {loginTrue && <Signin setLogintrue={setLogintrue} />}

            <GeolocateControl  trackUserLocation= {true}/>

      </Map>
    </div>
  );
};

export default Mapping;
