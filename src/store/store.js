import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../firebase"

Vue.use(Vuex)

export const GET_PROJECTS = 'GET_PROJECTS'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'

export const store = new Vuex.Store({
    state: {
        projects: [],
        users: [],
        currentProject: {}
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
        setCurrentProject({ commit }, payload) {
            commit(SET_CURRENT_PROJECT, payload)
        },
    },
    mutations: {
        [GET_PROJECTS](state, payload) {
            state.projects = payload
        },

        [SET_CURRENT_PROJECT](state, payload) {
            state.currentProject = payload
        },

    }
})