<template>
  <v-container>
    <v-row align="right" justify="space-between">
      <t1>Liste des projets</t1>
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
