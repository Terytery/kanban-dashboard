import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../firebase"

Vue.use(Vuex)

export const GET_PROJECTS = 'GET_PROJECTS'
export const CREATE_PROJECT = 'CREATE_PROJECT'

export const store = new Vuex.Store({
    state: {
        projects: [],
        users: []
    },
    actions: {
        getProjects({ commit }) {
            db.collection("projects").onSnapshot(querySnapshot => {
                let projectsArray = []

                querySnapshot.forEach(doc => {
                    let project = doc.data()
                    project.id = doc.id
                    projectsArray.push(project)
                })
                commit(GET_PROJECTS, projectsArray)
            })
        },

        getProject() { },
        deleteProject() { },
        addUserToProject() { },
        deleteUserToProject() { },

    },
    mutations: {
        [GET_PROJECTS](state, payload) {
            state.projects = payload
        },

        [CREATE_PROJECT](state, payload) {
            state.projects = payload
        }

    }
})