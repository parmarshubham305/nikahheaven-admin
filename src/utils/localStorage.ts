import { jwtDecode } from "jwt-decode";
// const jwtEncode = require('jwt-encode');
import jwtEncode from 'jwt-encode';

export const getLocalUser = (localKey: string) =>
  getDecryptedLocalData(localKey);

export const SECRET = 'c2a3f9b5e1d8g7h0t6k4e2y';

// Get Decrypted Local Data
export const getDecryptedLocalData = (localKey: string) => {
  if (typeof window !== 'undefined') {
    const localEncryptedData = localStorage.getItem(localKey);
    if (localEncryptedData) {
      return decodeLocalData(localEncryptedData);
    }
  } else {
    return null;
  }
};

// Set Encrypted Local Data
export const setEncryptedLocalData = (
  data: any,
  localKey: string,
  secretKey: string,
) => {
  if (typeof window !== 'undefined') {
    const encryptedData = encodeLocalData(data, secretKey);
    localStorage.setItem(localKey, encryptedData);
  }
};

// Encode Local Data
export const encodeLocalData = (data: any, secret = SECRET) =>
  jwtEncode(data, secret);

// Decode Local Data
export const decodeLocalData = (encryptedData: any) =>
jwtDecode(encryptedData);
