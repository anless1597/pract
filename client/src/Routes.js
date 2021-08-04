import Profile from "./pages/Profile";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, TASK_ROUTE, USER_ROUTE} from "./urls/Consts";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: Profile
    },
    {
        path: USER_ROUTE + TASK_ROUTE + '/:id',
        Component: Profile
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]