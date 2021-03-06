/* global document */

import renderStorybookUI from '@kadira/storybook-ui';
import Provider from './provider';

const rootEl = document.getElementById('root');
renderStorybookUI(rootEl, new Provider());