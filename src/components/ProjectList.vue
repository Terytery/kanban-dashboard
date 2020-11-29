<template>
  <v-card elevation="0" outlined>
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
          <v-icon small class="mr-2" @click="editProject(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="confirmDelete(item)"> mdi-delete</v-icon>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="modalDeleteConfirm" width="750">
      <v-card>
        <v-card-title class="error headline">
          <b>Supprimer ce projet ?</b>

          <v-card-text class="color-item">
            <b
              >Cette action entraînera la suppression définitive de toutes les
              données relative à ce projet.
            </b>
          </v-card-text>
        </v-card-title>

        <br />

        <v-card-text class="text-h4">
          <center>{{ projectToDelete.name }}</center>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="modalDeleteConfirm = false">ANNULER</v-btn>

          <v-btn color="error" text @click="deleteProject(projectToDelete.id)">
            SUPPRIMER
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>


<script>
import AddProject from "../components/AddProject";
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "ProjectList",
  components: {
    AddProject
  },
  data: () => ({
    headers: [
      {
        text: "Nom des projets",
        align: "start",
        value: "name"
      },
      { text: "Date de départ", value: "dateStart" },
      { text: "Date de fin", value: "dateEnd" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    modalDeleteConfirm: false,
    projectToDelete: {}
  }),
  mounted() {
    this.$store.dispatch("getProjects");
  },

  computed: {
    ...mapState(["projects"])
  },

  methods: {
    openProject(project) {
      this.$store.dispatch("setCurrentProject", project);
    },
    editProject(item) {
      console.log(item);
    },
    confirmDelete(item) {
      this.projectToDelete = item;
      this.modalDeleteConfirm = true;
    },
    deleteProject(item) {
      this.modalDeleteConfirm = false;
      db.collection("projects")
        .doc(item)
        .delete();
    }
  }
};
</script>

<style scoped>
.v-data-table {
  cursor: pointer;
}
</style>