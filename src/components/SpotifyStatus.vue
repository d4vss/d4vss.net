<script setup>
import { ref, onMounted } from "vue";

const apiUrl = 'https://api.lanyard.rest/v1/users/627448648833171457';
const spotifyInfo = ref(null);
const progress = ref(null);
const currentTimestamp = ref(null);
const finishedTimestamp = ref(null);

const fetchData = async () => {
    try {
        const { success, data } = await (await fetch(apiUrl)).json();
        if (success && data && data.spotify) {
            const { track_id, album, album_art_url, artist, song, timestamps } = data.spotify;
            spotifyInfo.value = { track_id, album, album_art_url, artist, song, ...timestamps };
            setTimeout(() => document.getElementById('player').style.opacity = '1', 10);
        }
    } catch (error) {}

};

const updateProgress = () => {
    const { start, end } = spotifyInfo.value || {};
    if (progress.value && start !== undefined && end !== undefined) {
        const currentTime = new Date().getTime();
        const elapsedSeconds = Math.floor((currentTime - start) / 1000);
        const totalSeconds = Math.floor((end - start) / 1000);

        if (elapsedSeconds <= totalSeconds) {
            const percentage = (elapsedSeconds / totalSeconds) * 100;
            progress.value.style.width = `${percentage}%`;
            currentTimestamp.value.innerHTML = `${Math.floor(elapsedSeconds / 60)}:${String(elapsedSeconds % 60).padStart(2, '0')}`;
            
            const totalDurationMinutes = Math.floor(totalSeconds / 60);
            const totalDurationSeconds = totalSeconds % 60;
            finishedTimestamp.value.innerHTML = `${totalDurationMinutes}:${String(totalDurationSeconds).padStart(2, '0')}`;
        } else {
            fetchData();
        }
    }
};

onMounted(() => {
    fetchData();
    updateProgress();
    setInterval(updateProgress, 1000 * 0.9);
    setInterval(fetchData, 1000 * 60);
});
</script>

<template>
    <div v-if="spotifyInfo" id="player" class="opacity-0 transition duration-300 delay-300 bg-white/80 drop-shadow-[0_15px_35px_rgba(100,100,100,0.7)] mt-32 p-0 rounded-sm lg:w-[400px] lg:mt-5">
        <div class="px-4 py-2">
            <img class="w-24 h-24 float-start -mt-14 top-0 left-1/2 -translate-x-1/2 absolute shadow-2xl" :src="spotifyInfo.album_art_url" alt="">
            <h5 class="text-black text-lg m-0 mt-10 block">{{ spotifyInfo.song }}<span class="text-xs font-semibold ml-1">by {{ spotifyInfo.artist }}</span></h5>
        </div>
        <div class="flex items-center justify-between text-black mb-4">
            <span class="mx-4" ref="currentTimestamp"></span>
            <div class="bg-black/20 bottom-0 w-full rounded-lg h-1 p-0 m-0">
                <div ref="progress" class="h-full bg-black"></div>
            </div>
            <span class="mx-4" ref="finishedTimestamp"></span>
        </div>
    </div>
</template>