import { mount, unmount } from './bootstrap';

// This file is the entry point for webpack
// The actual mounting logic is in bootstrap.tsx

// Export mount and unmount functions for webpack library
export default {
  mount,
  unmount,
};
