<template>
  <v-container>
    <v-row justify="space-between">
      <h1>Liste des projets</h1>
      <AddProject />
    </v-row>
    <ProjectList />
  </v-container>
</template>

<script>
import AddProject from "../components/AddProject";
import ProjectList from "../components/ProjectList";

export default {
  name: "ProjectContainer",
  components: {
    AddProject,
    ProjectList,
  },
  data: () => ({}),
};
</script>
