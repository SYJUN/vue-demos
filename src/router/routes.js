import store from '../store';

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    // loading: require('../views/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    // error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}

export default [
  {
    path: '/home',
    name: 'home',
    component: () => lazyLoadView(import('../views/home')),
    meta: { 
      requireAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => lazyLoadView(import('../views/home')),
    meta: { 
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('../views/login')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('../views/_404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  {
    path: '*',
    redirect: '404',
  },
]
