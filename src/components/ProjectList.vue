<template>
  <v-container>
    <v-row align="right" justify="space-between">
      <t1>Liste des projets</t1>
      <v-btn rounded color="success"> New </v-btn>
    </v-row>
    <br />
    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Project 1</td>
            <td>
              <v-row align="center" justify="end">
                <p class="margin">26-11-2020</p>
                <v-btn small rounded color="primary" class="margin">
                  Commit
                </v-btn>
                <v-btn small rounded color="error" class="margin">
                  Delete
                </v-btn>
              </v-row>
            </td>
          </tr>
          <tr>
            <td>Project 2</td>
            <td>
              <v-row align="center" justify="end">
                <p class="margin">27-11-2020</p>
                <v-btn small rounded color="primary" class="margin">
                  Commit
                </v-btn>
                <v-btn small rounded color="error" class="margin">
                  Delete
                </v-btn>
              </v-row>
            </td>
          </tr>
          <tr>
            <td>Project 3</td>
            <td>
              <v-row align="center" justify="end">
                <p class="margin">28-11-2020</p>
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
    ...mapState(["projects"])
  }
};
</script>

<style scoped>
.margin {
  margin: 0px 15px;
}
</style>