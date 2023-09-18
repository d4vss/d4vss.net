<template>
    <main>
        <div class="container" ref="footer">
            <p class="panton left">Made by d4vss.</p>
            <div class="socials">
                <a class="discord" target=_blank href="https://discord.com/users/627448648833171457">
                    <img :src="image_url">
                    <span ref="status" class="status"></span>
                </a>
                <a href="https://github.com/d4vss/" target=_blank class="fa-brands fa-github"></a>
                <a href="https://instagram.com/d4v.sy" class="fa-brands fa-instagram"></a>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { gsap } from 'gsap';

const image_url = ref(null);
const status = ref(null);

const colors = {
    online: '#43b581',
    idle: '#faa61a',
    dnd: '#f04747',
    offline: '#747f8d',
}

onMounted(async () => {
    const payload = await fetch('https://api.lanyard.rest/v1/users/627448648833171457');
    const data = await payload.json();
    image_url.value = "https://cdn.discordapp.com/avatars/627448648833171457/" + data.data.discord_user.avatar + ".png?size=256";
    status.value.style.backgroundColor = colors[data.data.discord_status];
})

console.log(image_url)
onMounted(() => {
    gsap.from(footer.value, {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'Power4.easeOut',
    });
});

</script>

<style scoped>

main {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;            
}
.left {
    padding: 0;
    margin: 0;
}
.container {
    margin-top: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
}

.socials {
    display: flex;
    align-items: center;
    justify-content: center;
}

.socials a {
    text-decoration: none;
}

.discord img {
    display: inline;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.1rem;
    margin-top: 0.75rem;
}

.status {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin-top: 0.75rem;
    margin-left: -0.5rem;
    border: 2px solid #2f3136;
}
</style>