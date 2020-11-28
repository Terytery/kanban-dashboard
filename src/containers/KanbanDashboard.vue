<template>
  <v-container>
    <h1 class="text-center">ProjectName</h1>

    <p class="overline text-center">Tasks list</p>

    <v-row>
      <TaskList :title="tasksToDo.title" :tasks="tasksToDo" />

      <TaskList :title="tasksInProgress.title" :tasks="tasksInProgress" />

      <TaskList :title="tasksInTest.title" :tasks="tasksInTest" />

      <TaskList :title="tasksDone.title" :tasks="tasksDone" />
    </v-row>

    <v-btn fab fixed dark small color="blue" right bottom>
      <v-icon>mdi-card-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import TaskList from "../components/TaskList";

export default {
  name: "KanbanDashboard",
  components: {
    TaskList
  },
  data: () => ({
    tasksToDo: {
      title: "TO DO",
      name: "Bonjour les amis, comment allez-vous"
    },
    tasksInProgress: {
      title: "IN PROGRESS",
      name: "Hello"
    },
    tasksInTest: {
      title: "IN TEST",
      name: "Adios"
    },
    tasksDone: {
      title: "DONE",
      name: "Gracias"
    }
  })
};
</script>
