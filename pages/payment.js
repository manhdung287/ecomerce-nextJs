import React, { useContext } from 'react'
import { DataContext } from '../store/GlobaState';

function Payment(){
    const[state,dispath] = useContext(DataContext);
    const{cart} = state;

    return(
        <div className="payment">
            PayMent
            {cart.map((item)=><p key={item._id}>
                {item.title}
            </p>)}
        </div>
    );
}
export default Payment;