<template>
    <main ref="main">
        <h1 class="panton">{{ file }} ({{ size }})</h1>
        <a :href="url" class="link">Download</a>
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

import router from '@/router';

export default {
    setup() {
        const route = useRoute();
        const file = ref(null);
        const url = ref(null);
        const size = ref(null);

        onMounted(async () => {
            const response = await fetch(`https://dl.d4vss.net/${route.params.id}/url`);
            const code = await response.status;
            if (code == 404)
                return router.push({ name: 'not-found' });
            const splitText = (await response.text()).split('/');
            file.value = splitText[splitText.length - 1];
            url.value = `https://dl.d4vss.net/${route.params.id}/download`;

            const response2 = await fetch(`https://dl.d4vss.net/${route.params.id}/size`);
            size.value = await response2.text();
        });

        return {
            file,
            url,
            size,
        }
    }
}
</script>

<style scoped>
main {
    text-align: center;
}

a {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    color: var(--color-accent);
    text-decoration: none;
    font-family: 'Panton';
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 0.2s ease;
}
</style>