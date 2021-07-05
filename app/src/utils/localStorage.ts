export const getFromStorage = (query: string): string | null =>
  localStorage.getItem(query);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setStorage = (query: string, item: any): void =>
  localStorage.setItem(query, JSON.stringify(item));

export const clearStorage = (): void => localStorage.clear();
