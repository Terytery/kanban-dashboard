<template>
  <v-dialog v-model="modalAddProject" max-width="600px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="blue"
        v-bind="attrs"
        v-on="on"
        @click="modalAddProject = true"
        fab
        small
        elevation="0"
        ><v-icon> mdi-plus </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title class="headline">Ajouter un nouveau projet</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="project.name"
                  label="Nom du projet*"
                  type="text"
                  required
                  hide-details="auto"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="project.dateStart"
                  label="Date de début*"
                  type="date"
                  required
                  :rules="dateDebRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="project.dateEnd"
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
          <v-btn color="error" text @click="resetDialog"> Fermer </v-btn>
          <v-btn color="blue" text @click="createProject"> Ajouter </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>


<script>
import { db } from "../firebase";

export default {
  name: "AddProjectList",
  data: () => ({
    nameRules: [
      v => !!v || "Le nom est obligatoire",
      v => /\w/.test(v) || "Le nom est invalide"
    ],
    dateDebRules: [v => !!v || "La date est obligatoire"],
    project: {
      name: "",
      dateStart: "",
      dateEnd: ""
    },
    modalAddProject: false
  }),
  methods: {
    createProject() {
      if (this.$refs.form.validate()) {
        this.$refs.form.resetValidation();
        db.collection("projects").add(this.project);
        this.modalAddProject = false;
        this.project = {};
      } else {
        this.modalAddProject = true;
      }
    },
    resetDialog() {
      this.modalAddProject = false;
      this.project = {};
      this.$refs.form.resetValidation();
    }
  }
};
</script>
