<template>
  <v-dialog v-model="modalAddProject" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" v-bind="attrs" v-on="on"
        ><v-icon left> mdi-pencil </v-icon> New
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Ajouter un nouveau projet</span>
      </v-card-title>
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="project.dateStart"
                label="Date de début*"
                type="date"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="project.dateEnd"
                label="Date de fin"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="project.type"
                :items="['Personnel', 'Professionnel']"
                label="Type de projet*"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="project.githubRepoLink"
                label="GitHub repository"
                type="url"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*Champs obligatoire</small>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" text @click="resetDialog"> Fermer </v-btn>
        <v-btn color="blue" text @click="createProject"> Ajouter </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { db } from "../firebase";

export default {
  name: "AddProjectList",
  data: () => ({
    project: {
      name: "",
      dateStart: "",
      dateEnd: "",
      type: "",
      githubRepoLink: "",
    },
    modalAddProject: false,
  }),
  mounted() {
    this.$store.dispatch("getProjects");
  },
  methods: {
    createProject() {
      db.collection("projects").add(this.project);
      this.modalAddProject = false;
      this.project = {};
    },
    resetDialog() {
      this.modalAddProject = false;
      this.project = {};
    },
  },
};
</script>
