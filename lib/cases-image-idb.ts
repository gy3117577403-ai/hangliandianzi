/**
 * 實戰案例頁上傳圖（Base64 data URL）專用 IndexedDB，避免 localStorage 配額不足導致整份案例資料無法寫入。
 */

const DB_NAME = "hanglian-cases";
const DB_VERSION = 1;
const STORE = "caseImages";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("indexedDB unavailable"));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error ?? new Error("indexedDB.open failed"));
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
  });
}

export function caseImageKeyBlueprint(id: number): string {
  return `case-bp-${id}`;
}

export function caseImageKeyProblem(id: number): string {
  return `case-prob-${id}`;
}

export function caseImageKeySopOld(id: number): string {
  return `case-sop-${id}-old`;
}

export function caseImageKeySopNew(id: number): string {
  return `case-sop-${id}-new`;
}

export async function putCaseImage(key: string, dataUrl: string): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("tx error"));
      tx.onabort = () => reject(tx.error ?? new Error("tx abort"));
      tx.objectStore(STORE).put(dataUrl, key);
    });
  } finally {
    db.close();
  }
}

async function getCaseImage(key: string): Promise<string | null> {
  const db = await openDb();
  try {
    return await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const r = tx.objectStore(STORE).get(key);
      r.onerror = () => reject(r.error ?? new Error("get failed"));
      r.onsuccess = () => {
        const v = r.result;
        resolve(typeof v === "string" ? v : null);
      };
    });
  } finally {
    db.close();
  }
}

export async function loadCaseImages(keys: readonly string[]): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const k of keys) {
    const dataUrl = await getCaseImage(k);
    if (dataUrl) out[k] = dataUrl;
  }
  return out;
}
