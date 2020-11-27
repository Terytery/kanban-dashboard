<template>
  <v-row justify="center">
    <v-dialog v-model="modalAddProject" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> New </v-btn>
        <v-container>
          <v-card v-for="project in projects" :key="project.id">
            {{ project.name }}, {{ project.dateStart }}, {{ project.dateEnd }},
            {{ project.type }}, {{ project.githubRepoLink }}
          </v-card>
        </v-container>
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
                  v-model="name"
                  label="Nom du projet"
                  type="text"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="dateStart"
                  label="Date de début*"
                  type="date"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="dateEnd"
                  label="Date de fin"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="type"
                  :items="['Personnel', 'Professionnel']"
                  label="Type de projet*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="githubRepoLink"
                  label="GitHub repository"
                  type="url"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Champs obligatoire</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="modalAddProject = false">
            Fermer
          </v-btn>
          <v-btn color="blue darken-1" text @click="createProject">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "AddProjectList",
  data: () => ({
    name: "",
    dateStart: "",
    dateEnd: "",
    type: "",
    githubRepoLink: "",
    modalAddProject: false,
  }),
  mounted() {
    this.$store.dispatch("getProjects");
  },
  computed: {
    ...mapState(["projects"]),
  },

  methods: {
    createProject() {
      const project = {
        name: this.name,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        type: this.type,
        githubRepoLink: this.githubRepoLink,
      };
      db.collection("projects").add(project);
      this.modalAddProject = false;
    },
  },
};
</script>
