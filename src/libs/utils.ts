export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};
