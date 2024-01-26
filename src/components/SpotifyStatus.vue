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
            currentTimestamp.value = `${Math.floor(elapsedSeconds / 60)}:${String(elapsedSeconds % 60).padStart(2, '0')}`;
            
            const totalDurationMinutes = Math.floor(totalSeconds / 60);
            const totalDurationSeconds = totalSeconds % 60;
            finishedTimestamp.value = `${totalDurationMinutes}:${String(totalDurationSeconds).padStart(2, '0')}`;
        } else {
            fetchData();
        }
    }
};

onMounted(() => {
    fetchData();
    updateProgress();
    setInterval(updateProgress, 1000 * 0.5);
    setInterval(fetchData, 1000 * 60);
});
</script>

<template>
    <div v-if="spotifyInfo" id="player" class="flex justify-between gap-5 opacity-0 transition duration-300 delay-300 border-2 border-solid border-white/60 drop-shadow-[0_15px_35px_rgba(100,100,100,0.7)] mt-8 p-0 rounded-[0.0625rem] lg:w-[420px] lg:mt-5 px-5 py-4">
        <div class="flex flex-col justify-around w-full">
            <h5 class="text-lg block mt-4">{{ spotifyInfo.song }}<span class="text-xs font-semibold ml-1">by {{ spotifyInfo.artist }}</span></h5>
            <div class="flex items-center justify-between mt-4 w-full">
                <span class="mr-2">{{ currentTimestamp }}</span>
                <div class="bg-white/20 bottom-0 w-full rounded-xl h-1 p-0 m-0">
                    <div ref="progress" class="h-full bg-white rounded-xl"></div>
                </div>
                <span class="ml-2">{{ finishedTimestamp }}</span>
            </div>
        </div>
        <img class="w-24 h-24 shadow-2xl" :src="spotifyInfo.album_art_url" alt="">
    </div>
</template>