import React,{useState} from 'react';
import Home from './home';

const Registration = () => {
    const [details, setDetails]=useState({name:"",email:"",password:""});
    const [login, setLogin] = useState(false);
    const [exist, setExist] = useState(true);

    const handleSignup = () => {
        const e1=document.querySelector("#e1");
        const e2=document.querySelector("#e2");
        const e3=document.querySelector("#e3");
        e1.innerHTML="";
        e2.innerHTML="";
        e3.innerHTML="";
        var regx=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,10})$/;
        if(!regx.test(details.email)){ e1.innerHTML="*Enter a valid email Id*"}
        else if(details.name.length==0){ e2.innerHTML="*Enter a valid username*"}
        else if(details.password.length<8){ e3.innerHTML="*Password must be atleast 8 characters long*"}
        else if(JSON.parse(localStorage.getItem(details.email))){alert("This email Id has an account. Please use a different email Id");}
        else{
            localStorage.setItem(details.name,JSON.stringify(details));
            console.log(JSON.parse(localStorage.getItem(details.name))); 
            // console.log(details);
            setLogin(!login);
        }
    }

    const handleLogin = () => {
        const check=JSON.parse(localStorage.getItem(details.name));
        if(!check){ alert("Username doesn't exist"); }
        else if(check.password!=details.password){ alert("Incorrect password"); }
        else{ setLogin(!login); }
    }

    return(
        login ? 
        (<Home details={details}/>) : (
        <div id="regform">
            <div className={exist ? "hide" : "regfield"}>
                <label>Email Id:</label>
                <input id="i1" autoFocus placeholder='Example@gmail.com' onClick={()=>{document.getElementById("e1").innerHTML="";}} onChange={e=>setDetails({...details, email:e.target.value})}/>
                <p className="error" id="e1"></p>
            </div>
            <div className="regfield">
                <label>Username:</label>
                <input id="i2" placeholder='Enter Username' onClick={()=>{document.getElementById("e2").innerHTML=""}} onChange={e=>setDetails({...details, name:e.target.value})}/>
                <p className="error" id="e2"></p>
            </div>
            <div className="regfield">
                <label>Password:</label>
                <input id="i3" placeholder='Enter Password' onClick={()=>{document.getElementById("e3").innerHTML=""}} onChange={e=>setDetails({...details, password:e.target.value})}/>
                <p className="error" id="e3"></p>
            </div>
            <div className={exist? "hide" : "button"}><p onClick={handleSignup}>Sign up</p></div>
            <div className={exist? "button" : "hide"}><p onClick={handleLogin}>Log in</p></div>
            <p className={exist? "hide" : "alr"} onClick={()=>{setExist(!exist)}}>Already have an accout? Login</p>
            <p className={exist? "alr" : "hide"} onClick={()=>{setExist(!exist)}}>Don't have an accout? Signup</p>
        </div>
        ) 
    );
}

export default Registration