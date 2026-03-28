/**
 * expo-font `useFonts` only calls `setLoaded(true)` on success. On failure it sets `error` and
 * leaves `loaded` false — the app must still mount or users see a permanent blank screen.
 */
export const isFontBootstrapComplete = (loaded: boolean, error: Error | null | undefined): boolean =>
  loaded || error != null;
