// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getProducts } from '../../Server/Api';
// import axios from 'axios';
// export const fetchProduct = createAsyncThunk(
//   'product/fetchProduct',
//   async (productId) => {
//     const products = await getProducts();
//     const foundProduct = products.find((p) => p._id === productId);
//     if (foundProduct) {
//       return foundProduct;
//     } else {
//       throw new Error('Product not found');
//     }
//   }
// );


// // export const fetchProduct = createAsyncThunk(
// //     'product/fetchProduct',
// //     async (productId) => {
// //       try {
// //         // Fetch products from the API
// //         const response = await axios.get(' https://hari-hara.onrender.com/get/products');
// //         const products = response.data.activeProducts;
// //         const foundProduct = products.find((p) => p._id === productId);
    
// //         if (foundProduct) {
// //           // Return the found product if it exists
        
// //           return foundProduct;
// //         } else {
// //           // Throw an error if the product is not found
// //           throw new Error('Product not found');
// //         }
// //       } catch (error) {
// //         // Handle any errors that occur during the API request
// //         console.error('Error fetching product:', error);
// //         throw error;
// //       }
// //     }
// //   );

// const productSlice = createSlice({
//   name: 'product',
//   initialState: {
//     product: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.product = action.payload;
//       })
//       .addCase(fetchProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productSlice.reducer;
// export const { } = productSlice.actions;
