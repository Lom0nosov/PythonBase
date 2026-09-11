const topics = [
  { title: 'Значения, типы и переменные', explain: 'Значение — это данные: число, строка, список и так далее. Переменная — имя, которое ссылается на значение. Базовые типы: int, float, str, bool, None, list, tuple, dict и set.', syntax: 'имя = значение\n\nage = 25\nname = "Анна"', example: 'print(type(age))  # <class \'int\'>', tip: '`=` присваивает значение, а `==` сравнивает значения.' },
  { title: 'Ввод, вывод и преобразование типов', explain: 'input() читает одну строку и всегда возвращает str. print() показывает значения на экране. Чтобы работать с числами, строку преобразуют через int() или float().', syntax: 'text = input("Подсказка: ")\nnumber = int(input())\nprint(a, b, sep=" ", end="\\n")', example: 'a, b = map(int, input().split())\nprint(a + b)', tip: '`input()` возвращает строку: `"10" + "20"` даст `"1020"`, а не `30`.' },
  { title: 'Выражения и операторы', explain: 'Выражение вычисляется и даёт результат. Операторы нужны для арифметики, сравнений и логических проверок.', syntax: 'a + b   a - b   a * b\na / b   a // b  a % b\na ** b  a == b  a != b', example: 'a, b = 17, 5\nprint(a // b)  # 3\nprint(a % b)   # 2', tip: '`/` всегда возвращает float. `//` округляет вниз, в том числе для отрицательных чисел.' },
  { title: 'Условия', explain: 'Условие выбирает, какой блок кода выполнить. Ложными считаются False, 0, пустые коллекции и None.', syntax: 'if условие:\n    код\nelif другое_условие:\n    код\nelse:\n    код', example: 'if age >= 18:\n    print("Доступ разрешён")\nelse:\n    print("Доступ запрещён")', tip: 'После `if`, `elif` и `else` ставится `:`. Тело блока всегда имеет отступ.' },
  { title: 'Строки, списки и кортежи', explain: 'Это упорядоченные последовательности. str и tuple неизменяемы, list можно менять: добавлять, удалять и заменять элементы.', syntax: 's = "Python"\nlst = [10, 20, 30]\nt = (10, 20, 30)\nitem = lst[0]\npart = s[1:4]', example: 'word = "Python"\nprint(word[-1])   # n\nprint(word[::-1]) # nohtyP\n\nlst[1] = 99', tip: 'Первый индекс — `0`, последний — `-1`. Правая граница среза не входит в результат.' },
  { title: 'Словари и множества', explain: 'dict хранит пары «ключ: значение». set хранит только уникальные элементы и не имеет индексов.', syntax: 'user = {"name": "Анна"}\nvalue = user["name"]\n\nskills = {"Python", "SQL"}', example: 'a, b = {1, 2, 3}, {3, 4, 5}\nprint(a | b)  # объединение\nprint(a & b)  # пересечение', tip: '`{}` — пустой словарь. Пустое множество создают через `set()`.' },
  { title: 'Цикл while', explain: 'while повторяет код, пока условие истинно. Его используют, когда число повторений заранее неизвестно.', syntax: 'while условие:\n    тело_цикла', example: 'count = 1\nwhile count <= 5:\n    print(count)\n    count += 1', tip: 'Следите, чтобы условие когда-нибудь стало ложным, иначе цикл будет бесконечным.' },
  { title: 'Цикл for и range', explain: 'for перебирает элементы строки, списка, словаря, множества или range. Правая граница range не включается.', syntax: 'for item in iterable:\n    тело_цикла\n\nrange(stop)\nrange(start, stop, step)', example: 'for number in range(1, 6):\n    print(number)\n\nfor name in ["Анна", "Борис"]:\n    print(name)', tip: '`range(1, 6)` содержит числа от 1 до 5.' },
  { title: 'break, continue и else у цикла', explain: 'break завершает весь цикл. continue пропускает текущую итерацию. else у цикла выполняется, если не было break.', syntax: 'for item in items:\n    if условие:\n        continue\n    if другое_условие:\n        break\nelse:\n    код', example: 'for n in [1, 3, 5]:\n    if n % 2 == 0:\n        break\nelse:\n    print("Чётных нет")', tip: '`break` — выход из цикла, `continue` — только пропуск одного круга.' },
  { title: 'Функции и return', explain: 'Функция — именованный блок кода. Параметры указывают в def, аргументы передают при вызове. return отдаёт результат в место вызова.', syntax: 'def имя(параметры):\n    тело\n    return результат', example: 'def is_even(number):\n    return number % 2 == 0\n\nprint(is_even(10))  # True', tip: '`print()` показывает значение, а `return` возвращает его программе. Функция без return вернёт None.' },
  { title: 'Генераторы коллекций', explain: 'Генераторы позволяют коротко создать список, словарь или множество на основе for и необязательного условия.', syntax: '[выражение for x in iterable if условие]\n{key: value for x in iterable}\n{выражение for x in iterable}', example: 'squares = [x ** 2 for x in range(1, 6)]\neven = {x: x ** 2 for x in range(10) if x % 2 == 0}', tip: '`[]` создаёт list, `{key: value}` — dict, `{value}` — set.' },
  { title: 'Исключения', explain: 'Исключение — ошибка во время работы программы. try-except позволяет обработать ожидаемую проблему и продолжить работу.', syntax: 'try:\n    рискованный_код\nexcept ТипОшибки as error:\n    обработка\nelse:\n    успех\nfinally:\n    всегда', example: 'try:\n    print(int(input()) / int(input()))\nexcept ValueError:\n    print("Введите числа")\nexcept ZeroDivisionError:\n    print("На ноль нельзя")', tip: 'Сначала обрабатывают конкретные ошибки. Голый `except:` используют только последним.' },
];

