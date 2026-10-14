(() => {
 const app = window.PythonBase;
 const prefix = 'qa-base:';
 app.store = {
  read(key, fallback) { try { const value = JSON.parse(localStorage.getItem(prefix + key)); return value === null ? fallback : value; } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; } catch { return false; } },
 };
})();
