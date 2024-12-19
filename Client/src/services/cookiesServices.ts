import Cookies from "universal-cookie";

const cookie = new Cookies();
class CookieServices {
  getCookie(name: string): string | undefined {
    return cookie.get(name);
  }
  setCookie(name: string, value: string | number, options?: { [key: string]: string | number }): void {
    cookie.set(name, value, { ...options });
  }
  removeCookie(name: string, options?: { [key: string]: string | number }): void {
    cookie.remove(name, options);
  }
}


export default new CookieServices();