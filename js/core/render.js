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
 app.output = text => text == null ? '' : `<figure class="example-output"><figcaption><span aria-hidden="true">▶</span> Что выведет программа</figcaption><pre>${escape(text)}</pre></figure>`;
 app.list = (title,items,className='') => items?.length?`<div class="explanation ${className}"><h4>${title}</h4><ul>${items.map(x=>`<li>${app.inline(x)}</li>`).join('')}</ul></div>`:'';
 // Подсказка «Простыми словами» и блок «В автотестах» — общий вид для краткого и подробного режимов.
 app.analogy = text => text?`<aside class="analogy"><span class="analogy-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg></span><div><strong>Простыми словами</strong><p>${app.inline(text)}</p></div></aside>`:'';
 app.inTests = data => {
  if(!data)return '';const item=typeof data==='string'?{text:data}:data;
  return `<aside class="in-tests"><div class="in-tests-head"><span class="in-tests-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><strong>Где пригодится в автотестах</strong></div><p>${app.inline(item.text)}</p>${item.code?app.code(item.code,'Пример · pytest'):''}</aside>`;
 };
 app.syntax = text => text?`<div class="syntax-line"><span class="syntax-label">Синтаксис</span><pre><code>${app.highlight(text)}</code></pre></div>`:'';
 app.section = (section,index) => `<section class="lesson-section" id="${escape(section.id)}">
  <div class="section-title"><span>${String(index+1).padStart(2,'0')}</span><h2>${escape(section.title)}</h2><button class="link-button section-link" data-section="${escape(section.id)}" aria-label="Скопировать ссылку на раздел ${escape(section.title)}">#</button></div>
  ${(section.paragraphs||[]).map(text=>`<p>${app.inline(text)}</p>`).join('')}
  ${app.analogy(section.analogy)}
  ${app.list('Когда применять',section.useWhen)}
  ${app.syntax(section.syntax)}
  ${section.example?app.code(section.example):''}${app.output(section.output)}
  ${section.explain?.length?`<details class="line-explanation"><summary>Разобрать пример по строкам <span>${section.explain.length} пояснений</span></summary><ol>${section.explain.map(x=>`<li>${app.inline(x)}</li>`).join('')}</ol></details>`:''}
  ${app.list('Шаг за шагом',section.steps,'steps')}${app.list('Частые ошибки',section.mistakes,'mistakes')}
  ${section.template?`<details><summary>Шаблон для адаптации</summary>${app.code(section.template,'Шаблон · заполните своей логикой')}</details>`:''}
  ${(section.samples||[]).map(x=>app.code(x.code,x.title)).join('')}
  ${section.note?`<aside class="callout"><strong>Обратите внимание</strong><p>${app.inline(section.note)}</p></aside>`:''}
 </section>`;
})();
