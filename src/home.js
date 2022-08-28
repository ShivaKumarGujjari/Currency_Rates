import React, { useCallback, useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Registration from './registration.js';

const base_url = 'https://api.getgeoapi.com/v2/currency';
const access_key = '67d37acac79eeaf84bc99992f14b9eb31c055492';
const Home = (props) => {
    const [options, setOptions] = useState([]);
    const [base, setBase] = useState('');
    const [logout, setLogout] = useState(false);
    const [amount,setAmount] = useState(1);
    const [target, setTarget] = useState('');
    const [show, setShow] = useState(false);
    const [showres, setShowres] = useState(false);
    const [showb, setShowb] = useState(false);

    useEffect(() => {
        fetch(`${base_url}/list?api_key=${access_key}`)
            .then(res => res.json())
            .then(data => {
                setOptions([]);
                Object.keys(data.currencies).forEach(key => {
                    setOptions(prevOptions => [...prevOptions, `${data.currencies[key]}(${key})`])
                })
            })
    }, [])

    useEffect(() => {
        const bcontainer = document.querySelector("#baselist");

        options.forEach(ele => {
            const childnode = document.createElement("div");
            const textnode = document.createTextNode(ele);
            childnode.appendChild(textnode);
            childnode.addEventListener('click', function () { handleBase(ele) });
            bcontainer.appendChild(childnode);
        });
        const tcontainer = document.querySelector("#targetlist");

        options.forEach(element => {
            const childnode = document.createElement("div");
            const textnode = document.createTextNode(element);
            childnode.appendChild(textnode);
            childnode.addEventListener('click', function () { handleTarget(element) });
            tcontainer.appendChild(childnode);
        });
    }, [options])

    const handleBase = useCallback((e) => {
        setBase(e);
        document.querySelector("#btextcontent").innerText = e;
    }, []);

    const handleTarget = useCallback((e) => {
        setTarget(e);
        document.querySelector("#textcontent").innerText = e;
    }, []);

    const handleRates = () => {
        var to = target.slice(-4).slice(0,3);
        fetch(`${base_url}/convert?api_key=${access_key}&from=${base.slice(-4).slice(0, 3)}&to=${to}&amount=${amount}`)
            .then(res => res.json())
            .then(data => { 
                console.log(data); 
                document.getElementById("examt").innerText = data.rates[to].rate_for_amount;
                document.getElementById("exr").innerText = data.rates[to].rate;
                setShowres(true);
            })
    }

    return (
        logout ? (<Registration />) : (
        <>
        <div id="header"><h1>Welcome {props.details.name}!!</h1></div>
        <div className="container">
            <div id="inputgroup">
                <div className="inputfield">
                    <h2>Base currency:</h2>
                    <div className="listgroup">
                        <div id="baseinput" onClick={() => { setShow(false); setShowb(!showb); }}>
                            <div id="btextcontent">Select</div>
                            <div className="arrow" ><FaAngleDown /></div>
                        </div>
                        <div id="baselist" className={showb ? "" : "hide"}>
                        </div>
                    </div>
                </div>
                <div className="inputfield">
                    <h2>Target Currency:</h2>
                    <div className="listgroup">
                        <div id="targetinput" onClick={() => { setShowb(false); setShow(!show); }}>
                            <div id="textcontent">Select</div>
                            <div className="arrow" ><FaAngleDown /></div>
                        </div>
                        <div id="targetlist" className={show ? "" : "hide"}>
                        </div>
                    </div>
                </div>
                <div className="inputfield">
                    <h2>Amount:</h2>
                    <input type="number" id="amount" onChange={(e)=>{setAmount(e.target.value); setShow(false); setShowb(false); }}/>
                </div>
            </div>
            <div className="button" onClick={handleRates}><p>Convert</p></div>
            <table className={showres ? "" : "hide"}>
                <thead>
                    <tr>
                        <th>Base Currency</th>
                        <th>Target Currency</th>
                        <th>Amount</th>
                        <th>Exchange Rate</th>
                        <th>Converted amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{base}</td>
                        <td>{target}</td>
                        <td>{amount}</td>
                        <td id="exr"></td>
                        <td id="examt"></td>
                    </tr>
                </tbody>
            </table>
            <div className="logout" onClick={()=>setLogout(!logout)}><p>Log out</p></div>
        </div>
        </>)
    );
}

export default Home