import { firebase } from '@firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBLiJ4yXBbS0sg_okZvRbDLvrYZ0qVMEDA",
    authDomain: "kanban-dashboard-80770.firebaseapp.com",
    databaseURL: "https://kanban-dashboard-80770.firebaseio.com",
    projectId: "kanban-dashboard-80770",
    storageBucket: "kanban-dashboard-80770.appspot.com",
    messagingSenderId: "504401365621",
    appId: "1:504401365621:web:b7a14fd305cb093af0c63c"
})

firebase.analytics()

export const db = app.firestore()
