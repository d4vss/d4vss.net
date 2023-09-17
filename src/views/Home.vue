<template>
  <span class="gradient-bg"></span>
  <main ref="main">
    <h1 class="panton shadow">Hi, I'm d4vss.</h1>
    <h2 class="panton" style="margin-top: 7.5rem;">About me</h2>
    <p class="desc" style="margin-block: 1.5rem 2rem;">I'm a 16-year-old with a passion for programming, especially in Python. Currently, I'm attending a higher technical college department focused on IT. I'm eager to expand my horizons by exploring languages like JavaScript and C#.</p>
    
    <RouterLink class="link panton shadow" to="/about">
      Read More!
    </RouterLink>
    <div>
      <h2 class="panton" style="margin-block: 7.5rem 2rem;">My Projects</h2>

      <div class="projects">
            <div class="project" v-for="project in projects" :key="project.id">
                <div class="top">
                    <h3 class="panton shadow">{{ project.name }}</h3>
                    <RouterLink class="link panton shadow" :href="project.html_url">
                        View
                    </RouterLink>
                </div>
                <p>{{ project.description }}</p>
            </div>
        </div>
    </div>

    <RouterLink class="link panton shadow" to="/projects">
      View All Projects
    </RouterLink>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
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

</script>

<style scoped>
.pfp {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}

.desc {
  max-width: 50%;
}

@media (max-width: 768px) {
  .desc {
    max-width: 100%;
  }
}
</style>