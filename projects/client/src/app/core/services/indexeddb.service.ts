import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'myAppDB';
  private version = 1;

  constructor() {}

  /**
   * Initializes the IndexedDB with the given object store name
   * @param storeName - Name of the object store
   */
  initDB(storeName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      };

      request.onsuccess = event => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = event => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  /**
   * Saves data to the specified object store
   * @param storeName - Name of the object store
   * @param data - Data object to save (must have an `id` property)
   */
  saveData(storeName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.initDB(storeName).then(db => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        store.put(data);

        transaction.oncomplete = () => resolve();
        transaction.onerror = event => reject((event.target as IDBOpenDBRequest).error);
      }).catch(reject);
    });
  }


  /**
   * Retrieves data from the specified object store by ID
   * @param storeName - Name of the object store
   * @param id - ID of the object to retrieve
   */
  getData(storeName: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.initDB(storeName).then(db => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = event => reject((event.target as IDBOpenDBRequest).error);
      }).catch(reject);
    });
  }

  /**
   * Deletes data from the specified object store by ID
   * @param storeName - Name of the object store
   * @param id - ID of the object to delete
   */
  deleteData(storeName: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.initDB(storeName).then(db => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = event => reject((event.target as IDBOpenDBRequest).error);
      }).catch(reject);
    });
  }

  /**
   * Clears all data from the specified object store
   * @param storeName - Name of the object store
   */
  clearStore(storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.initDB(storeName).then(db => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = event => reject((event.target as IDBOpenDBRequest).error);
      }).catch(reject);
    });
  }
}
