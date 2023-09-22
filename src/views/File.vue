<template>
    <main ref="main">
        <h1 class="panton shadow">File not found. (SHAREX)</h1>
    </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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

export default {
    setup() {
        const route = useRoute();
        const file = ref(null);

        onMounted(async () => {
            
        });

        return {
            file,
        }
    }
}
</script>

<style scoped>
main {
    text-align: center;
}
</style>