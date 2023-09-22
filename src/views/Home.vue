<template>
  <main ref="main">
    <h1 class="panton shadow">Hi, I'm d4vss.</h1>
    <h2 class="panton" style="margin-top: 5rem;">About me</h2>

    <div class="spotify" ref="spotify">
      <img ref="spotify_image">
      <p class="shadow">Listening to <a ref="song" target=_blank></a> by <span ref="artist"></span>.</p>
    </div>

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
                    <a class="link panton shadow" target=_blank :href="project.html_url">
                        View
                    </a>
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
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 4);
});

const spotify = ref(null);
const song = ref(null);
const artist = ref(null);
const spotify_image = ref(null);

async function updateSpotify() {
  const payload = await fetch('https://api.lanyard.rest/v1/users/627448648833171457');
  const payload_json = await payload.json();
  while (payload_json.data == null) {
    await new Promise(r => setTimeout(r, 1000));
  }
  
  if (payload_json.data.spotify == null) {
    spotify.value.style.display = "none";
    return;
  }
  spotify.value.style.display = "flex";
  spotify_image.value.style.display = "block";
  song.value.innerHTML = payload_json.data.spotify.song;
  song.value.href = "https://open.spotify.com/track/" + payload_json.data.spotify.track_id;
  artist.value.innerHTML = payload_json.data.spotify.artist;
  spotify_image.value.src = payload_json.data.spotify.album_art_url;
}

setInterval(updateSpotify, 30000);

updateSpotify();
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

.spotify {
  display: flex;
  align-items: center;
  margin-block: 1.5rem 2rem;
}

.spotify img {
  display: none;
  width: 2.6rem;
  height: 2.5rem;
  margin-inline: 0.5rem;
  border-radius: 50%;
  animation: infinite linear 5s spin;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spotify p {
  font-weight: 200;
}

.spotify a, span {
  font-weight: 900;
  opacity: 1;
  margin: 0;
}

.spotify a  {
  cursor: pointer;
}
</style>