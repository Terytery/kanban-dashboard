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
        <v-dialog v-model="modalDeleteConfirm" width="750">
          <template v-slot:activator="{ on, attrs }">
            <v-icon small v-bind="attrs" v-on="on"> mdi-delete </v-icon>
          </template>
          <v-card>
            <v-card-title class="error headline">
              <b>Supprimer ce projet ?</b>
              <v-card-text class="color-item">
                <b
                  >Cette action entraînera la suppression définitive de toutes
                  les données relative à ce projet.
                </b></v-card-text
              >
            </v-card-title>
            <br />
            <v-card-text class="text-h4">
              <center>{{ item.name }}</center></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="modalDeleteConfirm = false"> ANNULER </v-btn>

              <v-btn
                color="error"
                text
                :disabled="invalid"
                @click="deleteProject(item.id)"
              >
                SUPPRIMER
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </td>
    </template>
  </v-data-table>
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
    modalDeleteConfirm: false
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
    editItem(item) {
      console.log(item);
    },
    deleteProject(item) {
      this.modalDeleteConfirm = false;
      db.collection("projects").doc(item).delete();
    }
  }
};
</script>

<style scoped>
.margin {
  margin: 0px 15px;
}
</style>