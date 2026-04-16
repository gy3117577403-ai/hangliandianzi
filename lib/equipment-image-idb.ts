/**
 * 設備頁上傳圖（Base64 data URL）專用 IndexedDB，避免 localStorage 配額過小導致丟圖。
 */

const DB_NAME = "hanglian-equipment";
const DB_VERSION = 1;
const STORE = "equipmentImages";

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

export async function putEquipmentImage(equipmentId: string, dataUrl: string): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("tx error"));
      tx.onabort = () => reject(tx.error ?? new Error("tx abort"));
      tx.objectStore(STORE).put(dataUrl, equipmentId);
    });
  } finally {
    db.close();
  }
}

export async function getEquipmentImage(equipmentId: string): Promise<string | null> {
  const db = await openDb();
  try {
    return await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const r = tx.objectStore(STORE).get(equipmentId);
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

/** 依序讀取多張圖；任一步失敗則拋錯，由呼叫端降級為無圖 */
export async function loadEquipmentImages(
  equipmentIds: readonly string[],
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const id of equipmentIds) {
    const dataUrl = await getEquipmentImage(id);
    if (dataUrl) out[id] = dataUrl;
  }
  return out;
}
