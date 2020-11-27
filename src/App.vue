<template>
  <v-app>
    <!-- nav bar -->

    <v-main>
      <ProjectContainer />
    </v-main>
  </v-app>
</template>

<script>
import ProjectContainer from "./containers/ProjectContainer";

export default {
  name: "App",

  components: {
    ProjectContainer,
  },

  data: () => ({
    //
  }),
};
</script>
