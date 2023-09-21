<template>
  <main>
    <header>
      <Navbar />
    </header>
    <main>
      <RouterView />
    </main>
  </main>

  <Footer />
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

import { RouterView } from 'vue-router';

</script>

<style scoped>
content {
  padding-bottom: 5rem;    
}
</style>