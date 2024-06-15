import { MMKV } from "react-native-mmkv";

class ExtendedMMKV extends MMKV {
  setObject<T>(key: string, value: T): void {
    this.set(key, JSON.stringify(value));
  }

  getObject<T>(key: string): T | null {
    const res = this.getString(key);
    return res ? (JSON.parse(res) as T) : null;
  }
}

export const storage = new ExtendedMMKV();
