import React, { useState } from "react";
function Popup(){
    const [popup,setPopup]= useState(false);
    const handleclickopen= () =>{
      setPopup(!popup)
    }
    const closepopup= () =>{
      setPopup(false);
    }
    const [data,setData]=useState({
      date:'',
    })
    const{date}=data;
    const onChange= e =>{
      setData(...data,{[e.target.name]:[e.target.value]})
    }
    const clickSubmit= e =>{
      console.log(data)
    }

    return(
        <div className="option" style={{ color: "var(--shedule)" }}>
        <div className='calendar'>
          <button onClick={handleclickopen}> <UilSchedule value="schedule"/></button>
        </div>
        {popup?
          <div className='mainpopup'>
            <div className="popup">
              <div className='popupheader'>
                <h1>DateAndTime</h1>
                <h1 onClick={closepopup}>X</h1>
              </div>
              <div>
                <input type='datetime-local' value={date} onChange={onChange}/>
                <button onClick={clickSubmit}>Submit</button>
            </div>
          </div>
         </div>:""}
        </div>
    )
}
export default Popup;
