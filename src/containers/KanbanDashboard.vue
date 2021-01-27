<template>
  <v-container>
    <v-btn @click="returnToListProjects" text fixed dark color="white" left top>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <h1 class="text-center">{{ currentProject.name }}</h1>

    <p class="overline text-center">Liste des tâches</p>
    <v-progress-linear
      :value="countRemainingTask"
      height="10"
      striped
      :color="progressBarSucess"
    ></v-progress-linear>
    <v-row>
      <TaskList
        title="TO DO"
        category="toDo"
        :tasks="tasks.toDo"
        @changeUser="openModalUser"
      />

      <TaskList
        title="IN PROGRESS"
        category="inProgress"
        :tasks="tasks.inProgress"
        @changeUser="openModalUser"
      />

      <TaskList
        title="IN TEST"
        category="inTest"
        :tasks="tasks.inTest"
        @changeUser="openModalUser"
      />

      <TaskList
        title="DONE"
        category="done"
        :tasks="tasks.done"
        @changeUser="openModalUser"
      />
    </v-row>

    <v-btn @click="addTask" fab fixed dark color="blue" right bottom>
      <v-icon>mdi-card-plus</v-icon>
    </v-btn>

    <v-dialog v-model="modalUser" scrollable max-width="300px">
      <v-card>
        <v-card-title>Responsable</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-radio-group v-model="modalUserTask.inCharge" column>
            <v-radio
              v-for="user in users"
              :key="user.id"
              :label="user.name"
              :value="user.name"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" text @click="modalUser = false"> FERMER </v-btn>
          <v-btn color="blue" text @click="confirmModalUser">
            SAUVEGARDER
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TaskList from "../components/TaskList";
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "KanbanDashboard",
  components: {
    TaskList
  },
  data: () => ({
    modalUser: false,
    modalUserTask: {
      isInCharge: ""
    }
  }),
  created() {
    this.$store.dispatch("getTasksByProjectId", this.currentProject.id);
  },
  computed: {
    ...mapState(["currentProject", "users"]),
    tasks() {
      return this.currentProject.tasks;
    },
    countRemainingTask() {
      let totalTask = 0;
      Object.values(this.tasks).forEach(task => {
        totalTask += task.length;
      });
      if (this.tasks.done.length == 0) {
        return 0;
      } else {
        return Math.round((this.tasks.done.length / totalTask) * 100);
      }
    },
    progressBarSucess() {
      if (this.countRemainingTask == 100) {
        return "#4caf50";
      }
      return "#ff5722";
    }
  },
  methods: {
    returnToListProjects() {
      this.$store.dispatch("removeCurrentProject");
    },
    addTask() {
      const task = {
        title: "",
        description: "",
        points: 0,
        urgent: false,
        position: 0,
        category: "toDo"
      };
      db.collection("projects")
        .doc(this.currentProject.id)
        .collection("tasks")
        .add(task);
    },
    openModalUser(task) {
      this.modalUser = true;
      this.modalUserTask = Object.assign({}, task);
    },
    confirmModalUser() {
      setTimeout(() => {
        db.collection("projects")
          .doc(this.currentProject.id)
          .collection("tasks")
          .doc(this.modalUserTask.id)
          .update(this.modalUserTask);

        this.modalUser = false;
      }, 100);
    }
  }
};
</script>


<style scoped>
.pg-bar {
  position: absolute;
  top: 8px;
  right: 70px;
}
</style>
