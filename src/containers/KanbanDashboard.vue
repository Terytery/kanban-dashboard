<template>
  <v-container>
    <v-btn @click="returnToListProjects" text fixed dark color="white" left top>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <h1 class="text-center">{{ currentProject.name }}</h1>

    <p class="overline text-center">Liste des tâches</p>

    <v-row>
      <TaskList title="TO DO" :tasks="tasks.toDo" />

      <TaskList title="IN PROGRESS" :tasks="tasks.inProgress" />

      <TaskList title="IN TEST" :tasks="tasks.inTest" />

      <TaskList title="DONE" :tasks="tasks.done" />
    </v-row>

    <v-btn @click="addTask" fab fixed dark color="blue" right bottom>
      <v-icon>mdi-card-plus</v-icon>
    </v-btn>
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
  data: () => ({}),
  created() {
    this.$store.dispatch("getTasksByProjectId", this.currentProject.id);
  },
  computed: {
    ...mapState(["currentProject"]),
    tasks() {
      return this.currentProject.tasks;
    }
  },
  methods: {
    returnToListProjects() {
      this.$store.dispatch("setCurrentProject", "");
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
    }
  }
};
</script>
