<script setup lang="ts">
import { ref } from 'vue'

defineProps<{id : string, status: string, elapsedTime: number, time: number}>()

const formatted_time = ref("00:00:00")
const result = ref("")
const interval = ref(0)
</script>

<template>
    <div>
        <p>{{$props.id}}</p>

        <p class="time">{{formatted_time}}</p>
        <button>Pause</button>`
        <button>Start/Resume</button>
        <button>Stop</button>
        <button>Reset</button>
    </div>
</template>

<style scoped>
.time {
    font-size: 2em;
}

button {
    width: 100px;
    height: 40px;
    background: transparent;
    color: #384856;
    border: 2px solid #384856;
    border-radius: 5px;
    outline: none;
}

button:hover {
    background: transparent;
    color: #b76b6d;
    font-weight: 800;
    text-transform: capitalize;
}
</style>
