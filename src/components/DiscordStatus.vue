<script setup>
import { ref, onMounted, computed } from "vue";

const lanyard_response = ref(null);
const avatar_url = computed(() => {
    return lanyard_response.value ? 'https://cdn.discordapp.com/avatars/627448648833171457/' + lanyard_response.value.data.discord_user.avatar : null;
});

onMounted(async () => {
    lanyard_response.value = await fetch('https://api.lanyard.rest/v1/users/627448648833171457').then(async (response) => await response.json());
});

const offline = computed(() => {
    if (lanyard_response.value === null) return false;

    return lanyard_response.value.data.discord_status === "offline";
});

const lastUpdated = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

onMounted(() => {
    document.getElementById('view').style.opacity = '1';
})
</script>

<template>
    <div id="view" class="opacity-0 duration-300 delay-300">
        <img v-if="avatar_url" :src="avatar_url" class="w-16 h-16 rounded-full">
        <div v-else class="w-16 h-16"></div>
        <h1 class="mt-2 mb-3">d4vss</h1>
        <p class="!text-white/60 flex items-center m-0 p-0">
            <span :class="'p-1.5 rounded-full inline mr-2 ' + (offline ? 'bg-neutral-600' : 'bg-green-500')"></span> {{ offline ? 'Offline' : 'Online' }} — {{ lastUpdated }}
        </p>
    </div>
</template>
