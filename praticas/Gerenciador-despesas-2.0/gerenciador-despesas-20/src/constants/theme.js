export const CATEGORIES = ["Alimentação", "Transporte", "Lazer", "Contas"];

export const THEMES = {
  light: {
    background: "#f5f7fb",
    surface: "#ffffff",
    surfaceSoft: "#f8fafc",
    primary: "#4f46e5",
    primarySoft: "#e0e7ff",
    primaryText: "#ffffff",
    text: "#0f172a",
    textMuted: "#64748b",
    border: "#dbe3f0",
    inputBackground: "#ffffff",
    danger: "#dc2626",
    placeholder: "#94a3b8",
    emptyBackground: "#eef2ff",
    emptyIcon: "#4f46e5",
  },
  dark: {
    background: "#0f172a",
    surface: "#111827",
    surfaceSoft: "#172033",
    primary: "#818cf8",
    primarySoft: "#312e81",
    primaryText: "#ffffff",
    text: "#f8fafc",
    textMuted: "#cbd5e1",
    border: "#334155",
    inputBackground: "#0b1120",
    danger: "#f87171",
    placeholder: "#94a3b8",
    emptyBackground: "#1e293b",
    emptyIcon: "#818cf8",
  },
};

export function getTheme(scheme) {
  return scheme === "dark" ? THEMES.dark : THEMES.light;
}
