export function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "tr-TR";
  u.rate = 0.88;
  u.pitch = 1.12;
  window.speechSynthesis.speak(u);
}
