<template>
    <main ref="main">
        <h1 class="panton shadow" style="margin-bottom: 5rem;">Projects</h1>

        <div class="projects" ref="projectss">
            <div class="project" v-for="project in projects" :key="project.id">
                <div class="top">
                    <h3 class="panton shadow">{{ project.name }}</h3>
                    <a class="link panton shadow" target=_blank :href="project.html_url">
                        View
                    </a>
                </div>
                <p>{{ project.description }}</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { gsap } from 'gsap';

const payload = ref([]);

onMounted(async () => {
    const response = await fetch('https://api.github.com/users/d4vss/repos');
    payload.value = await response.json();
});

const projects = computed(() => {
    return payload.value
        .filter((project) => !project.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
});

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