/* Материалы: редактируйте текст и примеры, сохраняйте постоянные id. */
window.PythonBase.content.builtins = [
  {
    "title": "len, type и isinstance",
    "lead": "Длина объекта, его тип и проверка типа.",
    "sections": [
      {
        "title": "len: число элементов",
        "paragraphs": [
          "`len` отвечает, сколько элементов в объекте. Для строки это число символов. У числа `len` нет: будет `TypeError`.",
          "Для списка `len` считает элементы, не символы внутри них.",
          "Для словаря `len` — число ключей. Для множества — число уникальных значений."
        ],
        "example": "print(len(\"Python\"))\n\nprint(len([10, 20, 30]))\n\nprint(len({\"a\": 1}))",
        "id": "part-1",
        "output": "6\n3\n1"
      },
      {
        "title": "type и isinstance",
        "paragraphs": [
          "`type(x)` показывает тип значения: число, строка, список…",
          "`isinstance(x, тип)` отвечает `True` или `False`. Он лучше, чем `type(x) == ...`: учитывает наследников. Можно проверить сразу несколько типов: `isinstance(x, (int, float))`."
        ],
        "example": "print(type(25))\n\nprint(isinstance(25, int))",
        "id": "part-4",
        "note": "`type(x) == int` работает, но в проверках обычно пишут `isinstance`.",
        "output": "<class 'int'>\nTrue"
      }
    ],
    "id": "inspection",
    "quick": {
      "summary": "`len(x)` — сколько элементов. `type(x)` — какого типа значение. `isinstance(x, тип)` — отвечает «да/нет»: это значение такого типа?",
      "code": "items = [\"login\", \"logout\"]\nprint(len(items))\nprint(type(items).__name__)\nprint(isinstance(items, list))",
      "takeaway": "`len` считает элементы, а не размер в памяти. У числа `len` нет — будет ошибка. Для проверки типа в коде используйте `isinstance`.",
      "analogy": "`len` — посчитать яблоки в корзине. `type` — прочитать этикетку «яблоки». `isinstance` — спросить «это фрукты?» и получить «да», даже если на этикетке «яблоки» (наследование).",
      "output": "2\nlist\nTrue"
    },
    "inTests": {
      "text": "Это самые частые проверки ответа API: сколько пришло записей и правильного ли они типа.",
      "code": "def test_users_response():\n    response = {\"users\": [\"anna\", \"boris\"], \"total\": 2}\n    assert isinstance(response[\"users\"], list)\n    assert len(response[\"users\"]) == response[\"total\"]"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/conversion",
      "builtins/collections"
    ],
    "source": "https://docs.python.org/3/library/functions.html",
    "sectionAliases": {
      "part-2": "part-1",
      "part-3": "part-1",
      "part-5": "part-4"
    }
  },
  {
    "title": "int, float, str и bool",
    "lead": "Преобразование значения из одного типа в другой.",
    "sections": [
      {
        "title": "int",
        "paragraphs": [
          "`int` делает целое число из строки или отбрасывает дробную часть у `float`. `int(\"10\")` читает десятичную запись."
        ],
        "syntax": "int(x)",
        "example": "print(int(\"10\"))",
        "note": "`int(\"3.9\")` нельзя: это не целая запись. Сначала `float(\"3.9\")`, потом `int(...)`.",
        "id": "part-1",
        "output": "10"
      },
      {
        "title": "int из другой системы",
        "paragraphs": [
          "Второй аргумент — система счисления. `int(\"101\", 2)` читает двоичную запись."
        ],
        "syntax": "int(\"101\", 2)",
        "example": "print(int(\"101\", 2))",
        "id": "part-2",
        "output": "5"
      },
      {
        "title": "float",
        "paragraphs": [
          "`float` делает дробное число. Десятичный разделитель — точка: `\"1.5\"`, не `\"1,5\"`. Допустимы также `\"2\"` и `\"1e3\"`."
        ],
        "syntax": "float(x)",
        "example": "print(float(\"1.5\"))",
        "id": "part-3",
        "output": "1.5"
      },
      {
        "title": "str",
        "paragraphs": [
          "`str` превращает значение в текст. Так число можно склеить с надписью."
        ],
        "syntax": "str(x)",
        "example": "print(str(25) + \" кг\")",
        "id": "part-4",
        "output": "25 кг"
      },
      {
        "title": "bool: ложное",
        "paragraphs": [
          "`bool(x)` отвечает, истинно ли значение в условии. Ложные: `0`, `0.0`, `\"\"`, `[]`, `{}`, `set()`, `None`."
        ],
        "syntax": "bool(x)",
        "example": "print(bool(0))",
        "id": "part-5",
        "output": "False"
      },
      {
        "title": "bool: строка \"0\"",
        "paragraphs": [
          "Строка `\"0\"` истинна: она не пустая. То же со строкой `\"False\"`."
        ],
        "syntax": "bool(\"0\")",
        "example": "print(bool(\"0\"))",
        "id": "part-6",
        "output": "True"
      }
    ],
    "id": "conversion",
    "quick": {
      "summary": "`int()`, `float()`, `str()`, `bool()` превращают значение в другой тип: строку `\"42\"` — в число 42, число 200 — в строку `\"200\"`.",
      "code": "print(int(\"42\"))\nprint(float(\"1.5\"))\nprint(str(200))        # строка\nprint(bool([]))\nprint(bool(\"False\"))   # непустая строка",
      "takeaway": "`bool(\"False\")` — это `True`: любая непустая строка считается истиной. `int(3.9)` даёт `3` — дробь просто отбрасывается, а не округляется.",
      "analogy": "Как пересыпать крупу из пакета в банку: содержимое то же, а «упаковка» (тип) другая. Но не всё можно пересыпать: слово «привет» в число превратить нельзя — будет ошибка.",
      "output": "42\n1.5\n200\nFalse\nTrue"
    },
    "inTests": {
      "text": "Данные из API, файлов и полей ввода часто приходят строками. Перед сравнением их приводят к нужному типу — иначе `\"200\" == 200` даст `False`, и тест упадёт.",
      "code": "def test_status_from_header():\n    header = \"200\"                 # заголовки всегда строки\n    assert int(header) == 200\n    assert header != 200           # строка не равна числу"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/collections"
    ],
    "source": "https://docs.python.org/3/library/functions.html"
  },
  {
    "title": "list, tuple, set и dict",
    "lead": "Конструкторы коллекций: собрать список, кортеж, множество или словарь.",
    "sections": [
      {
        "title": "list",
        "paragraphs": [
          "`list` собирает список из другой последовательности. Так копируют и превращают `range` или строку в список. Число перебрать нельзя: `list(25)` вызовет ошибку."
        ],
        "syntax": "list(iterable)",
        "example": "print(list(\"abc\"))",
        "id": "part-1",
        "output": "['a', 'b', 'c']"
      },
      {
        "title": "tuple",
        "paragraphs": [
          "`tuple` собирает кортеж. Исходный список при этом не меняется."
        ],
        "syntax": "tuple(iterable)",
        "example": "print(tuple([1, 2]))",
        "id": "part-2",
        "output": "(1, 2)"
      },
      {
        "title": "set",
        "paragraphs": [
          "`set` собирает множество: повторы исчезают."
        ],
        "syntax": "set(iterable)",
        "example": "print(set([1, 1, 2]))",
        "id": "part-3",
        "output": "{1, 2}"
      },
      {
        "title": "dict",
        "paragraphs": [
          "`dict` собирает словарь из пар `(ключ, значение)` или из именованных аргументов. Пустые объекты: `list()`, `tuple()`, `set()`, `dict()`. `{}` — словарь, не множество."
        ],
        "syntax": "dict(пары)",
        "example": "print(dict([(\"a\", 1), (\"b\", 2)]))",
        "id": "part-4",
        "output": "{'a': 1, 'b': 2}"
      }
    ],
    "id": "collections",
    "quick": {
      "summary": "`list()`, `tuple()`, `set()`, `dict()` собирают нужную коллекцию из другой: строку — в список букв, список — в множество без повторов.",
      "code": "print(list(\"abc\"))\nprint(tuple([1, 2]))\nprint(sorted(set([2, 1, 2])))\nprint(dict([(\"status\", 200)]))",
      "takeaway": "`{}` — это пустой словарь, а пустое множество — только `set()`. `list(старый_список)` копирует только верхний уровень.",
      "analogy": "Как переложить карточки из коробки в альбом, на верёвочку или в мешок. `list` — альбом (по порядку, можно менять), `tuple` — заламинированный альбом (менять нельзя), `set` — мешок (без порядка и без повторов).",
      "output": "['a', 'b', 'c']\n(1, 2)\n[1, 2]\n{'status': 200}"
    },
    "inTests": {
      "text": "`set` удобен, когда порядок не важен: сравнить, что пришли те же элементы. А `list(...)` превращает в список результат `map`, `filter` и `range`, чтобы его можно было сравнить в `assert`.",
      "code": "def test_same_tags_any_order():\n    actual = [\"smoke\", \"api\", \"ui\"]\n    expected = [\"ui\", \"smoke\", \"api\"]\n    assert set(actual) == set(expected)"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/conversion"
    ],
    "source": "https://docs.python.org/3/library/functions.html"
  },
  {
    "title": "abs, round и pow",
    "lead": "Модуль, округление и возведение в степень.",
    "sections": [
      {
        "title": "abs",
        "paragraphs": [
          "`abs` берёт модуль: отрицательное число становится положительным."
        ],
        "syntax": "abs(x)",
        "example": "print(abs(-7))",
        "id": "part-1",
        "output": "7"
      },
      {
        "title": "round",
        "paragraphs": [
          "`round` округляет: без второго аргумента к целому, со вторым — до указанного числа знаков."
        ],
        "syntax": "round(x, n)",
        "example": "print(round(3.14159, 2))",
        "id": "part-2",
        "note": "На точной середине округление идёт к чётному: round(2.5) == 2, round(3.5) == 4. Float хранит двоичные приближения: round(2.675, 2) == 2.67.",
        "output": "3.14"
      },
      {
        "title": "int — не округление",
        "paragraphs": [
          "`int(3.9)` всегда отбрасывает дробь к нулю. Это не округление: `3.9` станет `3`, а не `4`."
        ],
        "syntax": "int(3.9)",
        "example": "print(int(3.9))",
        "id": "part-3",
        "output": "3"
      },
      {
        "title": "pow",
        "paragraphs": [
          "`pow(x, y)` — то же, что `x ** y`."
        ],
        "syntax": "pow(x, y)",
        "example": "print(pow(2, 10))",
        "id": "part-4",
        "output": "1024"
      },
      {
        "title": "pow с остатком",
        "paragraphs": [
          "Третий аргумент сразу считает остаток от деления: `pow(x, y, mod)` — то же самое, что `(x ** y) % mod`, но быстрее."
        ],
        "syntax": "pow(x, y, mod)",
        "example": "print(pow(2, 10, 100))",
        "id": "part-5",
        "output": "24"
      }
    ],
    "id": "numbers",
    "quick": {
      "summary": "`abs(x)` — убрать минус. `round(x, n)` — округлить до n знаков. `pow(x, y)` или `x ** y` — возвести в степень.",
      "code": "print(abs(-7))\nprint(round(2.5))\nprint(round(3.5))\nprint(round(1.234, 2))\nprint(int(-3.9))\nprint(2 ** 3)",
      "takeaway": "`round(2.5)` даёт `2`, а `round(3.5)` — `4`: на середине Python выбирает чётное. Дробные числа хранятся неточно, поэтому сравнивайте их через `math.isclose` или `pytest.approx`.",
      "analogy": "`abs` — расстояние без направления: 7 шагов назад — это всё равно 7 шагов. `round` — сказать «примерно»: 1.234 ≈ 1.23.",
      "output": "7\n2\n4\n1.23\n-3\n8"
    },
    "inTests": {
      "text": "Классическая ловушка: `0.1 + 0.2 == 0.3` — это `False`. В тестах дробные числа сравнивают через `pytest.approx`.",
      "code": "import pytest\n\ndef test_price_with_discount():\n    assert 0.1 + 0.2 == pytest.approx(0.3)"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/conversion"
    ],
    "source": "https://docs.python.org/3/library/functions.html"
  },
  {
    "title": "min, max и sum",
    "lead": "Найти крайние значения и сложить числа.",
    "sections": [
      {
        "title": "min",
        "paragraphs": [
          "`min` находит наименьшее значение. Можно передать коллекцию или перечислить аргументы через запятую."
        ],
        "syntax": "min(iterable)",
        "example": "nums = [3, 1, 8, 2]\nprint(min(nums))",
        "id": "part-1",
        "output": "1"
      },
      {
        "title": "max",
        "paragraphs": [
          "`max` находит наибольшее значение. Аргументы можно перечислить через запятую без списка."
        ],
        "syntax": "max(a, b, c)",
        "example": "print(max(3, 1, 8))",
        "id": "part-2",
        "output": "8"
      },
      {
        "title": "sum",
        "paragraphs": [
          "`sum` складывает числа. Пустой `sum([])` даёт `0`. Строки `sum` не склеивает — для этого `\"\".join(...)`."
        ],
        "syntax": "sum(iterable)",
        "example": "print(sum([3, 1, 8, 2]))",
        "id": "part-3",
        "output": "14"
      },
      {
        "title": "sum со стартом",
        "paragraphs": [
          "Второй аргумент — начальное значение. Его прибавляют к сумме элементов."
        ],
        "syntax": "sum(iterable, start)",
        "example": "print(sum([3, 1, 8, 2], 100))",
        "id": "part-4",
        "output": "114"
      },
      {
        "title": "min с key",
        "paragraphs": [
          "`key=` говорит, по чему сравнивать. `min(words, key=len)` найдёт самое короткое слово, а не первое по алфавиту."
        ],
        "syntax": "min(iterable, key=len)",
        "example": "words = [\"я\", \"питон\", \"код\"]\nprint(min(words, key=len))",
        "id": "part-5",
        "output": "я"
      },
      {
        "title": "max с key",
        "paragraphs": [
          "Тот же `key=` для `max` находит элемент с наибольшим признаком: здесь самое длинное слово."
        ],
        "syntax": "max(iterable, key=len)",
        "example": "words = [\"я\", \"питон\", \"код\"]\nprint(max(words, key=len))",
        "id": "part-6",
        "output": "питон"
      },
      {
        "id": "all-any",
        "title": "all и any: проверки коллекции",
        "paragraphs": [
          "`all` возвращает `True`, если **все** элементы истинны. `any` — если **хотя бы один**. Обе останавливаются, как только ответ ясен.",
          "Осторожно с пустым списком: `all([])` — `True`. Если пустой список — это ошибка, проверьте его отдельно: `assert statuses`."
        ],
        "example": "statuses = [200, 201, 204]\nprint(all(code < 400 for code in statuses))\nprint(any(code >= 500 for code in statuses))",
        "output": "True\nFalse"
      }
    ],
    "id": "aggregates",
    "quick": {
      "summary": "`min` и `max` находят самое маленькое и самое большое значение, `sum` складывает. `all` — «все ли истинны?», `any` — «есть ли хоть одно истинное?».",
      "code": "durations = [120, 85, 200]\nprint(min(durations))\nprint(max(durations))\nprint(sum(durations))\nprint(min([], default=None))\nprint(all([True, True]))\nprint(any([False, True]))",
      "takeaway": "У пустого списка нет ни минимума, ни максимума — нужен `default`, иначе будет ошибка. `all([])` — `True`, `any([])` — `False`.",
      "analogy": "Учитель смотрит на оценки класса: `min` — худшая, `max` — лучшая, `sum` — общий балл. `all` — «все сдали?», `any` — «хоть кто-нибудь сдал?».",
      "output": "85\n200\n405\nNone\nTrue\nTrue"
    },
    "inTests": {
      "text": "`all` и `any` позволяют одной строкой проверить целый список: все ответы успешные, ни одного серверного сбоя, самый медленный запрос быстрее 2 секунд.",
      "code": "def test_all_requests_ok():\n    statuses = [200, 201, 204]\n    durations = [0.3, 1.2, 0.8]\n    assert all(code < 400 for code in statuses)\n    assert max(durations) < 2"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/conversion"
    ],
    "source": "https://docs.python.org/3/library/functions.html"
  },
  {
    "title": "sorted и reversed",
    "lead": "Новый отсортированный список и обход в обратном порядке.",
    "sections": [
      {
        "title": "sorted",
        "paragraphs": [
          "`sorted` всегда возвращает новый список и не меняет исходную коллекцию."
        ],
        "syntax": "sorted(iterable)",
        "example": "nums = [3, 1, 2]\nprint(sorted(nums))",
        "id": "part-1",
        "output": "[1, 2, 3]"
      },
      {
        "title": "sorted по убыванию",
        "paragraphs": [
          "`reverse=True` сортирует по убыванию. Исходная коллекция по-прежнему не меняется."
        ],
        "syntax": "sorted(iterable, reverse=True)",
        "example": "print(sorted([3, 1, 2], reverse=True))",
        "id": "part-2",
        "output": "[3, 2, 1]"
      },
      {
        "title": "sorted с key",
        "paragraphs": [
          "`key=` задаёт признак сравнения. Здесь слова упорядочены по длине."
        ],
        "syntax": "sorted(iterable, key=функция)",
        "example": "print(sorted([\"я\", \"питон\", \"код\"], key=len))",
        "id": "part-3",
        "output": "['я', 'код', 'питон']"
      },
      {
        "title": "sort vs sorted",
        "paragraphs": [
          "У списка есть метод `.sort()`: он меняет объект на месте и возвращает `None`. `sorted` возвращает новый список."
        ],
        "syntax": "lst.sort()",
        "example": "nums = [3, 1, 2]\nnums.sort()\nprint(nums)",
        "note": "Не пишите `lst = lst.sort()`. Метод вернёт `None`, и список пропадёт из переменной.",
        "id": "part-4",
        "output": "[1, 2, 3]"
      },
      {
        "title": "reversed списка",
        "paragraphs": [
          "`reversed` выдаёт элементы с конца, но это не список, а «выдаватель» по одному. Поэтому обычно сразу пишут `list(reversed(...))`."
        ],
        "syntax": "list(reversed(список))",
        "example": "print(list(reversed([1, 2, 3])))",
        "id": "part-5",
        "output": "[3, 2, 1]"
      },
      {
        "title": "reversed строки",
        "paragraphs": [
          "Строку так же разворачивают через `reversed`, затем склеивают обратно. Множество так развернуть нельзя."
        ],
        "syntax": "\"\".join(reversed(строка))",
        "example": "print(\"\".join(reversed(\"кот\")))",
        "id": "part-6",
        "output": "ток"
      }
    ],
    "id": "sorting",
    "quick": {
      "summary": "`sorted(x)` возвращает **новый** отсортированный список, исходный не меняется. `reversed(x)` выдаёт элементы с конца.",
      "code": "users = [{\"id\": 2}, {\"id\": 1}]\nordered = sorted(users, key=lambda user: user[\"id\"])\nprint(ordered)\nprint(list(reversed([1, 2, 3])))",
      "takeaway": "`sorted` — новый список. `список.sort()` — меняет сам список и возвращает `None`. Никогда не пишите `lst = lst.sort()`.",
      "analogy": "`sorted` — сфотографировать книги на полке, расставленные по алфавиту: на фото порядок, а сама полка осталась как была. `list.sort()` — переставить книги на самой полке.",
      "output": "[{'id': 1}, {'id': 2}]\n[3, 2, 1]"
    },
    "inTests": {
      "text": "Частая проверка UI и API: «список отсортирован по цене». Сравниваем полученный список с его отсортированной копией.",
      "code": "def test_prices_sorted():\n    prices = [100, 250, 990]       # пришло с сайта\n    assert prices == sorted(prices)"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/conversion"
    ],
    "source": "https://docs.python.org/3/library/functions.html"
  },
  {
    "title": "range, enumerate и zip",
    "lead": "Числа для цикла, нумерация элементов и пары из двух коллекций.",
    "sections": [
      {
        "title": "range",
        "paragraphs": [
          "`range` даёт последовательность чисел. Сам по себе он не список: содержимое смотрят через `list(range(...))` или сразу в `for`. Правая граница не входит."
        ],
        "syntax": "range(stop)",
        "example": "print(list(range(3)))",
        "id": "part-1",
        "output": "[0, 1, 2]"
      },
      {
        "title": "range с шагом",
        "paragraphs": [
          "Три аргумента: начало, конец и шаг. Конец по-прежнему не входит."
        ],
        "syntax": "range(start, stop, step)",
        "example": "print(list(range(1, 8, 2)))",
        "id": "part-2",
        "output": "[1, 3, 5, 7]"
      },
      {
        "title": "enumerate",
        "paragraphs": [
          "`enumerate` нумерует элементы и заменяет ручной счётчик `i = 0`. `start` задаёт первый номер, по умолчанию `0`."
        ],
        "syntax": "enumerate(iterable, start=0)",
        "example": "names = [\"Анна\", \"Борис\"]\nfor i, name in enumerate(names, start=1):\n    print(i, name)",
        "id": "part-3",
        "output": "1 Анна\n2 Борис"
      },
      {
        "title": "zip",
        "paragraphs": [
          "`zip` идёт по нескольким коллекциям сразу и берёт элементы на одинаковых местах. Останавливается, когда закончилась самая короткая — лишние элементы длинной просто пропадают."
        ],
        "syntax": "zip(a, b, ...)",
        "example": "print(list(zip([1, 2, 3], [\"a\", \"b\"])))",
        "note": "Чтобы не терять элементы молча, пишите `zip(..., strict=True)` (Python 3.10+): при разной длине будет ошибка.",
        "id": "part-4",
        "output": "[(1, 'a'), (2, 'b')]"
      }
    ],
    "id": "iteration",
    "quick": {
      "summary": "`range` — числа подряд для цикла. `enumerate` — добавляет к элементам номера. `zip` — склеивает две коллекции в пары.",
      "code": "print(list(range(1, 6, 2)))\nprint(list(enumerate([\"a\", \"b\"], start=1)))\nprint(dict(zip([\"name\", \"active\"], [\"Анна\", True], strict=True)))",
      "takeaway": "Правая граница `range` не входит: `range(3)` — это 0, 1, 2. `zip` молча обрезает по короткой коллекции; `zip(..., strict=True)` сообщит, если длины разные.",
      "analogy": "`range` — номера мест в зале. `enumerate` — раздать участникам номерки по порядку. `zip` — рассадить пары: первый мальчик с первой девочкой, второй со второй.",
      "output": "[1, 3, 5]\n[(1, 'a'), (2, 'b')]\n{'name': 'Анна', 'active': True}"
    },
    "inTests": {
      "text": "`zip` удобен, чтобы сравнить два списка поэлементно и увидеть, на каком месте расхождение. `enumerate` — чтобы в сообщении об ошибке был номер строки.",
      "code": "def test_rows_match():\n    actual = [\"anna\", \"boris\"]\n    expected = [\"anna\", \"boris\"]\n    for i, (a, e) in enumerate(zip(actual, expected, strict=True), start=1):\n        assert a == e, f\"Строка {i}: {a} != {e}\""
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/conversion"
    ],
    "source": "https://docs.python.org/3/library/functions.html"
  },
  {
    "title": "map и filter",
    "lead": "Пройти по коллекции: либо преобразовать каждый элемент, либо оставить только подходящие.",
    "sections": [
      {
        "title": "Что делает map",
        "paragraphs": [
          "`map` берёт функцию и коллекцию. Функцию вызывают для **каждого** элемента, и из ответов собирают новую последовательность.",
          "Сам `map(...)` — ещё не список. Чтобы увидеть результат целиком, его оборачивают в `list(...)`. Функцией может быть `str`, `int`, `lambda` или обычный `def`."
        ],
        "syntax": "map(функция, коллекция)",
        "example": "print(list(map(str, [1, 2, 3])))",
        "note": "`map` сам по себе ничего не печатает. Либо пишите `list(map(...))`, либо сразу распаковывайте: `a, b = map(...)`.",
        "id": "part-1",
        "output": "['1', '2', '3']"
      },
      {
        "title": "map: числа сделать строками",
        "paragraphs": [
          "Готовая функция `str` превращает каждый элемент в текст. Список чисел становится списком строк. Это удобно, если потом нужно склеить значения или напечатать их как текст."
        ],
        "syntax": "list(map(str, коллекция))",
        "example": "print(list(map(str, [10, 20])))",
        "id": "part-2",
        "output": "['10', '20']"
      },
      {
        "title": "map: умножить каждый элемент",
        "paragraphs": [
          "Если готовой функции нет, правило пишут через `lambda`. Здесь каждый элемент списка умножается на 10. `x` — текущий элемент, `x * 10` — то, что кладут в ответ."
        ],
        "syntax": "list(map(lambda x: x * 10, коллекция))",
        "example": "print(list(map(lambda x: x * 10, [1, 2, 3, 4])))",
        "id": "part-3",
        "output": "[10, 20, 30, 40]"
      },
      {
        "title": "map: ввод двух чисел",
        "paragraphs": [
          "Классическая строка ввода: прочитать `\"3 7\"`, разрезать по пробелам и каждое слово превратить в `int`. `map` здесь не оборачивают в `list`, а сразу распаковывают в две переменные."
        ],
        "syntax": "a, b = map(int, input().split())",
        "example": "# человек ввёл: 3 7\na, b = map(int, input().split())\nprint(a + b)     # 10",
        "note": "Сколько чисел во вводе — столько переменных слева. Для трёх чисел: `a, b, c = map(int, input().split())`.",
        "id": "part-4"
      },
      {
        "title": "Что делает filter",
        "paragraphs": [
          "`filter` тоже идёт по коллекции, но **не меняет** элементы. Он оставляет только те, для которых функция дала истину. Остальные выбрасывает.",
          "Как и у `map`, результат — не список. Чтобы получить список, пишут `list(filter(...))`."
        ],
        "syntax": "filter(функция, коллекция)",
        "example": "print(list(filter(lambda x: x > 0, [-2, 0, 5])))",
        "id": "part-5",
        "output": "[5]"
      },
      {
        "title": "filter: только чётные",
        "paragraphs": [
          "Функция `lambda x: x % 2 == 0` для каждого числа отвечает, чётное ли оно. `filter` оставляет те элементы, где ответ `True`. Нечётные в результат не попадут."
        ],
        "syntax": "list(filter(lambda x: x % 2 == 0, коллекция))",
        "example": "print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))",
        "id": "part-6",
        "output": "[2, 4]"
      },
      {
        "title": "Тот же отбор без filter",
        "paragraphs": [
          "Тот же смысл можно записать включением: «положи `x`, если условие истинно». Оба варианта правильные. Включение часто читается проще, `filter` — короче, если функция уже есть."
        ],
        "syntax": "[x for x in коллекция if условие]",
        "example": "print([x for x in [1, 2, 3, 4] if x % 2 == 0])",
        "id": "part-7",
        "output": "[2, 4]"
      }
    ],
    "id": "map-filter",
    "quick": {
      "summary": "`map(функция, коллекция)` применяет функцию к каждому элементу. `filter(функция, коллекция)` оставляет только элементы, для которых функция ответила «да».",
      "code": "raw = [\"200\", \"404\", \"500\"]\ncodes = list(map(int, raw))\nerrors = list(filter(lambda code: code >= 400, codes))\nprint(errors)\n# Часто понятнее так:\nprint([code for code in codes if code >= 400])",
      "takeaway": "Результат `map` и `filter` — не список. Оберните в `list(...)`, чтобы увидеть. Часто понятнее записать то же самое через включение: `[x for x in items if условие]`.",
      "analogy": "`map` — конвейер, где каждую деталь красят в синий: сколько вошло, столько и вышло, но все синие. `filter` — сито: мелкие крупинки проходят, крупные остаются.",
      "output": "[404, 500]\n[404, 500]"
    },
    "inTests": {
      "text": "Отобрать из ответа только ошибки или привести все значения к числам перед проверкой.",
      "code": "def test_no_server_errors():\n    codes = list(map(int, [\"200\", \"404\", \"201\"]))\n    server_errors = list(filter(lambda c: c >= 500, codes))\n    assert server_errors == []"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/conversion"
    ],
    "source": "https://docs.python.org/3/library/functions.html"
  },
  {
    "title": "functools.reduce",
    "lead": "Свернуть коллекцию в одно значение: сумму, произведение, максимум.",
    "sections": [
      {
        "title": "Зачем нужен reduce",
        "paragraphs": [
          "`reduce` берёт функцию **двух** аргументов и проходит по коллекции слева направо. На каждом шаге в функцию попадают уже накопленный результат и следующий элемент. В конце остаётся одно значение.",
          "Функция лежит в модуле `functools`, поэтому её сначала импортируют. Для обычной суммы проще `sum`, для максимума — `max`. `reduce` нужен, когда нужно своё правило накопления. Для произведения есть `math.prod`, для склейки — `str.join`."
        ],
        "syntax": "from functools import reduce\n\nreduce(функция, коллекция)",
        "example": "from functools import reduce\nfrom math import prod\n\nprint(reduce(lambda a, b: a + b, [1, 2, 3], 0))\nprint(prod([1, 2, 3]))",
        "id": "part-1",
        "output": "6\n6"
      },
      {
        "title": "Начальное значение",
        "paragraphs": [
          "Если передать третье значение, с него начинают, а не с первого элемента. Так добавляют «начальный вклад»."
        ],
        "syntax": "reduce(функция, коллекция, старт)",
        "example": "from functools import reduce\nprint(reduce(lambda a, b: a + b, [1, 2, 3], 10))\n# начали с 10, затем +1 +2 +3",
        "id": "part-6",
        "output": "16"
      },
      {
        "title": "Пустая коллекция",
        "paragraphs": [
          "Со стартом пустой список безопасен: `reduce` вернёт сам старт. Без стартового значения по пустому списку будет `TypeError`."
        ],
        "syntax": "reduce(функция, [], старт)",
        "example": "from functools import reduce\nprint(reduce(lambda a, b: a + b, [], 0))",
        "note": "Без стартового значения `reduce` по пустому списку упадёт с `TypeError`. Со стартом вернёт сам старт.",
        "id": "part-7",
        "output": "0"
      }
    ],
    "id": "reduce",
    "quick": {
      "summary": "`reduce` «сворачивает» коллекцию в одно значение: берёт первые два элемента, объединяет, результат объединяет со следующим — и так до конца.",
      "code": "from functools import reduce\nfrom math import prod\n\nprint(reduce(lambda a, b: a + b, [1, 2, 3], 0))\nprint(prod([1, 2, 3]))",
      "takeaway": "Для частых задач есть готовое: сумма — `sum`, произведение — `math.prod`, склейка строк — `\"\".join`. `reduce` нужен, когда правило накопления своё. Всегда передавайте стартовое значение.",
      "analogy": "Как снежный ком: катите его по снегу (коллекции), и он налипает слой за слоем. В конце — один большой ком (результат).",
      "output": "6\n6"
    },
    "inTests": {
      "text": "В тестах `reduce` встречается редко — обычно хватает `sum` и `all`. Но его полезно узнавать в чужом коде: например, при объединении нескольких словарей настроек в один.",
      "code": "from functools import reduce\n\ndef test_merge_settings():\n    parts = [{\"browser\": \"chrome\"}, {\"headless\": True}]\n    settings = reduce(lambda acc, part: {**acc, **part}, parts, {})\n    assert settings == {\"browser\": \"chrome\", \"headless\": True}"
    },
    "level": "База",
    "aliases": [],
    "related": [
      "builtins/inspection",
      "builtins/conversion"
    ],
    "source": "https://docs.python.org/3/library/functions.html",
    "sectionAliases": {
      "part-2": "part-1",
      "part-3": "part-1",
      "part-4": "part-1",
      "part-5": "part-1",
      "part-8": "part-1",
      "part-9": "part-1",
      "part-10": "part-1"
    }
  }
];
