<template>
  <div>
    <h1>{{ title }}</h1>
    <button v-if="connected" @click="changeTitle">Change Title</button>

    <h3>{{ description }}</h3>
    <button v-if="connected" @click="changeDescription">Change Description</button>

    <h3>Workspace id : {{ workspace_id }}</h3>

    <p v-if="!connected">Connecting to realtime server...</p>
    
    <div v-else>
      <ul id="array-rendering">
        <Timer
          v-for="timer in timers"
          :key="timer.id"
          :id="timer.id"
          :elapsedTime="timer.elapsedTime"
          :status="timer.status"
          :time="timer.time"
          @remove-timer="remove"
          @state-update="stateUpdate"
        >
          <h3>{{ timer.title }}</h3>
        </Timer>
      </ul>

      <button @click="add()">Add</button>
    </div>
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
    changeTitle() {
      const new_title = window.prompt("Update Title:")

      if (new_title != null && new_title.length >= 5 && new_title.length <= 15) {
        axios.put(process.env.VUE_APP_BACKEND_URL + "/workspace/" + this.$route.params.id, { title: new_title, description: this.description }).catch((err) => {
          console.error(err)
        })
      } else {
        if (new_title != null)
          window.alert("Your title is invalid")
      }
    },
    changeDescription() {
      const new_description = window.prompt("Update Description:")

      if (new_description != null && new_description.length >= 5 && new_description.length <= 50) {
        axios.put(process.env.VUE_APP_BACKEND_URL + "/workspace/" + this.$route.params.id, { title: this.title, description: new_description }).catch((err) => {
          console.error(err)
        })
      } else {
        if (new_description != null)
          window.alert("Your description is invalid")
      }
    },
    add() {
      const timer_name = window.prompt("New Timer Name:")

      if (timer_name != null && timer_name.length >= 5) {
        axios.post(process.env.VUE_APP_BACKEND_URL + "/timer/workspace/" + this.$route.params.id, { title: timer_name }).catch((err) => {
          console.error(err)
        })
      }
    },
    remove(id) {
      axios.delete(process.env.VUE_APP_BACKEND_URL + "/timer/workspace/" + this.$route.params.id + "/" + id).catch((err) => {
        console.error(err)
      })
    },
    stateUpdate({ event, detail }) {
      this.socket.emit(event, detail);
    }
  },
  created() {
    axios.get(process.env.VUE_APP_BACKEND_URL + "/workspace/" + this.$route.params.id).then(({ data }) => {
      this.title = data.title;
      this.description = data.description;

      document.title = "TVA | " + this.title
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
      this.connected = false;
    });

    this.socket.on("connect", () => {
      this.connected = true;
    });

    this.socket.on("timer:new", (data) => {
      this.timers.push(data);
    });

    this.socket.on("timer:update", (data) => {
      this.timers.forEach((val, index) => {
        if (val.id === data.id) {
          console.log(data);
          this.timers[index] = data;
        }
      });
    });

    this.socket.on("workspace:update:" + this.$route.params.id, (data) => {
      console.log(data)

      this.title = data.title;
      this.description = data.description;

      document.title = "TVA | " + this.title
    });

    this.socket.on("timer:delete", (timer_id) => {
      this.timers = this.timers.filter((val) => val.id !== timer_id);
    });
  },
};
</script>