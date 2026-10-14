(() => {
 const app = window.PythonBase;
 app.getTechnology = id => app.catalog.tracks.find(t => t.id === 'aqa').technologies.find(t => t.id === id);
 app.activateTechnology = id => {
  if (!app.libraries[id] || !app.getTechnology(id)?.categories) return false;
  app.activeTechnology = id;
  app.content = app.libraries[id];
  app.categories = app.getTechnology(id).categories;
  return true;
 };
 app.activateTechnology('python');
 app.topicURL = (category, id, section = '', technology = app.activeTechnology) => `#/aqa/${technology}/${category}/${id}${section ? '?section=' + encodeURIComponent(section) : ''}`;
 app.parseRoute = (hash = location.hash) => {
  const [path, query] = hash.replace(/^#\/?/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  return { parts, section: new URLSearchParams(query || '').get('section'), key: path || 'aqa/python' };
 };
 // Старые ссылки остаются рабочими. Их индексы относятся к исходному порядку материалов.
 app.migrateLegacy = () => {
  if (location.hash === '#top') { history.replaceState(null, '', '#/aqa/python'); return; }
  const match = location.hash.match(/^#(topic|class|oop|decorator|context|builtin)-(\d+)$/);
  if (!match) return;
  const category = { topic: 'topics', class: 'classes', oop: 'oop', decorator: 'decorators', context: 'contexts', builtin: 'builtins' }[match[1]];
  const topic = app.libraries.python[category]?.[Number(match[2])];
  if (topic) history.replaceState(null, '', app.topicURL(category, topic.id, '', 'python'));
 };
 app.resolveSection = (topic, id) => topic?.sectionAliases?.[id] || id;
 app.getTopic = (category, id, technology = app.activeTechnology) => app.libraries[technology]?.[category]?.find?.(topic => topic.id === id);
})();
