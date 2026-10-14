(() => {
 const app = window.PythonBase;
 const normalize = text => String(text).toLowerCase().replace(/ё/g, 'е').replace(/[^\p{L}\p{N}_]+/gu, ' ').trim();
 const synonyms = [
 ['список','списки','list','лист'], ['словарь','словари','dict','dictionary'], ['строка','строки','str','string'],
 ['множество','множества','set','дубли','дубликаты','уникальные'], ['кортеж','кортежи','tuple'],
 ['декоратор','декораторы','decorator','обертка','wrapper'], ['ошибка','ошибки','исключение','исключения','error','exception'],
 ['копия','копирование','copy','deepcopy'], ['повтор','повторить','retry'], ['функция','функции','function','def'],
 ['генератор','генераторы','generator','yield'], ['контекст','контекстный','with','contextmanager'],
 ];
 const distanceOne = (a,b) => {
  if (Math.abs(a.length-b.length)>1) return false;
  let i=0,j=0,errors=0;
  while(i<a.length && j<b.length) {
   if(a[i]===b[j]) {i++;j++;continue;}
   if(++errors>1)return false;
   if(a.length>=b.length)i++;
   if(b.length>=a.length)j++;
  }
  return errors + (i<a.length || j<b.length ? 1 : 0) <= 1;
 };
 app.buildSearchIndex = () => {
  app.searchIndex = app.catalog.tracks[1].technologies.filter(tech => tech.status === 'ready' && app.libraries[tech.id]).flatMap(tech => tech.categories.flatMap(category => {
   const library = app.libraries[tech.id];
   if(category.id === 'methods') return Object.entries(library.methods || {}).flatMap(([group,rows],groupIndex)=>rows.map(([title,description,code],i)=>({
    technology:tech.title,technologyId:tech.id,title,topicTitle:group,category:category.title,categoryId:'methods',description,code,url:`#/aqa/${tech.id}/methods?section=method-${groupIndex}-${i}`,aliases:group,
   })));
   return library[category.id].flatMap(topic => topic.sections.map(section => ({
    technology:tech.title,technologyId:tech.id,title:section.title,topicTitle:topic.title,category:category.title,categoryId:category.id,
    description:(section.paragraphs || []).join(' '), code:section.example || section.syntax || '',
    url:app.topicURL(category.id,topic.id,section.id,tech.id), aliases:(topic.aliases || []).join(' '),
    extra:[topic.quick?.summary, section.note, ...(section.explain||[]), ...(section.useWhen||[]), ...(section.steps||[]), ...(section.mistakes||[]),section.template].filter(Boolean).join(' '),
   })));
  })).map(entry=>({...entry, titleNorm:normalize(entry.title), topicNorm:normalize(entry.topicTitle), textNorm:normalize([entry.title,entry.topicTitle,entry.description,entry.code,entry.aliases,entry.extra].join(' '))}));
 };
 app.search = (query, category = 'all') => {
  const normalized=normalize(query).slice(0,200);
  if(!normalized)return [];
  const tokens=normalized.split(/\s+/).filter(Boolean).slice(0,12);
  return app.searchIndex.filter(e=>category==='all'||e.categoryId===category).map(entry=>{
   let score=0,typo=false;
   for(const token of tokens) {
    if(entry.titleNorm.includes(token))score+=30;
    else if(entry.topicNorm.includes(token))score+=20;
    else if(entry.textNorm.includes(token))score+=8;
    else {
     const variants=synonyms.find(group=>group.includes(token)) || [];
     if(variants.some(word=>entry.textNorm.split(' ').includes(word)))score+=4;
     else if(token.length>=5 && (entry.titleNorm+' '+entry.topicNorm).split(' ').some(word=>distanceOne(token,word))) {score+=2;typo=true;}
     else return null;
    }
   }
   if(entry.titleNorm===normalized)score+=60;
   if(entry.categoryId==='methods' && normalize(entry.title.split('(')[0])===normalized)score+=90;
   return {...entry,score,typo};
  }).filter(Boolean).sort((a,b)=>b.score-a.score).slice(0,50);
 };
 app.normalizeSearch=normalize;
})();