const methods = {
  'str — строки': [
    ['.upper()', 'все буквы в верхний регистр'], ['.lower()', 'все буквы в нижний регистр'], ['.capitalize()', 'первая буква заглавная'], ['.title()', 'каждое слово с заглавной'], ['.swapcase()', 'инвертировать регистр'], ['.count(sub)', 'число вхождений'], ['.find(sub)', 'индекс первого вхождения или -1'], ['.rfind(sub)', 'индекс последнего вхождения или -1'], ['.index(sub)', 'индекс первого вхождения; иначе ValueError'], ['.startswith(prefix)', 'начинается ли строка с текста'], ['.endswith(suffix)', 'заканчивается ли строка текстом'], ['.strip()', 'убрать символы с краёв'], ['.lstrip()', 'убрать слева'], ['.rstrip()', 'убрать справа'], ['.replace(old, new)', 'заменить подстроку'], ['.split()', 'строка → список'], ['.join(iterable)', 'склеить строки'], ['.isdigit()', 'только цифры?'], ['.isalpha()', 'только буквы?'], ['.isalnum()', 'буквы и цифры?'], ['.islower()', 'все буквы строчные?'], ['.isupper()', 'все буквы заглавные?'], ['.isspace()', 'только пробелы?']
  ],
  'list — списки': [
    ['.append(x)', 'добавить один элемент в конец'], ['.extend(iterable)', 'добавить элементы iterable'], ['.insert(i, x)', 'вставить перед индексом i'], ['.remove(x)', 'удалить первое вхождение'], ['.pop()', 'удалить и вернуть последний'], ['.pop(i)', 'удалить и вернуть по индексу'], ['.clear()', 'очистить список'], ['.index(x)', 'индекс первого x'], ['.count(x)', 'сколько раз есть x'], ['.sort()', 'сортировать на месте'], ['.reverse()', 'развернуть на месте'], ['.copy()', 'поверхностная копия']
  ],
  'tuple — кортежи': [['.count(x)', 'сколько раз встречается x'], ['.index(x)', 'индекс первого x']],
  'dict — словари': [
    ['.get(key, default)', 'значение или default'], ['.keys()', 'все ключи'], ['.values()', 'все значения'], ['.items()', 'пары ключ, значение'], ['.setdefault(key, default)', 'получить или создать ключ'], ['.update(other)', 'добавить/обновить пары'], ['.pop(key)', 'удалить ключ, вернуть значение'], ['.popitem()', 'удалить последнюю пару'], ['.clear()', 'очистить'], ['.copy()', 'поверхностная копия']
  ],
  'set — множества': [
    ['.add(x)', 'добавить элемент'], ['.update(iterable)', 'добавить элементы'], ['.remove(x)', 'удалить; нет x → KeyError'], ['.discard(x)', 'удалить безопасно'], ['.pop()', 'удалить произвольный элемент'], ['.clear()', 'очистить'], ['.copy()', 'копия'], ['.union(other)', 'объединение'], ['.intersection(other)', 'пересечение'], ['.difference(other)', 'разность'], ['.symmetric_difference(other)', 'не общие элементы'], ['.intersection_update(other)', 'пересечение на месте'], ['.difference_update(other)', 'разность на месте'], ['.isdisjoint(other)', 'нет общих элементов?'], ['.issubset(other)', 'является подмножеством?'], ['.issuperset(other)', 'содержит другое множество?']
  ],
  'frozenset': [['.copy()', 'копия'], ['.union(other)', 'объединение'], ['.intersection(other)', 'пересечение'], ['.difference(other)', 'разность'], ['.symmetric_difference(other)', 'не общие элементы'], ['.isdisjoint(other)', 'нет общих элементов?'], ['.issubset(other)', 'подмножество?'], ['.issuperset(other)', 'надмножество?']],
  'Встроенные функции': [['len(x)', 'длина', 'len([1, 2, 3])  # 3'], ['min(x)', 'минимальный элемент', 'min([3, 1, 2])  # 1'], ['max(x)', 'максимальный элемент', 'max([3, 1, 2])  # 3'], ['sum(x)', 'сумма чисел', 'sum([1, 2, 3])  # 6'], ['sorted(x)', 'новый отсортированный список', 'sorted([3, 1])  # [1, 3]'], ['reversed(x)', 'обратный итератор', 'list(reversed([1, 2]))'], ['enumerate(x, start)', 'пары индекс, значение', 'enumerate(["a", "b"], 1)'], ['zip(a, b)', 'объединяет элементы в пары', 'list(zip([1, 2], ["a", "b"]))'], ['list(x)', 'создать список', 'list("abc")'], ['tuple(x)', 'создать кортеж', 'tuple([1, 2])'], ['set(x)', 'создать множество', 'set([1, 1, 2])'], ['dict(x)', 'создать словарь', 'dict([("a", 1)])']],
};

