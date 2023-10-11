import { apiSlice } from "./apiSlice";
import { ORDERS_URL,PAYPAL_URL } from "../../constants";
console.log(`${ORDERS_URL}/myorder`);
export const orderApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(order)=>({
                url:ORDERS_URL,
                method:'POST',
                body:{...order}
            })
        }),
        getOrderDetails:(builder).query({
            query:(orderId)=>({
                url:`${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor:5       
        }),
        payOrder:builder.mutation({
            query:({orderId,details})=>({
                url:`${ORDERS_URL}/${orderId}/pay`,
                method:'PUT',
                body:{...details}
            }), 
        }),
        getPaypalClientId:builder.query({
            query:()=>({
                url:PAYPAL_URL
            }),
            keepUnusedDataFor:5 
        }),
        deliverOrder:builder.mutation({
             query: (orderId) => ({
           url: `${ORDERS_URL}/${orderId}/deliver`,
           method: 'PUT',
      }),
        getMyOrders: builder.query({
        query: () => ({
            url: `${ORDERS_URL}/mine`,
        }),
        keepUnusedDataFor: 5,
        }),
        }),
        getMyOrders:builder.query({
              query: () => ({
          url: `${ORDERS_URL}/myorder`,
      }),
         keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
        query: () => ({
            url: ORDERS_URL,
        }),
        keepUnusedDataFor: 5,
         }),
         
        
    })
})
export const { useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery

}=orderApiSlice