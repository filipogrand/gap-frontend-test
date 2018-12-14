import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  // Use Service get method to call session data and return available key
  get(key: string) {
    const item = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
    if (!item || item === 'null') {
      return null;
    }

    if (item.charAt(0) === '{' || item.charAt(0) === '[') {
      return JSON.parse(item);
    }

    return item;
  }

  // Use Service set method to call session data and save on session storage specific key
  set(key: string, value: any, permanent?: boolean) {
    if (typeof value === 'object' || typeof value.length === 'number') {
      value = JSON.stringify(value);
    }

    if (permanent) {
      window.localStorage.setItem(key, value);
    }

    return window.sessionStorage.setItem(key, value);
  }

  // Use Service unset method remove key from session storage
  unset(key: string) {
    window.localStorage.removeItem(key);
    return window.sessionStorage.removeItem(key);
  }

  // Use Service unsetAll method remove all, yes all keys from session storage
  unsetAll() {
    window.localStorage.clear();
    return window.sessionStorage.clear();
  }
}
