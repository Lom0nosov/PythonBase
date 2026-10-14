(() => {
 const app=window.PythonBase;
 const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 app.escape=escape;
 app.inline = text => escape(text).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
 // Small dependency-free Python tokenizer: match before HTML escaping so code stays inert.
 app.highlight = code => {
  const pattern=/(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:def|class|return|if|elif|else|for|while|in|not|and|or|is|try|except|finally|raise|with|as|from|import|yield|lambda|pass|break|continue|nonlocal|global|assert|async|await)\b|\b(?:True|False|None)\b|\b\d+(?:\.\d+)?\b|@[\w.]+)/g;
  let result='',last=0;
  for(const match of String(code).matchAll(pattern)) {
   result+=escape(code.slice(last,match.index));const token=match[0];
   const kind=token.startsWith('#')?'comment':/^["']/.test(token)?'string':/^\d/.test(token)?'number':token.startsWith('@')?'decorator':'keyword';
   result+=`<span class="syntax-${kind}">${escape(token)}</span>`;last=match.index+token.length;
  }
  return result+escape(code.slice(last));
 };
 app.code = (text,label='Пример · Python') => `<figure class="code-block"><figcaption><span>${escape(label)}</span><button class="copy-button" type="button" aria-label="Скопировать код">Копировать</button></figcaption><pre tabindex="0"><code>${app.highlight(text)}</code></pre></figure>`;
 app.output = text => text == null ? '' : `<figure class="example-output"><figcaption>Результат выполнения</figcaption><pre>${escape(text)}</pre></figure>`;
 app.list = (title,items,className='') => items?.length?`<div class="explanation ${className}"><h4>${title}</h4><ul>${items.map(x=>`<li>${app.inline(x)}</li>`).join('')}</ul></div>`:'';
 app.section = (section,index) => `<section class="lesson-section" id="${escape(section.id)}">
  <div class="section-title"><span>${String(index+1).padStart(2,'0')}</span><h2>${escape(section.title)}</h2><button class="link-button section-link" data-section="${escape(section.id)}" aria-label="Скопировать ссылку на раздел ${escape(section.title)}">#</button></div>
  ${(section.paragraphs||[]).map(text=>`<p>${app.inline(text)}</p>`).join('')}
  ${app.list('Когда применять',section.useWhen)}
  ${section.example?app.code(section.example):''}${app.output(section.output)}
  ${section.syntax?`<details class="syntax-details"><summary>Синтаксис и схема</summary>${app.code(section.syntax,'Схема · замените условные имена')}</details>`:''}
  ${section.explain?.length?`<details class="line-explanation"><summary>Разобрать пример по строкам <span>${section.explain.length} пояснений</span></summary><ol>${section.explain.map(x=>`<li>${app.inline(x)}</li>`).join('')}</ol></details>`:''}
  ${app.list('Шаг за шагом',section.steps)}${app.list('Типичные ошибки',section.mistakes,'mistakes')}
  ${section.template?`<details><summary>Шаблон для адаптации</summary>${app.code(section.template,'Шаблон · заполните своей логикой')}</details>`:''}
  ${(section.samples||[]).map(x=>app.code(x.code,x.title)).join('')}
  ${section.note?`<aside class="callout"><strong>Обратите внимание</strong><p>${app.inline(section.note)}</p></aside>`:''}
 </section>`;
})();
