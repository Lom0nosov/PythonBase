/* Точка входа: связывает независимые модули и события интерфейса. */
(() => {
 'use strict';
 const app=window.PythonBase, $=s=>document.querySelector(s), esc=app.escape;
 const readArray=key=>{const value=app.store.read(key,[]);return Array.isArray(value)?value.filter(x=>typeof x==='string'):[];};
 let saved=readArray('saved').map(k=>k.split('/').length===2?'python/'+k:k), recent=readArray('recent').map(k=>k.split('/').length===2?'python/'+k:k);
 let readMode=app.store.read('read-mode','quick')==='detail'?'detail':'quick';
 let currentTopic=null,currentCategory=null,currentRoute='',routeReady=false,toastTimer,scrollTimer,observer;
 const dialog=$('#search-dialog');
 const topicKey=(c,t)=>`${app.activeTechnology}/${c}/${t.id}`;
 const views=()=>app.createViews({saved,recent,readMode,currentCategory});
 function renderSidebar(){ $('#sidebar').innerHTML=views().sidebar(); }
 function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2600);}
 function setReadingMode(mode){
  readMode=mode==='detail'?'detail':'quick';app.store.write('read-mode',readMode);
  $('.quick-view').hidden=readMode!=='quick';$('.detail-view').hidden=readMode!=='detail';
  document.querySelectorAll('[data-read-mode]').forEach(b=>{if(b.hasAttribute('aria-pressed'))b.setAttribute('aria-pressed',String(b.dataset.readMode===readMode));});
  if(readMode==='quick'&&app.parseRoute().section)history.replaceState(null,'',app.topicURL(currentCategory,currentTopic.id));
  setupObserver();
 }
 function setupObserver(){observer?.disconnect();if(!currentTopic||readMode!=='detail')return;
  observer=new IntersectionObserver(entries=>{const entry=entries.find(e=>e.isIntersecting);if(entry)document.querySelectorAll('[data-toc]').forEach(a=>a.classList.toggle('active',a.dataset.toc===entry.target.id));},{rootMargin:'-100px 0px -65% 0px'});
  document.querySelectorAll('.lesson-section').forEach(s=>observer.observe(s));
 }
 function rememberPosition(){if(routeReady&&currentTopic)app.store.write('position:'+currentRoute,{y:Math.round(window.scrollY),mode:readMode});}
 function renderRoute(){
  observer?.disconnect();routeReady=false;clearTimeout(scrollTimer);const route=app.parseRoute();currentRoute=route.key;
  currentTopic=null;currentCategory=null;let html,title='Python';const [track,technology,categoryId,topicId]=route.parts;
  if(track==='qa'){title='QA';html=views().plannedPage('QA','Тест-дизайн, требования и практика ручного тестирования.');}
  else if(['saved','recent'].includes(track)){title=track==='saved'?'Избранное':'Недавно открытые';html=views().collectionPage(track);}
  else if(track==='aqa'&&!technology){title='AQA';html=views().aqaPage();}
  else if(track==='aqa'&&app.getTechnology(technology)?.status==='planned'){const tech=app.getTechnology(technology);title=tech.title;html=views().plannedPage(tech.title,tech.description);}
  else if(!track||(track==='aqa'&&app.getTechnology(technology)?.status==='ready')){
   app.activateTechnology(technology || 'python');
   title=app.getTechnology(app.activeTechnology).title;
   const category=app.categories.find(c=>c.id===categoryId);
   if(!categoryId)html=app.activeTechnology==='python'?views().homepage():views().technologyPage();
   else if(categoryId==='methods'&&!topicId){title='Методы коллекций';html=views().methodsPage(route.section);}
   else if(category&&topicId){const topic=app.getTopic(categoryId,topicId);if(topic){currentTopic=topic;currentCategory=categoryId;route.section=app.resolveSection(topic,route.section);if(app.resumeNext){const position=app.store.read('position:'+currentRoute,{});if(position.mode)readMode=position.mode;}if(route.section)readMode='detail';title=topic.title;recent=[topicKey(categoryId,topic),...recent.filter(k=>k!==topicKey(categoryId,topic))].slice(0,12);app.store.write('recent',recent);html=views().lessonPage(category,topic);}}
   else if(category){title=category.title;html=views().categoryPage(category);}
  }
  if(!html){title='Страница не найдена';html='<section class="empty-card"><h1>Такой страницы пока нет</h1><p>Проверьте ссылку или найдите тему через поиск.</p><a href="#/aqa/python" class="primary-button">Вернуться к Python →</a></section>';}
  $('#main-content').innerHTML=html;document.title=title+' — QA Base';renderSidebar();closeMenu();if(dialog.open)dialog.close();
  const resume=app.resumeNext;app.resumeNext=false;
  requestAnimationFrame(()=>{
   if(route.section&&document.getElementById(route.section))document.getElementById(route.section).scrollIntoView({block:'start',behavior:'instant'});
   else window.scrollTo({top:resume?Number(app.store.read('position:'+currentRoute,{}).y)||0:0,behavior:'instant'});
   $('#main-content').focus({preventScroll:true});routeReady=true;setupObserver();
  });
 }
 function openMenu(){const sidebar=$('#sidebar');sidebar.classList.add('open');$('#nav-backdrop').hidden=false;$('#menu-toggle').setAttribute('aria-expanded','true');$('#main-content').inert=true;document.body.classList.add('nav-open');sidebar.querySelector('button').focus();}
 function closeMenu(){const wasOpen=$('#sidebar').classList.contains('open');$('#sidebar').classList.remove('open');$('#nav-backdrop').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');$('#main-content').inert=false;document.body.classList.remove('nav-open');if(wasOpen)$('#menu-toggle').focus();}
 function openSearch(query=''){closeMenu();$('#search-input').value=query;dialog.showModal();document.body.classList.add('search-open');renderSearch();$('#search-input').focus();}
 function markText(text,query){const clean=String(text).replace(/`/g,'');const term=query.trim();if(!term)return esc(clean);const index=clean.toLowerCase().indexOf(term.toLowerCase());return index<0?esc(clean):esc(clean.slice(0,index))+'<mark>'+esc(clean.slice(index,index+term.length))+'</mark>'+esc(clean.slice(index+term.length));}
 function renderSearch(){const query=$('#search-input').value,results=app.search(query);
  $('#search-status').textContent=query.trim()?`${results.length===50?'Первые ':''}${results.length} результатов`:'';
  $('#search-status').hidden=!query.trim();
  if(!query.trim()){$('#search-results').innerHTML='<p class="search-hint">Найдите ответ в теории, примерах кода и типичных ошибках.</p>';return;}
  $('#search-results').innerHTML=results.length?results.map(r=>`<a class="search-result" href="${r.url}"><span class="result-path">${esc(r.technology)} / ${esc(r.category)} / ${esc(r.topicTitle)}</span><strong>${markText(r.title,query)} <span>↗</span></strong><p>${markText(r.description.slice(0,180),query)}${r.description.length>180?'…':''}</p>${r.typo?'<small>Похожее название</small>':''}</a>`).join(''):`<div class="search-empty"><h3>Совпадений нет</h3><p>Попробуйте короткий запрос: «словарь», «декоратор» или имя функции.</p></div>`;
 }
 async function copy(text){try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;opacity:0';document.body.append(area);area.select();const success=document.execCommand('copy');area.remove();if(!success)throw Error();}toast('Скопировано');return true;}catch{toast('Не удалось скопировать. Выделите текст вручную.');return false;}}
 function updateTheme(){const dark=document.documentElement.dataset.theme==='dark';$('#theme-toggle').setAttribute('aria-label',dark?'Включить светлую тему':'Включить тёмную тему');}
 app.buildSearchIndex();app.migrateLegacy();
 document.addEventListener('click',async event=>{
  const target=event.target;
  if(target.closest('[data-search]'))openSearch();
  const query=target.closest('[data-query]');if(query){if(!dialog.open)openSearch(query.dataset.query);else{$('#search-input').value=query.dataset.query;renderSearch();$('#search-input').focus();}}
  const mode=target.closest('[data-read-mode]');if(mode){setReadingMode(mode.dataset.readMode);if(mode.classList.contains('read-more'))$('.detail-view').scrollIntoView({block:'start'});else if(window.scrollY>$('.lesson-header').offsetTop)$('.lesson-header').scrollIntoView({block:'start'});}
  const code=target.closest('.copy-button');if(code){const success=await copy(code.closest('figure').querySelector('pre').textContent);if(success){code.textContent='Скопировано';setTimeout(()=>code.textContent='Копировать',1800);}}
  const section=target.closest('.section-link');if(section){const url=new URL(location.href);url.hash=location.hash.split('?')[0]+'?section='+encodeURIComponent(section.dataset.section);await copy(url.href);}
  if(target.closest('#share-topic'))await copy(location.href);
  if(target.closest('#bookmark')&&currentTopic){const key=topicKey(currentCategory,currentTopic);saved=saved.includes(key)?saved.filter(x=>x!==key):[...saved,key];const persistent=app.store.write('saved',saved);$('#bookmark').setAttribute('aria-pressed',String(saved.includes(key)));$('#bookmark').textContent=saved.includes(key)?'★ Сохранено':'☆ Сохранить';renderSidebar();toast(persistent?(saved.includes(key)?'Тема добавлена в избранное':'Тема удалена из избранного'):'Закладка сохранена до закрытия страницы: хранилище браузера недоступно.');}
  const filter=target.closest('[data-method-group]');if(filter){document.querySelectorAll('[data-method-group]').forEach(b=>{b.classList.toggle('active',b===filter);b.setAttribute('aria-pressed',String(b===filter));});document.querySelectorAll('[data-group]').forEach(g=>g.hidden=filter.dataset.methodGroup!=='all'&&g.dataset.group!==filter.dataset.methodGroup);}
  if(target.closest('#menu-close')||target.closest('#nav-backdrop'))closeMenu();
  const anchor=target.closest('a[href^="#/"]');if(anchor){rememberPosition();if(anchor.hasAttribute('data-resume'))app.resumeNext=true;if(anchor.getAttribute('href')===location.hash){if(dialog.open)dialog.close();if(anchor.dataset.toc){setReadingMode('detail');document.getElementById(anchor.dataset.toc)?.scrollIntoView({block:'start'});}}}
 });
 $('#menu-toggle').addEventListener('click',()=>$('#sidebar').classList.contains('open')?closeMenu():openMenu());
 $('#theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;app.store.write('theme',theme);updateTheme();});
 dialog.addEventListener('close',()=>document.body.classList.remove('search-open'));
 $('#search-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const box=dialog.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)dialog.close();}});
 $('#search-input').addEventListener('input',renderSearch);
 document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(dialog.open)dialog.close();else openSearch();}
  if(event.key==='Escape'&&dialog.open){event.preventDefault();dialog.close();return;}
  if(event.key==='Escape'&&$('#sidebar').classList.contains('open'))closeMenu();
  if(dialog.open){const links=[...dialog.querySelectorAll('.search-result')];const index=links.indexOf(document.activeElement);if(['ArrowDown','ArrowUp'].includes(event.key)&&links.length){event.preventDefault();const next=event.key==='ArrowDown'?(index+1)%links.length:(index<=0?links.length-1:index-1);links[next].focus();}if(event.key==='Enter'&&event.target===$('#search-input')&&links[0]){event.preventDefault();links[0].click();}}
  if(event.key==='Tab'&&$('#sidebar').classList.contains('open')){const focusables=[...$('#sidebar').querySelectorAll('a,button')];const first=focusables[0],last=focusables.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
 });
 window.addEventListener('hashchange',renderRoute);
 window.addEventListener('scroll',()=>{$('#back-top').hidden=window.scrollY<500;clearTimeout(scrollTimer);scrollTimer=setTimeout(rememberPosition,180);},{passive:true});
 window.addEventListener('pagehide',rememberPosition);
 window.addEventListener('resize',()=>{if(innerWidth>1000)closeMenu();});
 $('#back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
 $('.skip-link').addEventListener('click',e=>{e.preventDefault();$('#main-content').focus();});
 updateTheme();renderRoute();
})();
