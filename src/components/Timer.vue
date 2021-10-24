
<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ description }}</h2>
    <p>{{ id }}</p>

    <p class="time">{{ formatted_time }}</p>
    <button v-if="state === 'START'" @click="pause()">PAUSE</button>
    <button v-else-if="state !== 'START'" @click="start()">
      {{ state === "PAUSE" ? "RESUME" : "START" }}
    </button>
    <button @click="stop()">Stop</button>
    <button @click="reset()">Reset</button>
    <button @click="remove()">Remove</button>
    <p v-if="result !== ''" class="time">{{ result }}</p>
  </div>
</template>


<script>
import * as TimerStateDef from "/src/types/Timer-def";

function formatTime(millis) {
  const sec = Math.floor(millis / 1000);

  const hour = Math.floor(sec / 3600);
  const minutes = Math.floor((sec / 60) % 60);
  const seconds = Math.floor(sec % 60);

  const formatted =
    hour.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return formatted;
}

export default {
  name: "Timer",
  props: {
    id: String,
    elapsedTime: Number,
    status: String,
    time: Number,
  },
  data() {
    return {
      formatted_time: "00:00:00",
      state: TimerStateDef.PAUSE,
      last_epoch: 1635047129000, // ganti sesuaiin yaaa
      millis: 0,
    };
  },
  methods: {
    pause() {
      window.clearInterval(this.interval);
      this.formatted_time = formatTime(this.millis);
      this.state = TimerStateDef.PAUSE;
    },
    start() {
      this.interval = window.setInterval(() => {
        const curr_epoch = Date.now();
        this.millis += curr_epoch - this.last_epoch;
        this.last_epoch = curr_epoch;
        this.formatted_time = formatTime(this.millis);
      }, 500);
      this.state = TimerStateDef.START;
    },
    stop() {
      const formattedTime = formatTime(this.millis).split(":");
      this.result =
        "Total waktu pengerjaan : " +
        formattedTime[0] +
        " jam, " +
        formattedTime[1] +
        " menit, " +
        formattedTime[2] +
        " detik";
      window.clearInterval(this.interval);

      this.state = TimerStateDef.STOP;
      this.formatted_time = formatTime(0);
    },

    reset() {
      this.result = undefined;

      window.clearInterval(this.interval);

      this.state = TimerStateDef.RESET;
      this.millis = 0;
      this.last_epoch = Date.now();

      this.formatted_time = formatTime(0);
    },
    remove() {
      return;
    },
  },
};
</script>
<style scoped>
/* style di sini */
</style>

