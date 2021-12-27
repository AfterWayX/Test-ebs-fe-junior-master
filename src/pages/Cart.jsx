import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './listStyles.css'


function Cart(){
    const [cart, setcart] = useState()
    useEffect(() => {
        var storedCart = JSON.parse(localStorage.getItem("cart"));
        setcart([...storedCart])
    }, [])

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

    function addQuantity(element){
        let found = cart.find(el => element.id === el.id)
        if(found) {
            let array = cart.map((el) => {
                if(el.id === element.id){
                    el.quantity = el.quantity + 1
                    return el;
                }
                return el;
            }
            )
            localStorage.setItem("cart", JSON.stringify(array));
            setcart([...array])
        }
    }

    function removeQuantity(element){
        let found = cart.find(el => element.id === el.id)
        if(found) {
            let array = cart.map((el) => {
                if(el.id === element.id){
                    if(element.quantity - 1 === 0){
                        return el;
                    } else {
                        el.quantity = el.quantity - 1
                    }
                    return el;
                }
                return el;
            }
            )
            localStorage.setItem("cart", JSON.stringify(array));
            setcart([...array])
        }
    }

    return(
        <section className='listsContainer'>
            <Link to="/">Go to Homepage</Link>
            <div className='productsContainer'>
            <table className='productsList'>
                <tr ><td>Category:</td><td>Name:</td><td>Quantity: </td><td>Price: </td><td>Action: </td>  </tr>
                {cart? cart.map((element) => {return <tr key={element.id}><td>{element.category.name}</td><td>{element.name}</td><td>{element.quantity}</td><td>{element.price} </td><td><p onClick={() =>removeQuantity(element)} style={{cursor: 'pointer', marginRight: '5px', marginTop: 'auto', marginBottom: 'auto'}}>[-]</p><button onClick={() =>cartChange(element)} >Remove from cart</button><p onClick={() =>addQuantity(element)} style={{cursor: 'pointer', marginLeft: '5px', marginTop: 'auto', marginBottom: 'auto'}}>[+]</p></td> </tr>}) : null}
            </table>
                </div>
            
        </section>
    )
}

export default Cart;