<template>
  <content>
    <Header>
      <Navbar />
    </Header>
    <main>
      <RouterView />
    </main>
  </content>

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