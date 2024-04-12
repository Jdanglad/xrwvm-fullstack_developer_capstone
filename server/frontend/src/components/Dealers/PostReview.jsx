import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import "../assets/bootstrap.min.css";


const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState(""); 
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let review_url = root_url+`djangoapp/add_review`;
  let carmodels_url = root_url+`djangoapp/get_cars`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (json.status === 200) {
      window.location.href = window.location.origin+"/dealer/"+id;
  }

  }
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if(dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }

  const get_cars = async ()=>{
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    get_dealer();
    get_cars();
  },[]);


  return (
    <div className='background'>
      <Header/>
      <div className='card bg-light d-flex justify-content-evenly flex-column mt-4' style={{margin:"auto", width:'60vw', marginBottom:'4%'}}>
        <h1 className='pt-3 mb-3' style={{color:"darkblue", margin:"auto"}}>{dealer.full_name}</h1>
        <div style={{width:'80%', margin:"auto"}}>
        <textarea className='mb-3 form-control' id='review' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
        </div>
        <div className='input-group mb-3' style={{width:'80%', margin:"auto"}}>
            <span className='input-group-text' id='purchase-date'>Purchase date</span>
            <input className='form-control' type="date" onChange={(e) => setDate(e.target.value)}/>
        </div>
        <div className='input-group mb-3' style={{width:'80%', margin:"auto"}} >
            <span className='input-group-text'>Car model</span> 
            <select className='form-control' name="cars" id="cars" style={{width:'70%'}} onChange={(e) => setModel(e.target.value)}>
              <option value="" selected disabled hidden>Choose car model</option>
              {carmodels.map(carmodel => (
                  <option value={carmodel.CarMake+" "+carmodel.CarModel}>{carmodel.CarMake} {carmodel.CarModel}</option>
              ))}
            </select>        
        </div>
  
        <div className='input-group mb-4' style={{width:'80%', margin:"auto"}}>
            <span className='input-group-text' id='car-year'>Car Year</span>
            <input type="text" className='form-control' placeholder='Car year' aria-aria-label='car-year-input' aria-describedby='car-year' onChange={(e) => setYear(e.target.value)} max={2023} min={2015}/>
        </div>
  
        <button className='btn text-white p-2' style={{width:'50%', backgroundColor:"#446B4A", margin:'auto', marginBottom:'0.5in'}} onClick={postreview}>Post Review</button>
      </div>
    </div>
  )
}
export default PostReview
