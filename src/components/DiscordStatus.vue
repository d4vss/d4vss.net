<template>
    <div class="flex justify-between flex-col lg:flex-row">
      <div id="view" class="opacity-0 duration-300 delay-300">
        <img v-if="avatar_url" :src="avatar_url" class="w-16 h-16 rounded-full">
        <div v-else class="w-16 h-16"></div>
        <h1 class="mt-2 mb-3">d4vss</h1>
        <p class="!text-white/60 flex items-center m-0 p-0">
          <span :class="'p-1.5 rounded-full inline mr-2 ' + (offline ? 'bg-neutral-600' : 'bg-green-500')"></span> {{ offline ? 'Offline' : 'Online' }}
        </p>
      </div>
  
      <div v-if="spotifyInfo" class="flex justify-between gap-5 transition duration-300 delay-300 border-2 border-solid border-white/60 drop-shadow-[0_15px_35px_rgba(100,100,100,0.7)] mt-8 p-0 rounded-[0.0625rem] lg:w-[420px] lg:mt-5 px-5 py-4">
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
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted, computed } from "vue";
  
    const apiUrl = 'https://api.lanyard.rest/v1/users/627448648833171457';
    const lanyardData = ref(null);
    const spotifyInfo = ref(null);
    const progress = ref(null);
    const currentTimestamp = ref(null);
    const finishedTimestamp = ref(null);
  
    const fetchData = async () => {
      try {
        const { success, data } = await (await fetch(apiUrl)).json();
        if (success && data) {
          lanyardData.value = data;
          spotifyInfo.value = data.spotify;
        }
        updateProgress();
      } catch (error) {}
    };
  
    const updateProgress = () => {
      if (spotifyInfo.value === null) return 
      const { start, end } = spotifyInfo.value.timestamps || {};
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
      setInterval(fetchData, 1000 * 60);
      setInterval(updateProgress, 1000 * 0.5);
  
      (async () => {
        document.getElementById('view').style.opacity = '1';
      })();
    });
  
    const avatar_url = computed(() => lanyardData.value ? `https://cdn.discordapp.com/avatars/627448648833171457/${lanyardData.value.discord_user.avatar}` : null);
    const offline = computed(() => lanyardData.value && lanyardData.value.discord_status == "offline");
  </script>
  