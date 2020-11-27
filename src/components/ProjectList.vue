<template>
  <v-container>
    <v-card v-for="project in projects" :key="project.id">
      {{ project.name }}
    </v-card>
    <v-btn @click="createProject"> Ajouter </v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "ProjectList",
  data: () => ({}),
  mounted() {
    this.$store.dispatch("getProjects");
  },
  computed: {
    ...mapState(["projects"]),
  },

  methods: {
    createProject() {
      const project = {
        name: "tot",
        dateStart: "27-11-2020",
      };
      db.collection("projects").add(project);
    },
  },
};
</script>
