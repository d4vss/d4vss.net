<template>
    <main ref="main">
        <h1 class="panton shadow title">
            404 - Page not found
        </h1>
        <RouterLink class="return" to="/">
            Return to home.
        </RouterLink>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { gsap } from 'gsap';

const main = ref(null);

onMounted(() => {
    gsap.from(main.value.children, {
        duration: 1,
        y: -25,
        opacity: 0,
        stagger: 0.35,
        ease: 'Power4.easeOut',
    });
});
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 50vh;
}

.title {
    text-align: center;
    text-transform: uppercase;
}
</style>