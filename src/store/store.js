import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    projects: {
      id: '',
      name: '',
      dateStart: '',
      dateEnd: '',
      githubRepoLink: '',
      users: [],
      tasks: [
        {
          id: '',
          name: '',
          description: '',
          date: '',
          priority: ''
        },
      ],
    },

    users: {
      id: '',
      email: '',
      profilePicture: '',
      username: '',
      description: '',
    },

  },
  actions: {
    getProjects() { },
    getProject() { },
    deleteProject() { },
    addUserToProject() { },
    deleteUserToProject() { },

  },
  mutations: {}
})