<template>
  <v-app>
    <v-main>
      <KanbanDashboard v-if="currentProject.id" />

      <ProjectsContainer v-else />
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
  created() {
    this.$store.dispatch("getProjects");
    this.$store.dispatch("getUsers");
  },
  computed: {
    ...mapState(["currentProject"])
  }
};
</script>
