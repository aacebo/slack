export function getCookie(name: string, cookies?: string) {
  if (cookies) {
    const found = cookies.split(';').find(c => c.trim().startsWith(`${name}=`));

    if (found) {
      return found.split('=')[1].trim();
    }
  }
}
