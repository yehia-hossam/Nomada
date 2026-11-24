// Lenis instance is exposed on window so any component can call scrollTo / stop / start.
interface Window {
  lenis?: import("lenis").default;
}
