import ProjectList from '../containers/ProjectsContainer'
import Dashboard from '../containers/KanbanDashboard'
export const routes = [
    { path: '/', component: ProjectList },
    { path: '/projet/:projectName', component: Dashboard }
];