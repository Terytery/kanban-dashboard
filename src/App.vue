<template>
  <v-app>
    <v-main>
      <router-view>
        <KanbanDashboard v-if="currentProject.id" />

        <ProjectsContainer v-else
      /></router-view>
    </v-main>
  </v-app>
</template>

<script>
import ProjectsContainer from "./containers/ProjectsContainer";
import KanbanDashboard from "./containers/KanbanDashboard";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    ProjectsContainer,
    KanbanDashboard
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["currentProject"])
  }
};
</script>
