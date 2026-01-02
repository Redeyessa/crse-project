import React, {useState} from "react";


function Course(props){ 
    const[btnText, setBtnText] = useState("Enroll Now");
    const currentBtnText = props.show ? btnText : "Currently Unavailable";
       return(
            <> 
            <div className="Course">
            <h1 >{props.name}</h1>
                <img src={props.image} className="logo" height={100}></img>
                <h3>{props.price}</h3>
                <p>Welcome to {props.name}</p>
                <button onClick={() => handleEnroll(20)}   id="btn">{currentBtnText}</button>
                {/* { <button onClick={() => props.onDelete(props.id)}>Delete</button> } */}
            
            </div>
            </>
    
        ) 
    
     
    function handleEnroll(){
        
       
        if(props.show === true){
            props.onEnroll();
            setBtnText("Enrolled");
           
        }
     else{ 
            alert("This Course is Currently Unavailable")
        }}
        
}  
    


export default Course