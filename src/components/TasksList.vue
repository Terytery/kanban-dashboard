<template>
  <v-col>
    <v-list class="tasks-list" outlined>
      <v-subheader>{{ title }}</v-subheader>

      <v-card v-for="n in 5" :key="n" class="mx-auto task">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              5 pts
            </div>
            <v-list-item-title class="headline mb-1">
              {{ tasks }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Greyhound divisely hello coldly
              fonwderfully</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar size="30" color="grey">
            <span class="white--text body-2">RB</span>
          </v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-list>
  </v-col>
</template>

<script>
export default {
  name: "TasksList",
  data: () => ({}),
  props: {
    title: String,
    tasks: String
  }
};
</script>

<style scoped>
.tasks-list {
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
</style>