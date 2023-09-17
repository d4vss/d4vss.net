<template>
    <main ref="main">
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