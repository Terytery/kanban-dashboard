<template>
  <v-tooltip bottom open-delay="500">
    <template v-slot:activator="{ on, attrs }">
      <div class="connected">
        <v-btn
          small
          text
          elevation="0"
          v-bind="attrs"
          v-on="on"
          @click="disconnectUser()"
        >
          {{ connectedUser.name }}
          <v-icon class="ma-1" small>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
    <span>Se déconnecter</span>
  </v-tooltip>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DisconnectUser",
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["connectedUser"])
  },
  methods: {
    disconnectUser() {
      let user = {
        tokenId: "",
        userId: "",
        name: ""
      };
      this.$store.dispatch("setConnectedUser", user);
    }
  }
};
</script>

<style scoped>
.connected {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
