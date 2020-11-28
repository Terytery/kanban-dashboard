<template>
  <v-app>
    <v-main>
      <ProjectsContainer />

      <KanbanDashboard />
    </v-main>
  </v-app>
</template>

<script>
import ProjectsContainer from "./containers/ProjectsContainer";
import KanbanDashboard from "./containers/KanbanDashboard";

export default {
  name: "App",

  components: {
    ProjectsContainer,
    KanbanDashboard
  },

  data: () => ({
    //
  })
};
</script>
