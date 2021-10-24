<template>
<div class="boxform">
  <form @submit.prevent="onSubmit">
    <h1>Join Workspace</h1>
    <input name="id" type="text" placeholder="id" v-model="workspace_id" />
    <input type="submit" value="Submit" />
  </form>
</div>
</template>
<script>
export default {
  name: "Join",
  data() {
    return {
      workspace_id: "",
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({ path: "/timer/" + this.workspace_id });
    },
  },
};
</script>
<style scoped>
/* style di sini */
</style>