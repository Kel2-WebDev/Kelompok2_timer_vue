<template>
  <div>
    <h1>{{ title }} {{ workspace_id }}</h1>
    <h2>{{ description }}</h2>
    <ul id="array-rendering">
      <li v-for="timer in timers" :key="timer.id">
        <!-- id di atas menyesuaikan dengan id timernya (soalnya sudah unique)-->
        <Timer id="id1" elapsedTime="1" status="PAUSE" time="0" />
        <!-- id, elaps, status, time blalala menyesuaikan dengan timer saat loopnya -->
      </li>
    </ul>

    <button @click="add()">Add</button>
  </div>
</template>

<script>
import { onMounted } from "vue";
import TimerVue from "/src/components/Timer.vue";
export default {
  name: "App",
  components: {
    Timer: TimerVue,
  },
  data() {
    return {
      workspace_id: this.$route.params.id,
      title: "Title1",
      description: "Description1",
      timers: ["123"],
    };
  },
  methods: {
    add() {
      return;
    },
  },
  setup() {
    onMounted(() => {
      return;
      // calling API disini, nanti didapat
    });
  },
};
</script>
<style scoped>
/* style di sini */
</style>
