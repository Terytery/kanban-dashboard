<template>
  <v-container>
    <v-row justify="center">
      <h1 class="title-project mb-5">Kanban dashboard</h1>
      <v-card outlined>
        <v-card-title>Connexion au dashboard</v-card-title>

        <v-card-text>
          <v-text-field
            label="Email"
            type="text"
            v-model="email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" rounded elevation="0" @click="connectUser()">
            Connexion
          </v-btn>

          <v-btn text rounded @click="connectAsGuest()">
            Continuer en invité
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "UserAuthentication",
  data: () => ({
    email: "",
    password: "",
    wrongCredentials: false,
    showPassword: false
  }),
  methods: {
    connectUser() {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLiJ4yXBbS0sg_okZvRbDLvrYZ0qVMEDA",
          {
            email: this.email,
            password: this.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          this.$store.dispatch("connectUser", response.data);
        })
        .catch(() => (this.wrongCredentials = true));
    },
    connectAsGuest() {
      this.$store.dispatch("connectGuest");
    }
  }
};
</script>

<style scoped>
.title-project {
  width: 100%;
  text-align: center;
}
</style>