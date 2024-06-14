export function getCookie(cookieName: string) {
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    const cookie = c.trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}
