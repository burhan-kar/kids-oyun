const KEY = "minik-kasif-pro-v2";

export const emptyProgress = {
  stars: 0,
  sessions: 0,
  completed: {},
  minutesPlayed: 0
};

export function loadProgress() {
  try {
    return { ...emptyProgress, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
