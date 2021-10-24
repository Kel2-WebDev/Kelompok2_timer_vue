<template>
  <div>
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
import $ from "jquery";
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
      // ajax disini
      console.log(this.title, this.description);
    },
  },
};
</script>
<style scoped>
/* style di sini */
</style>