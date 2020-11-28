<template>
  <v-container>
    <br />
    <br />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nom du projet</th>
            <th class="text-left">Date de début</th>
            <th class="text-left">Date de fin</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>
              <p>{{ project.dateStart }}</p>
            </td>
            <td>
              <p>{{ project.dateEnd }}</p>
            </td>
            <td class="text-right">
              <v-btn small rounded color="primary" class="margin">Commit</v-btn>
              <v-btn small rounded color="error" class="margin"> Delete </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectList",
  data: () => ({}),
  mounted() {
    this.$store.dispatch("getProjects");
  },
  computed: {
    ...mapState(["projects"]),
  },
};
</script>

<style scoped>
.margin {
  margin: 0px 15px;
}
</style>