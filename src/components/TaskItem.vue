<template>
  <v-card
    v-click-outside="saveEditing"
    class="mx-auto task"
    @click="editTask"
    v-longclick="dragOn"
  >
    <v-list-item three-line :class="{ urgent: task.urgent }">
      <v-list-item-content>
        <div class="mb-2 task-title" v-show="!edit">
          {{ task.title }}
        </div>

        <v-textarea
          v-if="edit"
          type="text"
          auto-grow
          outlined
          :value="task.title"
          class="task-title"
          dense
          rows="1"
          placeholder="Titre"
        />

        <div v-show="!edit" class="task-content">
          {{ task.description }}
        </div>

        <v-textarea
          v-if="edit"
          type="text"
          auto-grow
          outlined
          :value="task.description"
          class="task-content"
          dense
          rows="1"
          placeholder="Description"
        />

        <div class="overline text-right" v-show="!edit">
          {{ task.points }} pts
        </div>

        <v-text-field
          v-if="edit"
          type="number"
          class="overline"
          outlined
          :value="task.points"
          suffix="PTS"
          dense
        />

        <v-switch v-if="edit" label="Urgent" color="red"></v-switch>
      </v-list-item-content>

      <v-list-item-avatar size="30" color="grey">
        <span class="white--text body-2">RB</span>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "TaskItem",
  data: () => ({
    draggingElement: false,
    edit: false
  }),
  props: {
    task: Object
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
    },
    saveEditing() {
      this.edit = false;
    }
  },
  directives: {
    ClickOutside
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

.task-content {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
  font-size: 0.875rem;
}

.task-title {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
  font-size: 1.3rem;
}

.urgent {
  border-left: solid 5px #f44336;
}
</style>