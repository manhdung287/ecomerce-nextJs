import { useContext } from "react";
import { DataContext } from "../store/GlobaState";
import Loading from "./Loading";
import Toast from "./Toast";

 function Notification (){
    const [state,dispath] = useContext(DataContext);
    const {notify} = state;
    if(!notify) return null;
    return(
        <>
            {notify.loading && <Loading/>}
            {notify.waring ?<Toast value={notify.waring} type={2}/> :null}
            {notify.err ?<Toast value={notify.err} type={3}/> :null}
            {notify.success ?<Toast value={notify.success} type={1}/> :null}
        </>
    );
}
export default Notification;