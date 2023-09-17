<template>
    <main>
        <div class="container" ref="footer">
            <p class="panton left">Made by d4vss.</p>
            <div class="links">
                <RouterLink class="panton shadow" to="/">
                    Home
                </RouterLink>
                <RouterLink class="panton shadow" to="/about">
                    About
                </RouterLink>
                <RouterLink class="panton shadow" to="/projects">
                    Projects
                </RouterLink>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const footer = ref(null);

onMounted(() => {
    gsap.from(footer.value, {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'Power4.easeOut',
    });
});

</script>

<style scoped>

main {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;            
}
.left {
    padding: 0;
    margin: 0;
}
.container {
    margin-top: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
}
</style>