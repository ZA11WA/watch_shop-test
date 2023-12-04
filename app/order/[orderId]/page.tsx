import { Container } from "@mui/material";
import OrderDetails from "./OrderDetails";



import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IPrams{
    orderId?: string
}


const Order = async ({params} : {params: IPrams}) => {

    const order = await getOrderById(params)
    console.log('params', params)

    if (!order) return <NullData title="No order"></NullData>
    return ( 
        <div className="p-2">
            
               <OrderDetails order = {order}/> 
              
            
        </div>
     );
}
 
export default Order;