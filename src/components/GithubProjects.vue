<script setup>
import { ref, onMounted } from "vue";

const github_response_repos = ref([]);
const forza_mods_website_repo = ref([]);

onMounted(async () => {
    github_response_repos.value = await fetch('https://api.github.com/users/d4vss/repos').then(async (response) => await response.json());
    forza_mods_website_repo.value = await fetch('https://api.github.com/repos/ForzaMods/Website').then(async (response) => await response.json());
    document.getElementById('projects').style.opacity = '1';
})
</script>

<template>
    <div id="projects" class="grid grid-cols-1 auto-rows-auto gap-5 opacity-0 duration-300 delay-300">
        <div v-for="project in github_response_repos" class="p-0.5 bg-white/60 rounded">
            <div class="bg-black px-4 py-7">
                <div class="flex justify-between">
                    <span class="flex items-center font-semibold border-2">
                        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7a.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>
                        <a :href="project.html_url" target="_blank" class="underline">{{ project.full_name }}</a>
                    </span>
                    <div v-if="project.language" class="flex justify-start items-center gap-2 font-semibold">
                        <div :class="`h-3 w-3 rounded-full ${project.language}`" ></div>
                        <span>{{ project.language }}</span>
                    </div>
                </div>
                <p v-if="project.description" class="my-4">{{ project.description }}</p>
            </div>
        </div>
        <div class="p-0.5 bg-white/60 rounded">
            <div class="bg-black px-4 py-7">
                <div class="flex justify-between">
                    <span class="flex items-center font-semibold border-2">
                        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7a.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>
                        <a :href="forza_mods_website_repo.html_url" target="_blank" class="underline">{{ forza_mods_website_repo.full_name }}</a>
                    </span>
                    <div v-if="forza_mods_website_repo.language" class="flex justify-start items-center gap-2 font-semibold">
                        <div :class="`h-3 w-3 rounded-full ${forza_mods_website_repo.language}`" ></div>
                        <span>{{ forza_mods_website_repo.language }}</span>
                    </div>
                </div>
                <p v-if="forza_mods_website_repo.description" class="my-4">{{ forza_mods_website_repo.description }}</p>
            </div>
        </div>
    </div>
</template>
