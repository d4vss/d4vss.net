<template>
    <main ref="main">
        <h1 class="panton shadow page-title">About me</h1>

        <h2 class="panton"> My skills:</h2>

            <div class="skills">
                <div class="skill" v-for="skill in skills">
                    <p class="panton shadow">{{ skill.name }}</p>
                    <div class="percentage">
                        <div class="bar">
                            <div class="progress shadow" :style="{ width: skill.value }"></div>
                        </div>
                        <span class="panton" :style="{ left: skill.value }"> {{ skill.value }}</span>
                    </div>
                </div>
            </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const main = ref(null);

const skills = [
    { name: 'Lorem ipsum.', value: '90%' },
    { name: 'Lorem ipsum.', value: '80%' },
    { name: 'Lorem ipsum.', value: '70%' },
    { name: 'Lorem ipsum.', value: '60%' },
    { name: 'Lorem ipsum.', value: '50%' },
    { name: 'Lorem ipsum.', value: '40%' },
    { name: 'Lorem ipsum.', value: '30%' },
    { name: 'Lorem ipsum.', value: '20%' },
]

onMounted(() => {
    gsap.from(main.value.children, {
        duration: 1,
        y: -25,
        opacity: 0,
        stagger: 0.35,
        ease: 'Power4.easeOut',
    });
});
</script>

<style scoped>
h2 {
    text-align: center;
}
.skills {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;
    padding: 1rem;
}

.skill {
    width: 42%;
    margin: 1rem;
}

.bar {
    width: 100%;
    height: 1rem;
    background-color: #2f3136;
    border-radius: 0.5rem;
    margin-right: 1rem;
}

.progress {
    height: 1rem;
    background-color: var(--color-accent);
    border-radius: 0.5rem;
}

.percentage {
    display: flex;
    flex-direction: row;
    align-items: center;
}

@media (max-width: 768px) {
    .skills {
        flex-direction: column;
        align-items: center;
        border: none;
    }

    .skill {
        width: 90%;
    }
}
</style>