/**
  * @description 为localStorage添加过期时间
  * @param {number}  expires 过期时间，单位：天  默认为0就是不设过期时间
*/
const _localStorage = localStorage
export class webLocalStorage {
  private expires: number;
  constructor(expire: number = 0) {
    this.expires = expire
  }
  setItem(key: string, value: any) {
    const Item = typeof value === 'string' ? { 'value': JSON.parse(value) } : { 'value': value }
    const data = {
      ...Item,
      expires: this.expires && Date.now() + (this.expires * 1000 * 60 * 60 * 24)
    };
    return _localStorage.setItem(key, JSON.stringify(data));
  }
  getItem(key: string) {
    const loValue = _localStorage.getItem(key);
    if (!loValue) {
      return null;
    }
    const data = JSON.parse(loValue);
    if (this.expires && Date.now() > data.expires) {
      _localStorage.removeItem(key);
      return null;
    }
    return data.value;
  }

  removeItem(key: string) {
    _localStorage.removeItem(key);
  }
}

export function LocalStorage(expires?: number) {
  return new webLocalStorage(expires)
}
