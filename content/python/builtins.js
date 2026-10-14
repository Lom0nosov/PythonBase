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
        "example": "print(len(\"Python\"))        # 6\n\nprint(len([10, 20, 30]))     # 3\n\nprint(len({\"a\": 1}))         # 1",
        "id": "part-1"
      },
      {
        "title": "type и isinstance",
        "paragraphs": [
          "`type(x)` показывает тип объекта. Так смотрят, число перед нами, строка или коллекция.",
          "`isinstance(x, тип)` отвечает, является ли объект этим типом. Этот вариант предпочтительнее `type(x) == ...`: он учитывает и наследников. Можно передать несколько типов кортежем."
        ],
        "example": "print(type(25))\n# <class 'int'>\n\nprint(isinstance(25, int))       # True",
        "id": "part-4",
        "note": "`type(x) == int` работает, но в проверках обычно пишут `isinstance`."
      }
    ],
    "id": "inspection",
    "quick": {
      "summary": "Длина объекта, его тип и проверка типа.",
      "code": "items = [\"login\", \"logout\"]\nprint(len(items))                 # 2\nprint(type(items).__name__)       # list\nprint(isinstance(items, list))    # True",
      "takeaway": "`len` считает элементы, а не размер в памяти. `isinstance` учитывает наследование; `type(x) is T` проверяет строго конкретный тип."
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
        "example": "print(int(\"10\"))        # 10",
        "note": "`int(\"3.9\")` нельзя: это не целая запись. Сначала `float(\"3.9\")`, потом `int(...)`.",
        "id": "part-1"
      },
      {
        "title": "int из другой системы",
        "paragraphs": [
          "Второй аргумент — система счисления. `int(\"101\", 2)` читает двоичную запись."
        ],
        "syntax": "int(\"101\", 2)",
        "example": "print(int(\"101\", 2))    # 5",
        "id": "part-2"
      },
      {
        "title": "float",
        "paragraphs": [
          "`float` делает дробное число. Десятичный разделитель — точка: `\"1.5\"`, не `\"1,5\"`. Допустимы также `\"2\"` и `\"1e3\"`."
        ],
        "syntax": "float(x)",
        "example": "print(float(\"1.5\"))     # 1.5",
        "id": "part-3"
      },
      {
        "title": "str",
        "paragraphs": [
          "`str` превращает значение в текст. Так число можно склеить с надписью."
        ],
        "syntax": "str(x)",
        "example": "print(str(25) + \" кг\")  # 25 кг",
        "id": "part-4"
      },
      {
        "title": "bool: ложное",
        "paragraphs": [
          "`bool(x)` отвечает, истинно ли значение в условии. Ложные: `0`, `0.0`, `\"\"`, `[]`, `{}`, `set()`, `None`."
        ],
        "syntax": "bool(x)",
        "example": "print(bool(0))          # False",
        "id": "part-5"
      },
      {
        "title": "bool: строка \"0\"",
        "paragraphs": [
          "Строка `\"0\"` истинна: она не пустая. То же со строкой `\"False\"`."
        ],
        "syntax": "bool(\"0\")",
        "example": "print(bool(\"0\"))        # True",
        "id": "part-6"
      }
    ],
    "id": "conversion",
    "quick": {
      "summary": "Преобразование значения из одного типа в другой.",
      "code": "print(int(\"42\"))       # 42\nprint(float(\"1.5\"))    # 1.5\nprint(str(200))        # 200 (строка)\nprint(bool([]))        # False\nprint(bool(\"False\"))   # True: непустая строка",
      "takeaway": "`bool(\"False\")` не разбирает текстовое значение. Числа с дробной частью преобразуйте через `float`; `int(3.9)` отбрасывает дробь к нулю."
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
        "example": "print(list(\"abc\"))                    # [\"a\", \"b\", \"c\"]",
        "id": "part-1"
      },
      {
        "title": "tuple",
        "paragraphs": [
          "`tuple` собирает кортеж. Исходный список при этом не меняется."
        ],
        "syntax": "tuple(iterable)",
        "example": "print(tuple([1, 2]))                  # (1, 2)",
        "id": "part-2"
      },
      {
        "title": "set",
        "paragraphs": [
          "`set` собирает множество: повторы исчезают."
        ],
        "syntax": "set(iterable)",
        "example": "print(set([1, 1, 2]))                 # {1, 2}",
        "id": "part-3"
      },
      {
        "title": "dict",
        "paragraphs": [
          "`dict` собирает словарь из пар `(ключ, значение)` или из именованных аргументов. Пустые объекты: `list()`, `tuple()`, `set()`, `dict()`. `{}` — словарь, не множество."
        ],
        "syntax": "dict(пары)",
        "example": "print(dict([(\"a\", 1), (\"b\", 2)]))     # {\"a\": 1, \"b\": 2}",
        "id": "part-4"
      }
    ],
    "id": "collections",
    "quick": {
      "summary": "Конструкторы коллекций: собрать список, кортеж, множество или словарь.",
      "code": "print(list(\"abc\"))                 # ['a', 'b', 'c']\nprint(tuple([1, 2]))               # (1, 2)\nprint(sorted(set([2, 1, 2])))       # [1, 2]\nprint(dict([(\"status\", 200)]))     # {'status': 200}",
      "takeaway": "`{}` создаёт словарь, `set()` — пустое множество. `list(existing_list)` и `dict(existing_dict)` копируют только внешний контейнер."
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
        "example": "print(abs(-7))             # 7",
        "id": "part-1"
      },
      {
        "title": "round",
        "paragraphs": [
          "`round` округляет: без второго аргумента к целому, со вторым — до указанного числа знаков."
        ],
        "syntax": "round(x, n)",
        "example": "print(round(3.14159, 2))   # 3.14",
        "id": "part-2",
        "note": "На точной середине округление идёт к чётному: round(2.5) == 2, round(3.5) == 4. Float хранит двоичные приближения: round(2.675, 2) == 2.67."
      },
      {
        "title": "int — не округление",
        "paragraphs": [
          "`int(3.9)` всегда отбрасывает дробь к нулю. Это не округление: `3.9` станет `3`, а не `4`."
        ],
        "syntax": "int(3.9)",
        "example": "print(int(3.9))            # 3",
        "id": "part-3"
      },
      {
        "title": "pow",
        "paragraphs": [
          "`pow(x, y)` — то же, что `x ** y`."
        ],
        "syntax": "pow(x, y)",
        "example": "print(pow(2, 10))          # 1024",
        "id": "part-4"
      },
      {
        "title": "pow с остатком",
        "paragraphs": [
          "Третий аргумент сразу берёт остаток: `pow(x, y, mod)` считают как `(x ** y) % mod`, часто быстрее."
        ],
        "syntax": "pow(x, y, mod)",
        "example": "print(pow(2, 10, 100))     # 24",
        "id": "part-5"
      }
    ],
    "id": "numbers",
    "quick": {
      "summary": "Модуль, округление и возведение в степень.",
      "code": "print(abs(-7))         # 7\nprint(round(2.5))      # 2\nprint(round(3.5))      # 4\nprint(round(1.234, 2)) # 1.23\nprint(int(-3.9))       # -3\nprint(2 ** 3)         # 8",
      "takeaway": "На точной середине `round` выбирает ближайшее чётное. Десятичные дроби не всегда точно хранятся во float; сравнивайте с допуском через `math.isclose`."
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
        "example": "nums = [3, 1, 8, 2]\nprint(min(nums))          # 1",
        "id": "part-1"
      },
      {
        "title": "max",
        "paragraphs": [
          "`max` находит наибольшее значение. Аргументы можно перечислить через запятую без списка."
        ],
        "syntax": "max(a, b, c)",
        "example": "print(max(3, 1, 8))       # 8",
        "id": "part-2"
      },
      {
        "title": "sum",
        "paragraphs": [
          "`sum` складывает числа. Пустой `sum([])` даёт `0`. Строки `sum` не склеивает — для этого `\"\".join(...)`."
        ],
        "syntax": "sum(iterable)",
        "example": "print(sum([3, 1, 8, 2]))  # 14",
        "id": "part-3"
      },
      {
        "title": "sum со стартом",
        "paragraphs": [
          "Второй аргумент — начальное значение. Его прибавляют к сумме элементов."
        ],
        "syntax": "sum(iterable, start)",
        "example": "print(sum([3, 1, 8, 2], 100))     # 114",
        "id": "part-4"
      },
      {
        "title": "min с key",
        "paragraphs": [
          "`key=` говорит, по чему сравнивать. `min(words, key=len)` найдёт самое короткое слово, а не первое по алфавиту."
        ],
        "syntax": "min(iterable, key=len)",
        "example": "words = [\"я\", \"питон\", \"код\"]\nprint(min(words, key=len))    # я",
        "id": "part-5"
      },
      {
        "title": "max с key",
        "paragraphs": [
          "Тот же `key=` для `max` находит элемент с наибольшим признаком: здесь самое длинное слово."
        ],
        "syntax": "max(iterable, key=len)",
        "example": "words = [\"я\", \"питон\", \"код\"]\nprint(max(words, key=len))    # питон",
        "id": "part-6"
      },
      {
        "id": "all-any",
        "title": "all и any: проверки коллекции",
        "paragraphs": [
          "`all` возвращает True, если каждый элемент истинен; `any` — если истинен хотя бы один. Обе функции прекращают обход, как только ответ известен.",
          "Для пустой коллекции `all` возвращает True, а `any` — False. Если пустой набор недопустим, отдельно проверьте, что он не пуст."
        ],
        "example": "statuses = [200, 201, 204]\nprint(all(code < 400 for code in statuses))  # True\nprint(any(code >= 500 for code in statuses)) # False"
      }
    ],
    "id": "aggregates",
    "quick": {
      "summary": "`min` / `max` — крайние значения, `sum` — сумма. `all` проверяет, что истинны все элементы, `any` — хотя бы один.",
      "code": "durations = [120, 85, 200]\nprint(min(durations))          # 85\nprint(max(durations))          # 200\nprint(sum(durations))          # 405\nprint(min([], default=None))   # None\nprint(all([True, True]))       # True\nprint(any([False, True]))      # True",
      "takeaway": "`min` и `max` на пустой коллекции требуют `default`, иначе будет `ValueError`. `all([])` — True, `any([])` — False."
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
        "example": "nums = [3, 1, 2]\nprint(sorted(nums))                 # [1, 2, 3]",
        "id": "part-1"
      },
      {
        "title": "sorted по убыванию",
        "paragraphs": [
          "`reverse=True` сортирует по убыванию. Исходная коллекция по-прежнему не меняется."
        ],
        "syntax": "sorted(iterable, reverse=True)",
        "example": "print(sorted([3, 1, 2], reverse=True))   # [3, 2, 1]",
        "id": "part-2"
      },
      {
        "title": "sorted с key",
        "paragraphs": [
          "`key=` задаёт признак сравнения. Здесь слова упорядочены по длине."
        ],
        "syntax": "sorted(iterable, key=функция)",
        "example": "print(sorted([\"я\", \"питон\", \"код\"], key=len))\n# [\"я\", \"код\", \"питон\"]",
        "id": "part-3"
      },
      {
        "title": "sort vs sorted",
        "paragraphs": [
          "У списка есть метод `.sort()`: он меняет объект на месте и возвращает `None`. `sorted` возвращает новый список."
        ],
        "syntax": "lst.sort()",
        "example": "nums = [3, 1, 2]\nnums.sort()\nprint(nums)                         # [1, 2, 3]",
        "note": "Не пишите `lst = lst.sort()`. Метод вернёт `None`, и список пропадёт из переменной.",
        "id": "part-4"
      },
      {
        "title": "reversed списка",
        "paragraphs": [
          "`reversed` даёт элементы с конца, но это не список, а итератор. Обычно сразу пишут `list(reversed(...))`. Нужен объект с `__reversed__` либо поддержкой протокола последовательности."
        ],
        "syntax": "list(reversed(список))",
        "example": "print(list(reversed([1, 2, 3])))    # [3, 2, 1]",
        "id": "part-5"
      },
      {
        "title": "reversed строки",
        "paragraphs": [
          "Строку так же разворачивают через `reversed`, затем склеивают обратно. Множество так развернуть нельзя."
        ],
        "syntax": "\"\".join(reversed(строка))",
        "example": "print(\"\".join(reversed(\"кот\")))     # ток",
        "id": "part-6"
      }
    ],
    "id": "sorting",
    "quick": {
      "summary": "Новый отсортированный список и обход в обратном порядке.",
      "code": "users = [{\"id\": 2}, {\"id\": 1}]\nordered = sorted(users, key=lambda user: user[\"id\"])\nprint(ordered)  # [{'id': 1}, {'id': 2}]\nprint(list(reversed([1, 2, 3])))  # [3, 2, 1]",
      "takeaway": "`sorted` возвращает новый список; `list.sort()` меняет исходный и возвращает None. `reversed` меняет порядок обхода, но не сортирует."
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
        "example": "print(list(range(3)))          # [0, 1, 2]",
        "id": "part-1"
      },
      {
        "title": "range с шагом",
        "paragraphs": [
          "Три аргумента: начало, конец и шаг. Конец по-прежнему не входит."
        ],
        "syntax": "range(start, stop, step)",
        "example": "print(list(range(1, 8, 2)))    # [1, 3, 5, 7]",
        "id": "part-2"
      },
      {
        "title": "enumerate",
        "paragraphs": [
          "`enumerate` нумерует элементы и заменяет ручной счётчик `i = 0`. `start` задаёт первый номер, по умолчанию `0`."
        ],
        "syntax": "enumerate(iterable, start=0)",
        "example": "names = [\"Анна\", \"Борис\"]\nfor i, name in enumerate(names, start=1):\n    print(i, name)",
        "id": "part-3"
      },
      {
        "title": "zip",
        "paragraphs": [
          "`zip` идёт по нескольким коллекциям сразу и берёт пары элементов с одинаковой позицией. Останавливается, когда заканчивается самая короткая. Лишние элементы длинной коллекции в результат не попадут."
        ],
        "syntax": "zip(a, b, ...)",
        "example": "print(list(zip([1, 2, 3], [\"a\", \"b\"])))\n# [(1, \"a\"), (2, \"b\")]",
        "note": "Обычный `zip` обрезает результат по короткому входу. `zip(..., strict=True)` в Python 3.10+ выявляет разную длину при обходе с `ValueError`.",
        "id": "part-4"
      }
    ],
    "id": "iteration",
    "quick": {
      "summary": "Числа для цикла, нумерация элементов и пары из двух коллекций.",
      "code": "print(list(range(1, 6, 2)))  # [1, 3, 5]\nprint(list(enumerate([\"a\", \"b\"], start=1)))\n# [(1, 'a'), (2, 'b')]\nprint(dict(zip([\"name\", \"active\"], [\"Анна\", True], strict=True)))\n# {'name': 'Анна', 'active': True}",
      "takeaway": "Обычный `zip` обрезает результат по короткому входу. `zip(..., strict=True)` в Python 3.10+ выявляет разную длину при обходе с `ValueError`."
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
        "example": "print(list(map(str, [1, 2, 3])))\n# [\"1\", \"2\", \"3\"]",
        "note": "`map` сам по себе ничего не печатает. Либо пишите `list(map(...))`, либо сразу распаковывайте: `a, b = map(...)`.",
        "id": "part-1"
      },
      {
        "title": "map: числа сделать строками",
        "paragraphs": [
          "Готовая функция `str` превращает каждый элемент в текст. Список чисел становится списком строк. Это удобно, если потом нужно склеить значения или напечатать их как текст."
        ],
        "syntax": "list(map(str, коллекция))",
        "example": "print(list(map(str, [10, 20])))\n# [\"10\", \"20\"]",
        "id": "part-2"
      },
      {
        "title": "map: умножить каждый элемент",
        "paragraphs": [
          "Если готовой функции нет, правило пишут через `lambda`. Здесь каждый элемент списка умножается на 10. `x` — текущий элемент, `x * 10` — то, что кладут в ответ."
        ],
        "syntax": "list(map(lambda x: x * 10, коллекция))",
        "example": "print(list(map(lambda x: x * 10, [1, 2, 3, 4])))\n# [10, 20, 30, 40]",
        "id": "part-3"
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
        "example": "print(list(filter(lambda x: x > 0, [-2, 0, 5])))\n# [5]",
        "id": "part-5"
      },
      {
        "title": "filter: только чётные",
        "paragraphs": [
          "Функция `lambda x: x % 2 == 0` для каждого числа отвечает, чётное ли оно. `filter` оставляет те элементы, где ответ `True`. Нечётные в результат не попадут."
        ],
        "syntax": "list(filter(lambda x: x % 2 == 0, коллекция))",
        "example": "print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))\n# [2, 4]",
        "id": "part-6"
      },
      {
        "title": "Тот же отбор без filter",
        "paragraphs": [
          "Тот же смысл можно записать включением: «положи `x`, если условие истинно». Оба варианта правильные. Включение часто читается проще, `filter` — короче, если функция уже есть."
        ],
        "syntax": "[x for x in коллекция if условие]",
        "example": "print([x for x in [1, 2, 3, 4] if x % 2 == 0])\n# [2, 4]",
        "id": "part-7"
      }
    ],
    "id": "map-filter",
    "quick": {
      "summary": "Пройти по коллекции: либо преобразовать каждый элемент, либо оставить только подходящие.",
      "code": "raw = [\"200\", \"404\", \"500\"]\ncodes = list(map(int, raw))\nerrors = list(filter(lambda code: code >= 400, codes))\nprint(errors)  # [404, 500]\n# Часто понятнее так:\nprint([code for code in codes if code >= 400])  # [404, 500]",
      "takeaway": "`map` преобразует, `filter` отбирает. Оба возвращают ленивые итераторы: вычисления начинаются при обходе, повторный обход исчерпанного итератора пуст."
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
        "example": "from functools import reduce\nfrom math import prod\n\nprint(reduce(lambda a, b: a + b, [1, 2, 3], 0))  # 6\nprint(prod([1, 2, 3]))  # 6",
        "id": "part-1"
      },
      {
        "title": "Начальное значение",
        "paragraphs": [
          "Если передать третье значение, с него начинают, а не с первого элемента. Так добавляют «начальный вклад»."
        ],
        "syntax": "reduce(функция, коллекция, старт)",
        "example": "from functools import reduce\nprint(reduce(lambda a, b: a + b, [1, 2, 3], 10))\n# 16  — начали с 10, затем +1 +2 +3",
        "id": "part-6"
      },
      {
        "title": "Пустая коллекция",
        "paragraphs": [
          "Со стартом пустой список безопасен: `reduce` вернёт сам старт. Без стартового значения по пустому списку будет `TypeError`."
        ],
        "syntax": "reduce(функция, [], старт)",
        "example": "from functools import reduce\nprint(reduce(lambda a, b: a + b, [], 0))\n# 0",
        "note": "Без стартового значения `reduce` по пустому списку упадёт с `TypeError`. Со стартом вернёт сам старт.",
        "id": "part-7"
      }
    ],
    "id": "reduce",
    "quick": {
      "summary": "reduce сворачивает элементы в один результат. Для суммы берите sum, для произведения — math.prod.",
      "code": "from functools import reduce\nfrom math import prod\n\nprint(reduce(lambda a, b: a + b, [1, 2, 3], 0))  # 6\nprint(prod([1, 2, 3]))  # 6",
      "takeaway": "Третий аргумент задаёт старт и результат для пустой коллекции. Для обычных сумм, произведений и склейки используйте `sum`, `math.prod` и `str.join`."
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
