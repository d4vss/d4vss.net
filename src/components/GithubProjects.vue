<script setup>
import { ref, onMounted } from "vue";

const githubRepos = ref([]);
const forzaModsRepo = ref([]);

onMounted(async () => {
    try {
        const fetchRepo = async (url, ref) => (ref.value = await (await fetch(url)).json());
        await Promise.all([
            fetchRepo('https://api.github.com/users/d4vss/repos', githubRepos),
            fetchRepo('https://api.github.com/repos/ForzaMods/Website', forzaModsRepo),
        ]);

        const projectsContainer = document.getElementById('projects');
        projectsContainer && (projectsContainer.style.opacity = '1');
    } catch (error) {}
});
</script>

<template>
    <div id="projects" class="grid grid-cols-1 auto-rows-auto gap-5 opacity-0 duration-300 delay-300">
        <div v-for="repo in githubRepos" class="p-0.5 bg-white/60 rounded">
            <div class="bg-black px-4 py-7">
                <div class="flex justify-between">
                    <a :href="repo.html_url" target="_blank" class="underline font-semibold">{{ repo.full_name }}</a>
                    <div v-if="repo.language" class="flex justify-start items-center gap-2 font-semibold">
                        <div :class="`h-3 w-3 rounded-full ${repo.language}`"></div>
                        <span>{{ repo.language }}</span>
                    </div>
                </div>
                <p v-if="repo.description" class="my-4">{{ repo.description }}</p>
            </div>
        </div>
        <div class="p-0.5 bg-white/60 rounded">
            <div class="bg-black px-4 py-7">
                <div class="flex justify-between">
                    <a :href="forzaModsRepo.html_url" target="_blank" class="underline font-semibold">{{ forzaModsRepo.full_name }}</a>
                    <div v-if="forzaModsRepo.language" class="flex justify-start items-center gap-2 font-semibold">
                        <div :class="`h-3 w-3 rounded-full ${forzaModsRepo.language}`"></div>
                        <span>{{ forzaModsRepo.language }}</span>
                    </div>
                </div>
                <p v-if="forzaModsRepo.description" class="my-4">{{ forzaModsRepo.description }}</p>
            </div>
        </div>
    </div>
</template> 