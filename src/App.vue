<template>
  <v-app>
    <!-- nav bar -->

    <v-main>
      <ProjectsContainer />
    </v-main>
  </v-app>
</template>

<script>
import ProjectsContainer from "./containers/ProjectsContainer";

export default {
  name: "App",

  components: {
    ProjectsContainer
  },

  data: () => ({
    //
  })
};
</script>
