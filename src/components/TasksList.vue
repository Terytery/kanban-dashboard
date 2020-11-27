<template>
  <v-col>
    <v-list>
      <h3 class="text-center">{{ title }}</h3>
      <v-list-item-group>
        <v-list-item v-for="n in 3" :key="n" cols="12" md="4">
          <v-card>{{ tasks }}</v-card>
        </v-list-item>
      </v-list-item-group>
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
