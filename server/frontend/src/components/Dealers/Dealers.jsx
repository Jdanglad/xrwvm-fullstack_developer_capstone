import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import "../assets/bootstrap.min.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  let [states, setStates] = useState([])

  // let root_url = window.location.origin
  let dealer_url ="/djangoapp/get_dealers";
  
  let dealer_url_by_state = "/djangoapp/get_dealers/";
 
  const filterDealers = async (state) => {
    dealer_url_by_state = dealer_url_by_state+state;
    const res = await fetch(dealer_url_by_state, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let state_dealers = Array.from(retobj.dealers)
      setDealersList(state_dealers)
    }
  }

  const get_dealers = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers)
      let states = [];
      all_dealers.forEach((dealer)=>{
        states.push(dealer.state)
      });

      setStates(Array.from(new Set(states)))
      setDealersList(all_dealers)
    }
  }
  useEffect(() => {
get_dealers();
  },[]);  


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div className='background'>
      <Header/>

     <table className='table table-hover table-column'>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Dealer Name</th>
          <th scope="col">City</th>
          <th scope="col">Address</th>
          <th scope="col">Zip</th>
          <th>
          <select name="state" id="state" className='bg-light' onChange={(e) => filterDealers(e.target.value)}>
          <option value="" className='bg-light' selected disabled hidden>State</option>
          <option value="All" className='bg-light'>All States</option>
          {states.map(state => (
              <option value={state}>{state}</option>
          ))}
          </select>        
          
          </th>
          {isLoggedIn ? (
              <th>Review Dealer</th>
             ):<></>
          }
        </tr>
      </thead>
      <tbody>
     {dealersList.map(dealer => (
        <tr>
          <th scope='row'>{dealer['id']}</th>
          <td className='text-center'><a href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
          <td className='text-center'>{dealer['city']}</td>
          <td className='text-center'>{dealer['address']}</td>
          <td className='text-center'>{dealer['zip']}</td>
          <td className='text-center'>{dealer['state']}</td>
          {isLoggedIn ? (
            <td className='text-center'><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review"/></a></td>
           ):<></>
          }
        </tr>
      ))}
      </tbody>
     </table>;
  </div>
)
}

export default Dealers
