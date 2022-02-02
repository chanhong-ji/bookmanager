// Server
export function fetchData() {
  return fetch("/api/check").then((res) => res.json());
}
