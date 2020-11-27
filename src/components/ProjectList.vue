<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>
              <v-row align="center" justify="end">
                <p class="margin">{{ project.dateStart }}</p>
                <v-btn small rounded color="primary" class="margin">
                  Commit
                </v-btn>
                <v-btn small rounded color="error" class="margin">
                  Delete
                </v-btn>
              </v-row>
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