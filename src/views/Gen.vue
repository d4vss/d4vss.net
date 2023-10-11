<template>
    <h2 class="panton shadow">Generate number between ranges</h2>
    <div class="inputs">
        <input class="panton" type="text" autocomplete="off" placeholder="Enter Start Value" ref="from">
        <input class="panton" type="text" autocomplete="off" placeholder="Enter End Value" ref="to">
        <a class="link panton shadow" @click="generate">Generate</a>
    </div>
    <div class="vert">
        <span class="panton" ref="part"></span><span class="panton shadow" ref="result"></span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const from = ref(null);
const to = ref(null);
const result = ref(null);
const part = ref(null);

addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        generate();
    }
});

function generate() {
    if (from.value.value == "" || to.value.value == "") {
        return;
    }

    const from_value = parseInt(from.value.value);
    const to_value = parseInt(to.value.value);

    if (isNaN(from_value) || isNaN(to_value)) {
        return;
    }

    const random = Math.floor(Math.random() * (to_value - from_value + 1)) + from_value;
    result.value.innerHTML = random;
    part.value.innerHTML = `Random number between ${from_value} and ${to_value}: `;
    gsap.from(result.value, {
        duration: 1,
        y: -20,
        opacity: 0,
        ease: 'Power4.easeOut',
    });
    gsap.from(part.value, {
        duration: 1,
        y: -20,
        opacity: 0,
        ease: 'Power4.easeOut',
    });
}
</script>

<style scoped>
h2 {
    margin-bottom: 40px;
    text-align: center;
}
.inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.inputs input {
    margin: 0 10px;
}

.inputs input:last-child {
    margin-right: 0;
}

input {
    padding: 15px;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
    border: none;
    outline: none;
    max-width: 300px;
}

input::placeholder {
    color: #aaa;
}

.vert {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}


a {
    cursor: pointer;
}

span {
    margin-top: 10px;
}

</style>