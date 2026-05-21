interface Cache {
  value: unknown;
  lastUsed: number;
  useCount: number;
  createdAt: number;
}

function memoization(
  fun: Function,
  maxSize = Infinity,
  strategy: string | Function = "LRU",
) {
  const cache: { [key: string]: Cache } = {};
  let cacheSize = 0;

  function evict() {
    if (cacheSize < maxSize) {
      return;
    }

    const entries = Object.entries(cache);
    let keyToRm = entries[0][0];

    if (strategy === "LRU") {
      for (const [key, entry] of entries) {
        if (entry.lastUsed < cache[keyToRm].lastUsed) keyToRm = key;
      }
    } else if (strategy === "LFU") {
      for (const [key, entry] of entries) {
        if (entry.useCount < cache[keyToRm].lastUsed) keyToRm = key;
      }
    } else if (strategy === "TTL") {
      for (const [key, entry] of entries) {
        if (entry.createdAt < cache[keyToRm].createdAt) keyToRm = key;
      }
    } else if (typeof strategy === "function") {
      keyToRm = strategy(cache);
    }

    delete cache[keyToRm];
    cacheSize--;
  }
}
