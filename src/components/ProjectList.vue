<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    sort-by="dateStart"
    :sort-desc="[true]"
    hide-default-footer
    @click:row="openProject"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Liste des projets</v-toolbar-title>
        <v-spacer></v-spacer>
        <AddProject />
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <td @click.stop>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import AddProject from "../components/AddProject";
import { mapState } from "vuex";

export default {
  name: "ProjectList",
  components: {
    AddProject,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nom des projets",
        align: "start",
        value: "name",
      },
      { text: "Date de départ", value: "dateStart" },
      { text: "Date de fin", value: "dateEnd" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  mounted() {
    this.$store.dispatch("getProjects");
  },

  computed: {
    ...mapState(["projects"]),
  },

  methods: {
    openProject(project) {
      this.$store.dispatch("setCurrentProject", project);
    },
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.margin {
  margin: 0px 15px;
}
</style>