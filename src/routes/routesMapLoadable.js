import Loadable from 'react-loadable';
import RouteLoader from "../components/loaders/RouteLoader";

export const Demo = Loadable({
  loader: () => import('./demo'),
  loading: RouteLoader,
});

export const Index = Loadable({
  loader: () => import('./index'),
  loading: RouteLoader,
});

export const NotFound = Loadable({
  loader: () => import('./not-found'),
  loading: RouteLoader,
});
