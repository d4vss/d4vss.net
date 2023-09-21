<template>
    <main>
        <div class="container" ref="footer">
            <p class="panton left">d4vss.net</p>
            <div class="socials">
                <a class="discord" target=_blank href="https://discord.com/users/627448648833171457">
                    <img :src="image_url">
                    <span ref="status_" class="status"></span>
                </a>
                <a href="https://github.com/d4vss/" target=_blank><i class="fa-brands fa-github fa-xl"></i></a>
                <a href="https://instagram.com/d4v.sy" target=_blank><i class="fa-brands fa-instagram fa-xl"></i></a>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithub, faInstagram)

const footer = ref(null);
const image_url = ref(null);
const status_ = ref(null);

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
    status_.value.style.backgroundColor = colors[data.data.discord_status];
})

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
    width: 95%;
    height: 2rem;            
}
.left {
    margin-left: 1rem;
}
.container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
}

.socials {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.socials a {
    text-decoration: none;
}

.discord img {
    display: inline;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    margin-top: 1rem;
}

.status {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    margin-top: 0.75rem;
    margin-left: -0.75rem;
    background-color: #747f8d;
    border: 2px solid #2f3136;
}

@media (max-width: 768px) {
    main {
        width: 90%;
    }
    .container {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }
    .socials {
        margin-right: 0;
    }

    .discord img {
        width: 2rem;
        height: 2rem;
    }
    .status {
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.7rem;
        margin-left: -0.7rem;
    }
}
</style>