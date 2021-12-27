import React, {createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './listStyles.css'

function Homepage(){
    const [data, setdata] = useState()
    const [cart, setcart] = useState([])
    const [sortType, setSortType] = useState("Categories")

    function setType(element){
        setSortType(element)
    }

    function cartChange(element){
        let found = cart.find(el => element.id === el.id)
        if(found){
            let array = cart
            var index = array.findIndex(function(o){
                return o.id === element.id;
            })
            if (index !== -1) array.splice(index, 1)
            setcart([...array])
            return
        }
        let array = cart
        let newElement = element
        newElement.quantity = 1
        array.push(newElement)
        setcart([...array])
    }

    function checkInCartList(element){
        let found = cart.find(el => element.id === el.id)
        if(found){
            return true
        }
        return false
    }

    useEffect(() => {
        async function request() {

            await fetch('http://localhost:3001/api/products')
                .then(response => response.json())
                .then(data => setdata(data));

        }
        request()
        var storedCart = JSON.parse(localStorage.getItem("cart"));
        setcart([...storedCart])
    }, [])

    useEffect(() => {
        if(sortType === "Categories"){
            async function request() {

                await fetch('http://localhost:3001/api/products')
                    .then(response => response.json())
                    .then(data => setdata(data));
    
            }
            request()
        }
        if(sortType === "Asscendent"){
            let array = data
            array.sort((a, b) => a.price - b.price);
            setdata([...array])
        }
        if(sortType === "Desscendent"){
            let array = data
            array.sort((a, b) => b.price - a.price);
            setdata([...array])
        }
    }, [sortType])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    return(
            <section className='listsContainer'>
                <Link to="/cart">Go to cart</Link>
                <div className='productsContainer'>
                    <table className='productsList'>
                        <tr ><td style={{cursor: 'pointer'}} onClick={() => setType("Categories")}>Category:</td><td>Name:</td><td onClick={() => {if(sortType !== "Asscendent"){setSortType("Asscendent")} else{setSortType("Desscendent")}}} style={{cursor: 'pointer'}}>Price: </td><td>Action: </td>  </tr>
                        {data && data.map((element) => {return <tr key={element.id}><td>{element.category.name}</td><td>{element.name}</td><td>{element.price} </td><td><button onClick={() =>cartChange(element)} >{checkInCartList(element)? "Remove from cart" : "Add to cart"} </button></td>  </tr> })}
                    </table>
                </div>
            </section>
    )
}
export default Homepage;