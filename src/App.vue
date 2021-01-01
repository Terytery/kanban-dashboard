<template>
  <v-app>
    <v-main>
      <UserAuthentication v-if="!connectedUser.tokenId" />

      <template v-else>
        <KanbanDashboard v-if="currentProject.id" />

        <ProjectsContainer v-else />
      </template>
    </v-main>
  </v-app>
</template>

<script>
import ProjectsContainer from "./containers/ProjectsContainer";
import KanbanDashboard from "./containers/KanbanDashboard";
import UserAuthentication from "./containers/UserAuthentication";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    ProjectsContainer,
    KanbanDashboard,
    UserAuthentication
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["currentProject", "connectedUser"])
  }
};
</script>
