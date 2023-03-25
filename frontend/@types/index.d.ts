// this file must be a module - at least one import/export will force that
export {};

declare module 'react-native-collapsible' {
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  interface CollapsibleProps {
    children?: React.ReactNode;
  }
}
