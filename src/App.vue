<template>
  <v-app>
    <v-main>
      <UserAuthentication v-if="!connectedUser.tokenId" />

      <template v-else>
        <DisconnectUser />

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
import DisconnectUser from "./components/DisconnectUser";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    ProjectsContainer,
    KanbanDashboard,
    UserAuthentication,
    DisconnectUser
  },
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("getProjects");
    this.$store.dispatch("getUsers");

    if (localStorage.connectedUser) {
      let connectedUser = JSON.parse(localStorage.connectedUser);
      if (connectedUser.userId && connectedUser.userId !== "guest") {
        this.$store.dispatch("setConnectedUser", connectedUser);
      }
    }
  },
  computed: {
    ...mapState(["currentProject", "connectedUser"])
  }
};
</script>
