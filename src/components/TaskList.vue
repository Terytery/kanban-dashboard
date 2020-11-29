<template>
  <v-col>
    <v-list class="task-list" outlined>
      <v-subheader>{{ title }}</v-subheader>
      <TaskItem v-for="task in tasks" v-bind:key="task.id" :task="task" />
    </v-list>
  </v-col>
</template>

<script>
import TaskItem from "../components/TaskItem";
import { mapState } from "vuex";

export default {
  name: "TaskList",
  components: {
    TaskItem
  },
  data: () => ({
    draggingElement: false,
    edit: false
  }),
  props: {
    title: String,
    taskCode: String
  },
  computed: {
    ...mapState(["currentProject"]),
    tasks() {
      if (this.currentProject.tasks) {
        return this.currentProject.tasks[this.taskCode];
      }
      return [];
    }
  },
  methods: {
    dragOn() {
      this.draggingElement = true;
      console.log("Drag and drop");
    },
    editTask() {
      if (!this.draggingElement) {
        this.edit = true;
      }
    }
  }
};
</script>

<style scoped>
.task-list {
  height: 100%;
  border-radius: 10px;
}

.v-subheader {
  justify-content: center;
}

.task {
  box-shadow: none !important;
  border-top: thin solid rgba(255, 255, 255, 0.12);
  border-radius: 0 !important;
}

.task:hover {
  background-color: #333;
}
</style>