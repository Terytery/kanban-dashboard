<template>
  <v-app>
    <!-- nav bar -->

    <v-main>
      <AddProjectContainer />
    </v-main>
  </v-app>
</template>

<script>
import AddProjectContainer from "./containers/AddProjectContainer";

export default {
  name: "App",

  components: {
    AddProjectContainer,
  },

  data: () => ({
    //
  }),
};
</script>
