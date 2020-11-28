<template>
  <v-container>
    <h1 class="text-center">ProjectName</h1>

    <p class="overline text-center">Tasks list</p>

    <v-row>
      <TasksList title="TO DO" tasks="Salut" />

      <TasksList title="IN PROGRESS" tasks="Bonjour" />

      <TasksList title="DONE" tasks="Gracias" />
    </v-row>
  </v-container>
</template>

<script>
import TasksList from "../components/TasksList";

export default {
  name: "KanbanDashboard",
  components: {
    TasksList
  },
  data: () => ({})
};
</script>
