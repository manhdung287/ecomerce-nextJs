import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../store/GlobaState";
import { getData } from "../../../untils/fetchData";

function AdminProduct() {
  const [state, dispath] = useContext(DataContext);
  const {auth} = state;
  const [data,setData] = useState();
  if(!auth.user) return null;
    useEffect(()=>{
        const loadData = async()=>{
            const data = await getData('product');
            setData(data)
        };
        loadData();
    },[data]);
    console.log(data);
  return <div>AdminProduct</div>;
}
export default AdminProduct;
