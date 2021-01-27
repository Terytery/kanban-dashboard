<template>
  <v-card v-click-outside="saveEditing" class="mx-auto task" @click="editTask">
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
          class="task-title"
          dense
          rows="1"
          placeholder="Titre"
          v-model="task.title"
        />

        <div v-show="!edit" class="task-content">
          {{ task.description }}
        </div>

        <v-textarea
          v-if="edit"
          type="text"
          auto-grow
          outlined
          v-model="task.description"
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
          v-model="task.points"
          suffix="PTS"
          dense
        />

        <v-switch
          v-model="task.urgent"
          v-if="edit"
          label="Urgent"
          color="red"
        ></v-switch>

        <v-btn
          @click="deleteTask"
          v-if="!edit"
          fab
          absolute
          dark
          elevation="0"
          x-small
          class="before-delete-task"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>

        <v-btn
          v-if="edit"
          @click="deleteTask"
          fab
          absolute
          dark
          color="red"
          elevation="0"
          x-small
          class="delete-task"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-content>

      <v-list-item-avatar @click="changeUser" size="30" :color="userColor">
        <span :class="`${textUserColor}--text body-2`">{{ userInitials }}</span>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapState } from "vuex";
import { db } from "../firebase";
import stc from "string-to-color";

export default {
  name: "TaskItem",
  data: () => ({
    edit: false
  }),
  props: {
    task: Object
  },
  computed: {
    ...mapState(["currentProject"]),
    userInitials() {
      if (this.task.inCharge) {
        return this.task.inCharge
          .toString()
          .split(" ")
          .map(n => n[0])
          .join("");
      }
      return "";
    },
    userColor() {
      if (this.task.inCharge) {
        const backgrounColor = stc(this.task.inCharge);
        return backgrounColor;
      }
      return "grey";
    },
    textUserColor() {
      const r = parseInt(this.userColor.substr(1, 2), 16);
      const g = parseInt(this.userColor.substr(3, 2), 16);
      const b = parseInt(this.userColor.substr(5, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness >= 150 ? "black" : "white";
    }
  },
  methods: {
    editTask() {
      this.edit = true;
    },
    saveEditing() {
      if (this.edit) {
        db.collection("projects")
          .doc(this.currentProject.id)
          .collection("tasks")
          .doc(this.task.id)
          .set(this.task);

        this.edit = false;
      }
    },
    deleteTask() {
      db.collection("projects")
        .doc(this.currentProject.id)
        .collection("tasks")
        .doc(this.task.id)
        .delete();
    },
    changeUser() {
      this.$emit("changeUser", this.task);
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

.delete-task {
  bottom: 32px;
  right: 16px;
}
.before-delete-task {
  bottom: 7px;
  left: 10px;
}
</style>