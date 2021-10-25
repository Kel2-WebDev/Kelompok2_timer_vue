<template>
  <div class="boxform">
    <form @submit.prevent="onSubmit">
      <h1>Create Workspace</h1>
      <input
        name="title"
        type="text"
        placeholder="Title"
        minlength="5"
        maxlength="15"
        v-model="title"
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        minlength="5"
        maxlength-50
        v-model="description"
      />
      <input type="submit" value="Submit" />
    </form>
    <div>
      <span>
        Already have id?
        <router-link to="/join">Join</router-link>
      </span>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Form",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    onSubmit() {
      console.log(process.env.VUE_APP_BACKEND_URL)

      axios.post(process.env.VUE_APP_BACKEND_URL + "/workspace/", { title: this.title, description: this.description })
        .then(({ data }) => {
          console.log(data);

          this.$router.push("/timer/" + data.id);
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            if (err.code === 429) {
              window.alert("You have created too much workspace")
            } else {
              window.alert("System error try again later")
            }
          } else {
            window.alert("System error try again later")
          }
        })
      console.log(this.title, this.description);
    },
  },
};
</script>