<template>
   <header class="header">
      <RouterLink :to="{ name: 'home' }" class="header__title">
         Optimus Algo  developed by Developer Wajid ul haq
      </RouterLink>
      
      <span class="header__cart">
         {{ totalCount }}
         <Icons :icon="'cart'" class="header__menu" /> 
      </span>
   </header>
</template>

<script>
import Icons from "../components/Icons.vue";

export default {
   components: {
      Icons,
   },

   methods: {
      toggleDetails() {
         this.menuBar = !this.menuBar;
      },
   },

   computed: {
      totalCount() {
         return this.$store.getters.getItemCount;
      }
   }
};
</script>

<style>
.header {
   border-bottom: 2px solid gainsboro;
   width: 100vw;
   display: flex;
   justify-content: space-between;
}

.header__title {
   font-size: 28px;
   padding: 20px;
   margin-left: 50px;
   text-decoration: none;
   color: black;
   font-style: italic;
}

.header__cart {
   padding: 20px;
}

</style>
