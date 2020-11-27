<template>
  <v-app>
    <v-main>
      <ProjectContainer v-if="false" />

      <KanbanDashboard />
    </v-main>
  </v-app>
</template>

<script>
import ProjectContainer from "./containers/ProjectContainer";
import KanbanDashboard from "./containers/KanbanDashboard";

export default {
  name: "App",

  components: {
    ProjectContainer,
    KanbanDashboard
  },

  data: () => ({
    //
  })
};
</script>