const details = {
  'Значения, типы и переменные': ['Основные типы: `int`, `float`, `str`, `bool`, `NoneType`, `list`, `tuple`, `dict`, `set`.', 'Имя состоит из букв, цифр и `_`, не начинается с цифры; регистр важен.', 'Несколько значений: `a, b = 1, 2`; обмен: `a, b = b, a`.'],
  'Ввод, вывод и преобразование типов': ['`sep` задаёт разделитель аргументов; `end` — окончание вывода.', '`split()` разбивает строку, `map()` применяет преобразование к каждому куску.', 'Количество значений справа должно совпадать с количеством переменных слева.'],
  'Выражения и операторы': ['Приоритет: скобки → `**` → унарный `±` → `* / // %` → `+ -`.', '`a == (a // b) * b + (a % b)` — тождество деления с остатком.', '`math.ceil(x)` округляет вверх, `math.floor(x)` вниз, `int(x)` к нулю, `round(x, n)` — к ближайшему.'],
  'Условия': ['Сравнения: `==`, `!=`, `<`, `>`, `<=`, `>=`; логика: `and`, `or`, `not`.', 'Ложные значения: `False`, `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `None`.', 'Тернарный оператор: `a if условие else b`. Для выбора вариантов также есть `match-case` (Python 3.10+).'],
  'Строки, списки и кортежи': ['Первый индекс — `0`, последний — `-1`; срез: `s[start:stop:step]`.', 'Экранирование: `\\n`, `\\t`, `\\\\`, `\\\'`, `\\"`. Форматирование: `f"Возраст: {age}"`.', 'Кортеж из одного элемента: `(42,)`; строку и кортеж менять по индексу нельзя.'],
  'Словари и множества': ['Проверка отсутствия значения: `x is None` и `x is not None`.', 'Ключи словаря должны быть неизменяемыми; `d.get(key, default)` безопаснее, чем `d[key]`.', '`|`, `&`, `-`, `^` — объединение, пересечение, разность и симметричная разность; `frozenset` неизменяем.'],
  'Цикл while': ['`break` немедленно завершает цикл, `continue` пропускает текущую итерацию.', '`else` у цикла выполняется, если цикл завершился без `break`.', 'В задачах часто используют `while` для цифр числа, делителей и двух указателей.'],
  'Цикл for и range': ['`range(stop)`, `range(start, stop)`, `range(start, stop, step)`; правая граница не входит.', 'Обход по значению: `for item in items`; по индексу: `for i in range(len(items))`.', '`pass` — заглушка: ничего не делает, но создаёт обязательное тело блока.'],
  'break, continue и else у цикла': ['`break` завершает весь цикл, `continue` — только текущую итерацию.', '`else` у цикла срабатывает только если выход через `break` не произошёл.'],
  'Функции и return': ['Функцию сначала определяют через `def`, затем вызывают с `()`; параметры — в `def`, аргументы — при вызове.', '`return` завершает функцию. Без `return` функция возвращает `None`.', '`return a, b` возвращает кортеж; его можно распаковать: `a, b = f()`.' ],
  'Генераторы коллекций': ['Накопление суммы: `total += x`; факториала: `result *= x`.', 'Список: `[выражение for x in iterable if условие]`; словарь: `{key: value for x in iterable}`.', 'Множество: `{выражение for x in iterable}` — повторяющиеся значения исчезают.'],
  'Исключения': ['Частые типы: `SyntaxError`, `NameError`, `IndexError`, `KeyError`, `TypeError`, `ValueError`, `ZeroDivisionError`.', '`else` выполняется, если в `try` не было ошибки; `finally` — всегда.', '`raise ValueError("сообщение")` создаёт исключение вручную.'],
};

