<template>
  <v-container>
    <v-row justify="space-between">
      <h1 class="mb-5 title-project">Kanban dashboard</h1>
    </v-row>
    <ProjectList />
  </v-container>
</template>
<script>
import ProjectList from "../components/ProjectList";

export default {
  name: "ProjectsContainer",
  components: {
    ProjectList
  },
  data: () => ({})
};
</script>

<style scoped>
.title-project {
  width: 100%;
  text-align: center;
}
</style>