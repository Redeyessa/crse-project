import  Course from './Course.jsx'

import { useEffect, useState } from 'react'
import './courselist.css'
function CourseList() {
    
    const [cartItems, setCartItems] = useState([]); 
    const [isCartOpen, setIsCartOpen] = useState(false);
   const[courseing,setcourse]  =  useState([]);
   const [searchallcourse,searchAllcourse] = useState([]);
   const [err,seterr] = useState(null)
   useEffect(() => {

        fetch('http://localhost:8080/courses').then(res=>res.json()).then(json=>{
            setcourse(json) ;
            searchAllcourse(json);
            
        }).catch(error => {
            console.log(error.message);
            seterr(error);
        
        })
   },[]);
   
    // function DeleteCourse(id){
    //   const filteredCourses = courseing.filter((course) => course.id !== id);
    //  setcourse ([...filteredCourses]);
    // }
  
    function lowtohigh(){
        const sortedCourses = courseing.sort((a,b) => a.price - b.price);
        setcourse([...sortedCourses]);
    }
    function hightolow(){
       const sortedCourses = courseing.sort((a,b) => b.price - a.price);
       setcourse([...sortedCourses]);
    }
    
     function searchCourse(event){
        const searchText = event.target.value.toLowerCase();
        const filteredCourses = searchallcourse.filter((course) =>
            course.name.toLowerCase().includes(searchText));
            
                setcourse([...filteredCourses]);
                

    }


      const addToCart = (course) => {
        
        setCartItems([...cartItems, course]);
       
        
        
    };
   
   
    return (<>
    <div className="header">
        <input type="radio" name='price' onChange={lowtohigh} /> low to high
        <input type="radio" name='price' onChange={hightolow} /> high to low
        <h1 className='heading'>Course Enrollment App</h1> 
        <input type="text" placeholder="Search Course" onChange={searchCourse} className='search-input'/>
        <div className="cart-icon-container" onClick={() => setIsCartOpen(true)}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="cart" height={50} width={50} />
                    <span className="cart-count">{cartItems.length}</span>
        </div>
    </div>
           <div>

           </div>

            <div className={`side-cart ${isCartOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? <p>Cart is empty</p> : (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} width={50} alt={item.name} />
                            <pre>{item.name} -  ${item.price -(item.price / 100 * 20)} discount 20%</pre>
                        </div>
                    ))
                )}
                <hr />
               
                <h3>Total: ${cartItems.reduce((a, b) => a + Number(b.price), 0) /100 * 80}</h3>
                
            </div>
    {courseing.map((course,index) =>
        <Course key = {index} name={course.name} image={course.image} price={"$" + course.price} show={course.show}  onEnroll={() => addToCart(course)}/>)}

    </>);
  
    
}
export default CourseList
