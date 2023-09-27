<template>
    <main ref="main">
      <h1 class="panton"><span>{{ fileName }}</span> (<span>{{ fileSize }}</span>)</h1>
      <div v-if="isImage">
        <img :src="downloadUrl" alt="Image" />
      </div>
      <div v-else-if="isVideo">
        <video controls :src="downloadUrl" width="400" height="300"></video>
      </div>
      <div v-else-if="isAudio">
        <audio controls :src="downloadUrl"></audio>
      </div>
      <a class="link" :href="downloadUrl" target="_blank">Download</a>
    </main>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const fileName = ref('');
      const fileSize = ref('');
      const downloadUrl = ref('');
  
      onMounted(async () => {
        const response = await fetch(`https://dl.d4vss.net/${route.params.id}`);
        const payload = await response.json();
  
        while (payload.fileName == null) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
  
        fileName.value = payload.fileName;
        fileSize.value = payload.fileSize;
        downloadUrl.value = payload.downloadUrl;
      });
  
      // Determine if it's an image, video, or audio based on file extension
      const isImage = computed(() => {
        const extensions = ['.png', '.jpg', '.jpeg', '.gif'];
        const fileExtension = fileName.value.split('.').pop().toLowerCase();
        return extensions.includes(`.${fileExtension}`);
      });
  
      const isVideo = computed(() => {
        const extensions = ['.mp4', '.webm', '.ogg'];
        const fileExtension = fileName.value.split('.').pop().toLowerCase();
        return extensions.includes(`.${fileExtension}`);
      });
  
      const isAudio = computed(() => {
        const extensions = ['.mp3', '.wav'];
        const fileExtension = fileName.value.split('.').pop().toLowerCase();
        return extensions.includes(`.${fileExtension}`);
      });
  
      return {
        fileName,
        fileSize,
        downloadUrl,
        isImage,
        isVideo,
        isAudio,
      };
    },
  };
  </script>
  
  <style scoped>
  main {
    text-align: center;
  }
  
  h1 {
    word-break: break-all;
  }
  
  img, video, audio {
    max-width: 100%;
    height: auto;
  }
  
  a {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    color: var(--color-accent);
    text-decoration: none;
    font-family: 'Panton';
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 0.2s ease;
  }
  </style>
  