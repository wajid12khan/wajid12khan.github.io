import Home from './views/Home.vue';
import Product from './views/Product.vue';

export default [
      { name: 'product', path: '/product/:id',              component:  Product},
      { name: 'home',    path: '/',                         component:  Home},
]
