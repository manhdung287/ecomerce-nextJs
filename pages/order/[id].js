import { useRouter } from "next/router";
import React, { useContext } from "react";
import Button from "../../components/Button";
import ProductOrder from "../../components/Order/ProductOrder";
import TextPrice from "../../components/TextPrice";
import { UpdateItem } from "../../store/Actions";
import { DataContext } from "../../store/GlobaState";
import { getData, patchData } from "../../untils/fetchData";
import { DateTimeFormat } from "../../untils/Timeformat";

function OrderDetail(props) {
  const [state, dispath] = useContext(DataContext);
  const { auth, orders } = state;

  if (!props.order) return null;

  const router = useRouter();

  const { order } = props;

  const goback = () => {
    router.back();
  };

  const onPayment = () => {
    patchData(`order/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });
      dispath(
        UpdateItem(
          orders,
          order._id,
          { ...order, paid: true, dayPayment: new Date().toISOString() },
          "ADD_ORDER"
        )
      );
      return dispath({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const onDelived = () => {
    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });
      dispath(
        UpdateItem(
          orders,
          order._id,
          { ...order, delivered: true },
          "ADD_ORDER"
        )
      );
      dispath({type:"NOTIFY",payload:{success:res.msg}})
    });
  };
  console.log(props.order);
  return (
    <div>
      <Button onClick={goback} text="Back" />
      <p>{DateTimeFormat(order.createdAt)}</p>
      <TextPrice value={order.total} />
      <div className="notifi">
        Paid: {order.paid ? "true" : "false"}
        {order.product.map((item) => (
          <ProductOrder data={item} key={item._id} />
        ))}
      </div>
      <Button text="Payment" onClick={onPayment} />
      <Button text="Delived" onClick={onDelived} />
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const data = await getData(`order/${id}`);
  return {
    props: {
      order: data.order,
    },
  };
}

export default OrderDetail;
