<template>
   <div v-if="loading"> loading... </div>

   <div v-else>
      <div v-for="product in data">
         <div class="product-wrapper">

            <img :src="product.images[0]" :alt="product.title" class="product-wrapper__image" />

            <div class="product-wrapper__details">
               <h2 class="product-wrapper__title">
                  {{ product.title }}
               </h2>

               <p class="product-wrapper__description">
                  {{ product.description }}
               </p>

               <p class="product-wrapper__stock">
                  Total items in stock: {{ product.stock }}
               </p>

               <p class="product-wrapper__price">
                  This product cost: {{ product.price }}.-
               </p>

               <button class="product-wrapper__add" @click="addToCart">
                  Add this product to cart
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         data: [],
         error: false,
         loading: true,
      };
   },

   created() {
      this.fetchProducts();
   },

   methods: {
      async fetchProducts() {
         const url = "https://dummyjson.com/products";
         const response = await fetch(url);
         try {
            await this.handleResponse(response);
         } catch (error) {
            this.error = error.message;
         }

         const changeUrl = this.data.filter((item) => {
            return item.title.includes(this.$route.params.id);
         });

         this.data = changeUrl;
      },

      async handleResponse(response) {
         if (response.status >= 200 && response.status < 300) {
            // fetch api data into json
            const { products } = await response.json();
            this.data = products;
            this.loading = false;
         } else {
            if (response.status === 404) {
               throw new Error("Fail Fetching with this URL!");
            }
            if (response.status === 401) {
               throw new Error("Not Authorized!!");
            }
            if (response.status > 500) {
               throw new Error("Server not Found");
            }
         }
      },

      addToCart(product) {
         this.$store.commit("addProductToCart", product);
      }
   },
};
</script>

<style>
.product-wrapper {
   width: 100vw;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
}

.product-wrapper__image {
   display: flex;
   margin-left: 50px;
}

.product-wrapper__details {
   padding: 20px;
   width: 60%;
   display: flex;
   flex-direction: column;
   justify-content: center;
}

.product-wrapper__title {
   font-size: 40px;
   display: flex;
   justify-content: center;
}

.product-wrapper__description {
   padding: 20px;
   display: flex;
   justify-content: center;
}

.product-wrapper__stock {
   padding: 20px;
   display: flex;
   justify-content: center;
}

.product-wrapper__price {
   padding: 20px;
   display: flex;
   justify-content: center;
}

.product-wrapper__add {
   padding: 20px;
   margin: auto;
}
</style>
