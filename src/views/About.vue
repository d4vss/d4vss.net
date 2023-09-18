<template>
    <main ref="main">
        <h1 class="panton shadow" style="margin-bottom: 5rem;">About me</h1>

        <h2 class="panton shadow"> My skills:</h2>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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