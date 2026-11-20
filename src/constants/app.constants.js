/**
 * Application-wide constants
 */

export const APP_NAME = 'CodeNest';

export const APP_TAGLINE = 'a cozy place for your code & notes';

export const ROUTES = {
  HOME: 'home',
  TUTORIALS: 'tutorials',
  TUTORIAL_VIEW: 'tutorial-view'
};

export const AUTH_PROVIDERS = {
  ANONYMOUS: 'anonymous',
  GOOGLE: 'google'
};

export const TUTORIAL_DEFAULTS = {
  TAGS: [],
  SUMMARY: '',
  PROJECT_LINK: '',
  FAVORITE: false
};

export const DATE_FORMAT = {
  YEAR: 'numeric',
  MONTH: 'short',
  DAY: 'numeric'
};

export const STORAGE_KEYS = {
  THEME: 'codenest_theme',
  USER_PREFERENCES: 'codenest_preferences'
};
