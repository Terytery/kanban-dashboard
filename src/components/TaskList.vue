<template>
  <v-col>
    <v-list class="task-list" outlined>
      <v-subheader>{{ title }}</v-subheader>
      <draggable group="tasks" v-model="orderedTasks" class="draggable-test">
        <TaskItem
          v-for="task in orderedTasks"
          v-bind:key="task.id"
          :task="task"
          @changeUser="changeUser"
        />
      </draggable>
    </v-list>
  </v-col>
</template>

<script>
import TaskItem from "../components/TaskItem";
import _ from "lodash";
import draggable from "vuedraggable";
import { db } from "../firebase";
import { mapState } from "vuex";

export default {
  name: "TaskList",
  components: {
    TaskItem,
    draggable
  },
  data: () => ({
    draggingElement: false,
    edit: false
  }),
  props: {
    title: String,
    tasks: Array,
    category: String
  },
  computed: {
    ...mapState(["currentProject"]),
    orderedTasks: {
      get() {
        return _.orderBy(this.tasks, "position");
      },
      set(tasks) {
        let i = 0;
        tasks.forEach((task) => {
          task.position = i;
          task.category = this.category;

          db.collection("projects")
            .doc(this.currentProject.id)
            .collection("tasks")
            .doc(task.id)
            .set(task);
          i++;
        });
      }
    }
  },
  methods: {
    changeUser(task) {
      this.$emit("changeUser", task);
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

.draggable-test {
  height: 100%;
}
</style>