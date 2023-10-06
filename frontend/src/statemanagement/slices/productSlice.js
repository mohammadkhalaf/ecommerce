import { BASE_URL, PRODUCTS_URL } from '../../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
     getProductDetails: builder.query({
      query: (id) => ({
        url:`${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
  

  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery
} = productsApiSlice;