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
          <v-icon small class="mr-2" @click="confirmEdit(item)">
            mdi-pencil</v-icon
          >
          <v-icon small @click="confirmDelete(item)"> mdi-delete</v-icon>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="modalEditProject" width="600px">
      <v-card>
        <v-form ref="form" lazy-validation>
          <v-card-title>
            <span class="headline">Modifier le projet</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="projectToEdit.name"
                    label="Nom du projet*"
                    type="text"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="projectToEdit.dateStart"
                    label="Date de début*"
                    type="date"
                    :rules="dateDebRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="projectToEdit.dateEnd"
                    label="Date de fin"
                    type="date"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Champs obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="modalEditProject = false">
              Fermer
            </v-btn>
            <v-btn color="blue" text @click="editProject(projectToEdit)">
              Modifier
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

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
    nameRules: [
      v => !!v || "Le nom est obligatoire",
      v => /\w/.test(v) || "Le nom est invalide"
    ],
    dateDebRules: [v => !!v || "La date est obligatoire"],
    modalDeleteConfirm: false,
    modalEditProject: false,
    projectToEdit: {},
    projectToDelete: {}
  }),
  computed: {
    ...mapState(["projects"])
  },

  methods: {
    openProject(project) {
      this.$store.dispatch("setCurrentProject", project);
    },
    confirmEdit(item) {
      this.projectToEdit = Object.assign({}, item);
      this.modalEditProject = true;
    },
    editProject(item) {
      if (this.$refs.form.validate()) {
        this.$refs.form.resetValidation();
        this.modalEditProject = false;
        this.projectToEdit = {};
        db.collection("projects")
          .doc(item.id)
          .update(item);
      } else {
        this.modalEditProject = true;
      }
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