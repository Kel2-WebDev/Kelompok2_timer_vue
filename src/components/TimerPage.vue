<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ description }}</h2>
    <h2>Join using : {{ workspace_id }}</h2>

    <p v-if="!connected">Connecting to realtime server...</p>
    <ul v-else id="array-rendering">
      <Timer
        v-for="timer in timers"
        :key="timer.id"
        :id="timer.id"
        :elapsedTime="timer.elapsedTime"
        :status="timer.status"
        :time="timer.time"
        @remove-timer="remove"
      >
        <h3>{{ timer.title }}</h3>
      </Timer>
    </ul>

    <button @click="add()">Add</button>
  </div>
</template>

<script>
import TimerVue from "./Timer.vue";
import axios from "axios";
import { io } from "socket.io-client"
import { ref } from "vue";

export default {
  name: "App",
  components: {
    Timer: TimerVue,
  },
  data() {
    const workspace_id = this.$route.params.id;
    const socket = io(process.env.VUE_APP_BACKEND_URL, {
      auth: { key: workspace_id }
    });

    const title = ref("Loading...");
    const description = ref("Loading...");
    const timers = ref([]);
    const connected = ref(false);

    return {
      socket,
      workspace_id,
      title,
      description,
      timers,
      connected
    };
  },
  methods: {
    add() {
      const timer_name = window.prompt("Nama timer baru:")

      if (timer_name != null && timer_name.length >= 5) {
        axios.post(process.env.VUE_APP_BACKEND_URL + "/timer/workspace/" + this.$route.params.id, { title: timer_name }).catch((err) => {
          console.error(err)
        })
      }

      return;
    },
    remove(id) {
      axios.delete(process.env.VUE_APP_BACKEND_URL + "/timer/workspace/" + this.$route.params.id + "/" + id).catch((err) => {
        console.error(err)
      })
    }
  },
  created() {
    axios.get(process.env.VUE_APP_BACKEND_URL + "/workspace/" + this.$route.params.id).then(({ data }) => {
      this.title = data.title;
      this.description = data.description;
    }).catch((err) => {
      console.error(err)
      this.$router.replace({ path: "/" })
    })

    axios.get(process.env.VUE_APP_BACKEND_URL + "/timer/" + this.$route.params.id).then(({ data }) => {
      this.timers = data
    }).catch((err) => {
      console.error(err)
      this.$router.replace({ path: "/" })
    })

    this.socket.on("disconnect", () => {
      console.log("Disconnect");

      this.connected = false;
    });

    this.socket.on("connect", () => {
      console.log("Connected");

      this.connected = true;
    });

    this.socket.on("timer:new", (data) => {
      console.log("New timer");
      console.log(data);

      this.timers.push(data);
    });

    this.socket.on("timer:update", (data) => {
      this.timers.forEach((val, index) => {
        if (val.id === data.id) {
          this.timers[index] = data;
        }
      });
    });

    this.socket.on("timer:delete", (timer_id) => {
      console.log(`Delete ${timer_id}`);

      this.timers = this.timers.filter((val) => val.id !== timer_id);
    });
  },
};
</script>

<style scoped>
/* style di sini */
</style>
