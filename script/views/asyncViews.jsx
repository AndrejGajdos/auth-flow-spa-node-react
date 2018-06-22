import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => (
  <div />
);

export const AsyncAboutView = Loadable({
  loader: () => import('about/AboutView'),
  loading: () => <Loading />,
});

export const AsyncHomeView = Loadable({
  loader: () => import('home/HomeView'),
  loading: () => <Loading />,
});