const quick = [['Вывод', 'print(a, b, sep=" ", end="\\n")'], ['Ввод числа', 'n = int(input())'], ['Два числа', 'a, b = map(int, input().split())'], ['Условие', 'if condition:'], ['Цикл', 'for x in iterable:'], ['Функция', 'def f(x): return result']];
const $ = (s) => document.querySelector(s);
const escapeHtml = (value) => value.replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[c]));
const renderCode = (text) => escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
const renderTip = (text) => renderCode(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
let mode = 'theory';

function render() {
  const query = $('#search-input').value.trim().toLowerCase();
  const topicNav = $('#topic-nav'); const theoryList = $('#theory-list'); const methodsList = $('#methods-list');
  const activeFilter = document.querySelector('.filter.active')?.dataset.filter || 'Все';
  const matches = (value) => !query || value.toLowerCase().includes(query);
  const visibleTopics = topics.filter(t => matches(`${Object.values(t).join(' ')} ${(details[t.title] || []).join(' ')}`));
  const visibleGroups = Object.entries(methods).filter(([name, rows]) => (activeFilter === 'Все' || name === activeFilter) && matches(`${name} ${rows.flat().join(' ')}`));
  topicNav.innerHTML = mode === 'theory'
    ? topics.map((t,i) => `<a href="#topic-${i}" class="${visibleTopics.includes(t) ? '' : 'hidden'}">${i + 1}. ${t.title}</a>`).join('')
    : Object.keys(methods).map(name => `<a href="#methods-list">${name}</a>`).join('');
  theoryList.innerHTML = visibleTopics.map(t => {
    const index = topics.indexOf(t);
    const points = details[t.title] || [];
    return `<details id="topic-${index}" class="theory-card" ${query ? 'open' : ''}><summary><span class="theory-number">${String(index+1).padStart(2,'0')}</span><span class="theory-title">${t.title}</span><span class="theory-arrow">⌄</span></summary><div class="theory-content"><div><span class="block-label">ОБЪЯСНЕНИЕ</span><p class="explanation">${renderCode(t.explain)}</p><ul class="detail-list">${points.map(point => `<li>${renderCode(point)}</li>`).join('')}</ul></div><div><span class="block-label">КОНСТРУКЦИЯ И ПРИМЕР</span><pre>${escapeHtml(t.syntax)}\n\n# пример\n${escapeHtml(t.example)}</pre></div><p class="tip"><strong>Не перепутать:</strong> ${renderTip(t.tip)}</p></div></details>`;
  }).join('');
  methodsList.innerHTML = visibleGroups.map(([group, rows]) => {
    const receiver = group.startsWith('str') ? 's' : group.startsWith('list') ? 'a' : group.startsWith('tuple') ? 't' : group.startsWith('dict') ? 'd' : group.startsWith('frozenset') ? 'fs' : group.startsWith('set') ? 's' : '';
    return `<article class="method-group"><h3>${group}</h3>${rows.map(([method, text, example]) => `<div class="method-row"><code>${method}</code><span>${text}</span><div class="method-example">${escapeHtml(example || `${receiver}${method}`)}</div></div>`).join('')}</article>`;
  }).join('');
  $('#empty-state').hidden = mode === 'theory' ? visibleTopics.length > 0 : visibleGroups.length > 0;
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll('.switch-button').forEach(button => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  $('#quick-section').hidden = mode !== 'theory';
  $('#theory-section').hidden = mode !== 'theory';
  $('#methods-section').hidden = mode !== 'methods';
  render();
}

function init() {
  $('#quick-grid').innerHTML = quick.map(([label, code]) => `<article class="quick-card"><p>${label}</p><code>${code}</code></article>`).join('');
  $('#method-filters').innerHTML = ['Все', ...Object.keys(methods)].map((x,i) => `<button class="filter ${i===0?'active':''}" data-filter="${x}">${x}</button>`).join('');
  $('#topic-count').textContent = topics.length; $('#method-count').textContent = Object.values(methods).flat().length;
  $('#search-input').addEventListener('input', render);
  $('.content-switch').addEventListener('click', (e) => {
    if (e.target.matches('.switch-button')) setMode(e.target.dataset.mode);
  });
  $('#method-filters').addEventListener('click', (e) => { if (!e.target.matches('.filter')) return; document.querySelectorAll('.filter').forEach(b => b.classList.remove('active')); e.target.classList.add('active'); render(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { $('#search-input').value = ''; $('#search-input').blur(); render(); } });
  document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => { $('#search-input').value = button.dataset.query; render(); $('#search-input').focus(); }));
  const top = $('#to-top'); window.addEventListener('scroll', () => top.classList.toggle('visible', window.scrollY > 500)); top.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  setMode('theory');
}
init();
