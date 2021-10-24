
<template>
  <div>
    <slot></slot>
    <p>{{ id }}</p>

    <p class="time">{{ formatted_time }}</p>
    <button v-if="state === 'STARTED'" @click="pause()">Pause</button>
    <button
      v-else-if="state !== 'STARTED'"
      @click="start()"
    >{{ state === "PAUSED" ? "Resume" : "Start" }}</button>
    <button @click="stop()">Stop</button>
    <button @click="reset()">Reset</button>
    <button @click="$emit('remove-timer', id)">Remove</button>
    <p v-if="result !== ''" class="time">{{ result }}</p>
  </div>
</template>


<script>
import * as TimerStateDef from "../types/Timer-def.js";

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
  watch: {
    status: function () {
      this.syncState()
    },
    elapsedTime: function () {
      this.syncState()
    }
  },
  emits: ["remove-timer", "state-update"],
  data() {
    return {
      formatted_time: "00:00:00",
      state: this.status || TimerStateDef.RESET,
      last_epoch: this.time !== undefined ? this.time : Date.now(), // ganti sesuaiin yaaa
      millis: this.elapsedTime !== undefined ? this.elapsedTime : 0,
      result: undefined
    };
  },
  methods: {
    syncState() {
      switch (this.status) {
        case "STARTED":
          this.start(true);
          break;

        case "PAUSED":
          this.pause(true);
          break;

        case "STOPPED":
          this.stop(true);
          break;

        case "RESET":
          this.reset(true);
          break;
      }
    },
    pause(force = false) {
      console.log(this.state);
      if (this.state === "STARTED" || force) {
        if (!force) {
          this.$emit("state-update", { event: "pause", detail: this.id })
        }

        if (force) {
          window.clearInterval(this.interval);
          this.formatted_time = formatTime(this.millis);
          this.state = TimerStateDef.PAUSE;
        }
      }
    },
    start(force = false) {
      console.log(this.state);
      if (this.state !== "STARTED" || force) {
        if (!force) {
          this.$emit("state-update", { event: "start", detail: this.id })
        }

        if (force) {
          this.interval = window.setInterval(() => {
            const curr_epoch = Date.now();
            this.millis += curr_epoch - this.last_epoch;
            this.last_epoch = curr_epoch;
            this.formatted_time = formatTime(this.millis);
          }, 500);
          this.state = TimerStateDef.START;
        }
      }
    },
    stop(force = false) {
      console.log(this.state);
      if ((this.state !== "STOPPED" && this.state !== "RESET") || force) {
        if (!force) {
          this.$emit("state-update", { event: "stop", detail: this.id })
        }

        if (force) {
          const formattedTime = formatTime(this.millis).split(":");
          this.result =
            `Total waktu pengerjaan : ${formattedTime[0]} jam, ${formattedTime[1]} menit, ${formattedTime[2]} detik`;
          window.clearInterval(this.interval);

          this.state = TimerStateDef.STOP;
          this.formatted_time = formatTime(0);
        }
      }
    },
    reset(force = false) {
      console.log(this.state);
      if (this.state !== "RESET" || force) {
        if (!force) {
          this.$emit("state-update", { event: "reset", detail: this.id })
        }

        if (force) {
          this.result = undefined;

          window.clearInterval(this.interval);

          this.state = TimerStateDef.RESET;
          this.millis = 0;
          this.last_epoch = Date.now();

          this.formatted_time = formatTime(0);
        }
      }
    },
  },
  created() {
    this.syncState()
  },
};
</script>

<style scoped>
/* style di sini */
</style>

