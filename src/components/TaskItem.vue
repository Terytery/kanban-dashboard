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
      <v-list-item-avatar size="30" color="grey" @click="getUsers">
        <span class="white--text body-2"></span>

        <v-dialog v-model="modalAvatar" scrollable max-width="300px">
          <v-card>
            <v-card-title>Responsable ?</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-radio-group v-model="dialogm1" column>
                <v-radio
                  v-for="user in users"
                  :key="user.id"
                  :label="user.name"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="error" text @click="dialog = false"> FERMER </v-btn>
              <v-btn color="blue" text @click="dialog = false">
                SELECTIONNER
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "TaskItem",
  data: () => ({
    edit: false,
    modalAvatar: false,
    dialogm1: ""
  }),
  props: {
    task: Object
  },
  computed: {
    ...mapState(["currentProject"]),
    ...mapState(["users"])
  },
  methods: {
    editTask() {
      this.edit = true;
    },
    saveEditing() {
      db.collection("projects")
        .doc(this.currentProject.id)
        .collection("tasks")
        .doc(this.task.id)
        .set(this.task);

      this.edit = false;
    },
    deleteTask() {
      db.collection("projects")
        .doc(this.currentProject.id)
        .collection("tasks")
        .doc(this.task.id)
        .delete();
    },
    getUsers() {
      this.$store.dispatch("getUsers");
      this.modalAvatar = true;
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
</style>