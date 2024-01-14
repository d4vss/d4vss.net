<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from 'astro-icon/components';

const github_response_repos = ref([]);
const forza_mods_website_repo = ref([]);

onMounted(async () => {
    const responseRepos = await fetch('https://api.github.com/users/d4vss/repos');
        github_response_repos.value = await responseRepos.json();

        const responseForzaModsWebsite = await fetch('https://api.github.com/repos/ForzaMods/Website');
        forza_mods_website_repo.value = await responseForzaModsWebsite.json();
})
</script>

<template>
    <div class="grid grid-cols-1 auto-rows-auto gap-5">
        <div v-for="project in github_response_repos" class="p-0.5 bg-white/60 rounded">
            <div class="bg-black px-4 py-7">
                <div class="flex justify-between">
                    <span class="flex font-semibold border-2">
                        <Icon name="iconoir:repository" class="w-7 h-7 mr-2"/>
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
    </div>
</template>
