import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../firebase"

Vue.use(Vuex)

export const GET_PROJECTS = 'GET_PROJECTS'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'
export const REMOVE_CURRENT_PROJECT = 'REMOVE_CURRENT_PROJECT'
export const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS'
export const GET_USERS = 'GET_USERS'
export let unsubscribe

export const store = new Vuex.Store({
    state: {
        projects: [],
        users: [],

        currentProject: {
            id: "",
            name: "",
            dateStart: "",
            dateEnd: "",
            tasks: {
                toDo: [],
                inProgress: [],
                inTest: [],
                done: []
            }
        }
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
        removeCurrentProject({ commit }) {
            unsubscribe()

            const emptyProject = {
                id: "",
                name: "",
                dateStart: "",
                dateEnd: "",
                tasks: {
                    toDo: [],
                    inProgress: [],
                    inTest: [],
                    done: []
                }
            }
            commit(REMOVE_CURRENT_PROJECT, emptyProject)
        },
        getTasksByProjectId({ commit }, payload) {
            unsubscribe = db.collection("projects").doc(payload).collection("tasks").onSnapshot(querySnapshot => {
                let tasksArray = {
                    toDo: [],
                    inProgress: [],
                    inTest: [],
                    done: [],
                }
                querySnapshot.forEach(doc => {
                    let task = doc.data()
                    task.id = doc.id

                    switch (task.category) {
                        case "toDo":
                            tasksArray.toDo.push(task)
                            break
                        case "inProgress":
                            tasksArray.inProgress.push(task)
                            break
                        case "inTest":
                            tasksArray.inTest.push(task)
                            break
                        case "done":
                            tasksArray.done.push(task)
                            break
                    }
                })
                commit(GET_PROJECT_TASKS, tasksArray)
            })
        },
        getUsers({ commit }) {
            db.collection("users").onSnapshot(querySnapshot => {
                let userArray = []

                querySnapshot.forEach(doc => {
                    let user = doc.data()
                    user.id = doc.id
                    userArray.push(user)
                })
                commit(GET_USERS, userArray)
            })
        },
    },
    mutations: {
        [GET_PROJECTS](state, payload) {
            state.projects = payload
        },
        [SET_CURRENT_PROJECT](state, payload) {
            state.currentProject.id = payload.id
            state.currentProject.name = payload.name
            state.currentProject.dateEnd = payload.dateEnd
            state.currentProject.dateStart = payload.dateStart
        },
        [REMOVE_CURRENT_PROJECT](state, payload) {
            state.currentProject = payload
        },
        [GET_PROJECT_TASKS](state, payload) {
            state.currentProject.tasks = payload
        },
        [GET_USERS](state, payload) {
            state.users = payload
        }
    }
})