<script setup lang="ts">
import Timer from './Timer.vue'
import { ref } from 'vue'

const data = ref({'title':"1", 'description':"2", 'id':"3"})
</script>

<template>
    <div>
        <h2 id="title">{{data.title}}</h2>
        <p id="description">{{data.description}}</p>
        <p id="id">Join using : {{data.id}}</p>

        <h3>Timers</h3>
        <Timer id="id1" status="state1" :elapsedTime="1" :time="1"></Timer>
    </div>
</template>

<!-- Style untuk komponen timer -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Convergence&display=swap");

* {
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 2, 6 rem;
  margin-bottom: 50px;
}
</style>