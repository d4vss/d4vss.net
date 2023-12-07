<template>
    <nav>
        <RouterLink to="/">
            <img class="logo" src="/logo.gif">
        </RouterLink>

        <div class="panton links">
            <RouterLink to="/projects">
                Projects
            </RouterLink>
        </div>
    </nav>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { gsap } from 'gsap';

onMounted(() => {
    gsap.from('a', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: 'Power4.easeOut',
    });
});
</script>

<style scoped>
Nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0rem;
}

.logo {
    height: 67.5px;
}

.links {
    display: flex;
    margin-left: 1rem;
}

@media (max-width: 768px) {
    Nav {
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
}
</style>