/* Самодостаточные примеры; output — проверяемый ожидаемый stdout. Сохраняйте id для ссылок. */
window.PythonBase.content.decorators = [
  {
    "title": "Простой декоратор",
    "lead": "Добавить действие до и после функции, не меняя её саму.",
    "sections": [
      {
        "id": "part-1",
        "title": "Функция → обёртка → вызов",
        "paragraphs": [
          "Допустим, перед проверкой нужно напечатать «До вызова», а после — «После вызова». Менять саму функцию `check` не хочется. Декоратор делает это снаружи.",
          "`logged` получает функцию `check` и создаёт внутри себя новую функцию `wrapper` (обёртку). Обёртка печатает сообщение, вызывает настоящую `check`, печатает второе сообщение.",
          "После `@logged` имя `check` указывает уже на обёртку. А настоящая функция спрятана внутри неё под именем `func`."
        ],
        "example": "def logged(func):\n    def wrapper():\n        print(\"До вызова\")\n        result = func()\n        print(\"После вызова\")\n        return result\n    return wrapper\n\n@logged\ndef check():\n    return \"passed\"\n\nprint(check())",
        "output": "До вызова\nПосле вызова\npassed",
        "steps": [
          "Python видит `@logged` и сразу (один раз) выполняет `check = logged(check)`.",
          "Когда вы пишете `check()`, на самом деле запускается `wrapper`: сообщение → настоящая `check()` → сообщение.",
          "`return result` отдаёт наружу результат настоящей функции — `\"passed\"`."
        ],
        "mistakes": [
          "Забыть `return wrapper` — `check` станет `None`, и вызов `check()` упадёт.",
          "Забыть `return result` в обёртке — функция отработает, но вместо результата вы получите `None`."
        ],
        "syntax": "def декоратор(func):\n    def wrapper():\n        # действие до\n        result = func()\n        # действие после\n        return result\n    return wrapper"
      },
      {
        "id": "without-at",
        "title": "То же самое без значка @",
        "paragraphs": [
          "Значок `@` — это просто короткая запись. Ниже то же самое руками: передаём функцию в декоратор и записываем результат обратно в то же имя.",
          "Мы заранее сохранили оригинал в `original`, поэтому видно разницу: `check()` печатает «Вызов», а `original()` — нет."
        ],
        "example": "def logged(func):\n    def wrapper():\n        print(\"Вызов\")\n        return func()\n    return wrapper\n\ndef check():\n    return \"passed\"\n\noriginal = check\ncheck = logged(check)\nprint(check())\nprint(original())",
        "output": "Вызов\npassed\npassed",
        "note": "Эта простая обёртка работает только с функциями без аргументов. Универсальный шаблон — в следующей теме «Аргументы, return и wraps»."
      }
    ],
    "id": "simple",
    "quick": {
      "summary": "Декоратор — это функция, которая берёт другую функцию и «заворачивает» её в обёртку. Запись `@logged` над функцией означает: «вместо `check` теперь используй `logged(check)`».",
      "code": "def logged(func):\n    def wrapper():\n        print(\"До вызова\")\n        result = func()\n        print(\"После вызова\")\n        return result\n    return wrapper\n\n@logged\ndef check():\n    return \"passed\"\n\nprint(check())",
      "takeaway": "Декоратор должен вернуть обёртку: `return wrapper` (без скобок!). А обёртка должна вернуть результат функции: `return result`, иначе он потеряется.",
      "output": "До вызова\nПосле вызова\npassed",
      "analogy": "Как подарочная упаковка: подарок (ваша функция) внутри не меняется, но у коробки появляется бантик и открытка (действия до и после). Кто открывает подарок — сначала видит упаковку."
    },
    "inTests": {
      "text": "Вы уже пользуетесь декораторами в pytest: `@pytest.fixture` превращает функцию в фикстуру, `@pytest.mark.smoke` вешает на тест метку, `@pytest.mark.parametrize` запускает тест с разными данными.",
      "code": "import pytest\n\n@pytest.mark.smoke\ndef test_login():\n    assert \"admin\" == \"admin\"\n\n@pytest.mark.parametrize(\"status\", [200, 201])\ndef test_status_ok(status):\n    assert status < 300"
    },
    "level": "Следующий шаг",
    "aliases": [
      "decorator",
      "обертка",
      "wrapper",
      "декораторы",
      "simple"
    ],
    "related": [
      "decorators/universal",
      "decorators/parameterized",
      "topics/scope"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Аргументы, return и wraps",
    "lead": "Шаблон декоратора, который подходит для любой обычной функции.",
    "sections": [
      {
        "id": "part-1",
        "title": "Что делает каждая часть шаблона",
        "paragraphs": [
          "`*args` собирает обычные аргументы в кортеж, `**kwargs` — именованные в словарь. При вызове `func(*args, **kwargs)` звёздочки «распаковывают» их обратно — функция получает ровно то, что ей передали.",
          "`@wraps(func)` ничего не вызывает. Он просто копирует в обёртку имя и описание настоящей функции. Без него `total.__name__` был бы `\"wrapper\"`."
        ],
        "example": "from functools import wraps\n\ndef traced(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Вызов:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@traced\ndef total(price, quantity=1):\n    \"\"\"Стоимость заказа.\"\"\"\n    return price * quantity\n\nprint(total(100, quantity=2))\nprint(total.__name__)",
        "output": "Вызов: total\n200\ntotal",
        "steps": [
          "Вызов `total(100, quantity=2)` попадает в обёртку: `args = (100,)`, `kwargs = {\"quantity\": 2}`.",
          "`func(*args, **kwargs)` вызывает настоящую `total(100, quantity=2)`.",
          "`return` отдаёт 200, а `@wraps` сохранил имя `total`."
        ],
        "syntax": "from functools import wraps\n\ndef декоратор(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper"
      },
      {
        "id": "limitations",
        "title": "Чего шаблон не делает",
        "paragraphs": [
          "Обёртка не ловит ошибки. Если функция упала, ошибка пойдёт дальше — к тому, кто её вызвал. Это правильно: ошибки нельзя прятать."
        ],
        "mistakes": [
          "Писать `func(args, kwargs)` без звёздочек. Функция получит два странных аргумента — кортеж и словарь — вместо исходных.",
          "Добавлять `try/except` «для надёжности», который ничего не делает с ошибкой. Вы потеряете причину падения.",
          "Оборачивать генераторы и `async`-функции обычной обёрткой. Они начинают работу позже, и обёртка «увидит» только их создание."
        ]
      }
    ],
    "id": "universal",
    "quick": {
      "summary": "`*args, **kwargs` в обёртке принимают любые аргументы и передают их дальше. `return` возвращает результат. `@wraps(func)` сохраняет функции её настоящее имя.",
      "code": "from functools import wraps\n\ndef traced(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Вызов:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@traced\ndef total(price, quantity=1):\n    \"\"\"Стоимость заказа.\"\"\"\n    return price * quantity\n\nprint(total(100, quantity=2))\nprint(total.__name__)",
      "takeaway": "Запомните этот шаблон — 90% декораторов пишутся по нему. Он подходит для `def`. Для `async def` нужна обёртка `async def` с `await`.",
      "output": "Вызов: total\n200\ntotal",
      "analogy": "Обёртка — как курьер: что бы ни лежало в посылке (любые аргументы), он передаёт её получателю как есть и приносит обратно ответ. `@wraps` — это бейдж курьера с именем получателя, чтобы все знали, к кому он относится."
    },
    "inTests": {
      "text": "По этому шаблону пишут полезные помощники для тестов: «шаг отчёта» (печатает название шага), «повтор при сбое», «замер времени». Без `@wraps` в отчёте pytest вместо имени теста было бы непонятное `wrapper`.",
      "code": "from functools import wraps\n\ndef step(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"ШАГ:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@step\ndef open_login_page(url):\n    return url + \"/login\"\n\ndef test_login_page():\n    assert open_login_page(\"https://site.ru\") == \"https://site.ru/login\""
    },
    "level": "Следующий шаг",
    "aliases": [
      "universal"
    ],
    "related": [
      "topics/args-kwargs",
      "decorators/simple",
      "decorators/method"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Декоратор с параметрами",
    "lead": "Декоратор, которому можно передать настройку: `@tagged(\"SMOKE\")`.",
    "sections": [
      {
        "id": "part-1",
        "title": "Кто какие данные получает",
        "paragraphs": [
          "Внешняя функция `tagged` получает **настройку** — метку `\"SMOKE\"`. Она нужна, только чтобы запомнить эту метку.",
          "Средняя `decorator` получает **функцию** и создаёт обёртку — точно как в простом декораторе.",
          "Внутренняя `wrapper` получает **аргументы вызова**. Она «помнит» и метку, и функцию, потому что создана внутри них."
        ],
        "example": "from functools import wraps\n\ndef tagged(label):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            print(label, func.__name__)\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@tagged(\"SMOKE\")\ndef check_login():\n    return \"passed\"\n\nprint(check_login())",
        "output": "SMOKE check_login\npassed",
        "steps": [
          "`tagged(\"SMOKE\")` возвращает `decorator`.",
          "`decorator(check_login)` возвращает `wrapper`.",
          "Каждый вызов `check_login()` запускает `wrapper`: печатает метку и вызывает настоящую функцию."
        ],
        "mistakes": [
          "Написать `@tagged` без скобок. Тогда в `label` попадёт сама функция, и всё сломается.",
          "Перепутать `return decorator` и `return wrapper`. Каждый `return` стоит на своём уровне отступа — проверяйте их."
        ],
        "syntax": "def фабрика(настройка):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator"
      },
      {
        "id": "stacking",
        "title": "Несколько декораторов: порядок важен",
        "paragraphs": [
          "Декораторы применяются **снизу вверх**: сначала ближний к `def`, потом верхний. А при вызове первой срабатывает **верхняя** обёртка.",
          "Это как надеть футболку, а сверху куртку: надеваем снизу вверх, а снаружи видна куртка."
        ],
        "example": "from functools import wraps\n\ndef tagged(label):\n    def decorator(func):\n        @wraps(func)\n        def wrapper():\n            print(label, \"до\")\n            result = func()\n            print(label, \"после\")\n            return result\n        return wrapper\n    return decorator\n\n@tagged(\"A\")\n@tagged(\"B\")\ndef check():\n    print(\"проверка\")\n\ncheck()",
        "output": "A до\nB до\nпроверка\nB после\nA после",
        "note": "Здесь `check = tagged(\"A\")(tagged(\"B\")(check))`. Порядок особенно важен, когда сочетаете логирование, повтор при сбое и кэш."
      }
    ],
    "id": "parameterized",
    "quick": {
      "summary": "Если декоратору нужен параметр, добавляется ещё один уровень. `tagged(\"SMOKE\")` запоминает метку и возвращает обычный декоратор. Дальше всё как раньше.",
      "code": "from functools import wraps\n\ndef tagged(label):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            print(label, func.__name__)\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@tagged(\"SMOKE\")\ndef check_login():\n    return \"passed\"\n\nprint(check_login())",
      "takeaway": "Три уровня: **настройка** → **декоратор** → **обёртка**. `@tagged(\"SMOKE\")` равно `check_login = tagged(\"SMOKE\")(check_login)`. Скобки после имени обязательны.",
      "output": "SMOKE check_login\npassed",
      "analogy": "Как штамп с настраиваемой надписью: сначала вы выставляете буквы «SMOKE» (`tagged(\"SMOKE\")`), получаете готовый штамп, и уже им ставите отметку на функцию."
    },
    "inTests": {
      "text": "Так устроены `@pytest.mark.parametrize(...)` и `@pytest.mark.skip(reason=...)`: в скобках настройка, а сам декоратор потом применяется к тесту.",
      "code": "import pytest\n\n@pytest.mark.skip(reason=\"Баг JIRA-123 ещё не исправлен\")\ndef test_payment():\n    assert False"
    },
    "level": "Следующий шаг",
    "aliases": [
      "parameterized"
    ],
    "related": [
      "decorators/simple",
      "decorators/stateful",
      "decorators/retry"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Состояние в декораторе",
    "lead": "Декоратор, который помнит что-то между вызовами: например, счётчик.",
    "sections": [
      {
        "id": "part-1",
        "title": "Почему счётчик не сбрасывается",
        "paragraphs": [
          "`counted` выполняется **один раз** — когда Python видит `@counted`. Именно тогда создаётся `calls = 0`.",
          "`wrapper` выполняется **при каждом вызове** и каждый раз прибавляет единицу к той же самой переменной `calls`."
        ],
        "example": "from functools import wraps\n\ndef counted(func):\n    calls = 0\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        nonlocal calls\n        calls += 1\n        print(\"Вызов\", calls)\n        return func(*args, **kwargs)\n    return wrapper\n\n@counted\ndef check():\n    return \"passed\"\n\nprint(check())\nprint(check())",
        "output": "Вызов 1\npassed\nВызов 2\npassed",
        "steps": [
          "`calls = 0` — один раз, при создании обёртки.",
          "`nonlocal calls` говорит: «меняй `calls` снаружи, а не создавай новую».",
          "Каждый вызов делает `calls += 1`."
        ],
        "mistakes": [
          "Написать `calls = 0` внутри `wrapper`. Тогда счётчик обнуляется при каждом вызове.",
          "Забыть `nonlocal`. Python решит, что `calls` — новая переменная внутри обёртки, и выдаст ошибку `UnboundLocalError`."
        ]
      },
      {
        "id": "scope",
        "title": "У каждой функции свой счётчик",
        "paragraphs": [
          "Каждый `@counted` создаёт новую обёртку со своим `calls`. Две разные функции считают независимо.",
          "Счётчик в примере растёт до вызова функции, поэтому считает и неудачные вызовы. Если нужны только успешные — увеличивайте его после `func(...)`."
        ]
      }
    ],
    "id": "stateful",
    "quick": {
      "summary": "Переменная, созданная в декораторе рядом с обёрткой, живёт между вызовами. Чтобы обёртка могла её менять, нужно слово `nonlocal`.",
      "code": "from functools import wraps\n\ndef counted(func):\n    calls = 0\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        nonlocal calls\n        calls += 1\n        print(\"Вызов\", calls)\n        return func(*args, **kwargs)\n    return wrapper\n\n@counted\ndef check():\n    return \"passed\"\n\nprint(check())\nprint(check())",
      "takeaway": "Счётчик свой у каждой декорированной функции. Если повесить такой декоратор на метод класса, счётчик будет общим для всех объектов этого класса.",
      "output": "Вызов 1\npassed\nВызов 2\npassed",
      "analogy": "Как счётчик посетителей на двери магазина: дверь (обёртка) открывается много раз, а счётчик висит рядом и прибавляет по единице. Он не обнуляется, пока магазин не перестроят."
    },
    "inTests": {
      "text": "Так можно посчитать, сколько раз вызвалась функция: например, проверить, что повтор при сбое сделал ровно 3 попытки. В тестах для этого чаще используют `unittest.mock.Mock` — у него есть готовый `call_count`.",
      "code": "from unittest.mock import Mock\n\ndef test_called_twice():\n    send = Mock(return_value=\"ok\")\n    send()\n    send()\n    assert send.call_count == 2"
    },
    "level": "Следующий шаг",
    "aliases": [
      "stateful"
    ],
    "related": [
      "topics/scope",
      "decorators/cache",
      "decorators/method"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Кэширование результатов",
    "lead": "Не считать заново то, что уже посчитано.",
    "sections": [
      {
        "id": "part-1",
        "title": "Готовый кэш из стандартной библиотеки",
        "paragraphs": [
          "`print(\"Вычисление\")` в примере показывает, когда функция реально работает. Во втором вызове этой строки нет — ответ взят из кэша.",
          "`maxsize=128` — сколько ответов хранить. Когда место кончается, выкидываются те, которыми давно не пользовались. `cache_info()` показывает статистику, `cache_clear()` очищает кэш."
        ],
        "example": "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef normalize(name):\n    print(\"Вычисление\")\n    return name.strip().lower()\n\nprint(normalize(\" Admin \"))\nprint(normalize(\" Admin \"))\nprint(normalize.cache_info().hits)\nnormalize.cache_clear()",
        "output": "Вычисление\nadmin\nadmin\n1",
        "mistakes": [
          "Передать список или словарь в аргументах. Будет ошибка `TypeError: unhashable type` — их нельзя использовать как ключ кэша.",
          "Ждать, что `f(1)` и `f(x=1)` возьмут один ответ. Для кэша это разные вызовы.",
          "Ждать, что кэш сам обновится, когда данные изменились. Не обновится — очищайте его через `cache_clear()`."
        ]
      },
      {
        "id": "mutable-result",
        "title": "Почему нельзя менять результат из кэша",
        "paragraphs": [
          "Кэш отдаёт **тот же самый** объект, а не копию. Если поменять полученный список, изменится и то, что лежит в кэше. Следующий вызов вернёт уже испорченный список."
        ],
        "example": "from functools import lru_cache\n\n@lru_cache(maxsize=2)\ndef labels():\n    return [\"smoke\"]\n\nfirst = labels()\nfirst.append(\"changed\")\nprint(labels())\nprint(first is labels())",
        "output": "['smoke', 'changed']\nTrue",
        "note": "Если результат нужно менять — возвращайте кортеж вместо списка или делайте копию перед изменением."
      }
    ],
    "id": "cache",
    "quick": {
      "summary": "`@lru_cache` запоминает результат для каждого набора аргументов. При повторном вызове с теми же аргументами функция не работает — ответ берётся из памяти.",
      "code": "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef normalize(name):\n    print(\"Вычисление\")\n    return name.strip().lower()\n\nprint(normalize(\" Admin \"))\nprint(normalize(\" Admin \"))\nprint(normalize.cache_info().hits)\nnormalize.cache_clear()",
      "takeaway": "Аргументы должны быть неизменяемыми (числа, строки, кортежи). Не кэшируйте то, что меняется со временем: ответ сервера, текущее время, состояние базы.",
      "output": "Вычисление\nadmin\nadmin\n1",
      "analogy": "Как шпаргалка с готовыми ответами: первый раз вы решаете задачу и записываете ответ. Когда спросят то же самое — просто подглядываете в шпаргалку."
    },
    "inTests": {
      "text": "Кэш помогает, когда тестам нужны дорогие данные, которые не меняются: например, один раз прочитать большой файл с тестовыми данными. Но кэшировать ответы сервера в тестах нельзя — вы будете проверять старый ответ.",
      "code": "from functools import lru_cache\nimport json\n\n@lru_cache\ndef load_users():\n    return json.dumps([\"admin\", \"guest\"])   # представим, что читаем большой файл\n\ndef test_admin_exists():\n    assert \"admin\" in json.loads(load_users())"
    },
    "level": "Следующий шаг",
    "aliases": [
      "cache"
    ],
    "related": [
      "topics/references-copy",
      "decorators/stateful",
      "topics/tuples"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Логирование вызовов",
    "lead": "Видеть, когда функция началась, закончилась или упала.",
    "sections": [
      {
        "id": "part-1",
        "title": "Что значит каждое сообщение",
        "paragraphs": [
          "«Начало» печатается до вызова, «Успех» — после. Если функция выбросит ошибку, до строки «Успех» дело не дойдёт, а ошибка выйдет наружу."
        ],
        "example": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Начало:\", func.__name__)\n        result = func(*args, **kwargs)\n        print(\"Успех:\", func.__name__)\n        return result\n    return wrapper\n\n@logged\ndef check_status(status):\n    return status == 200\n\nprint(check_status(200))",
        "output": "Начало: check_status\nУспех: check_status\nTrue"
      },
      {
        "id": "logging-module",
        "title": "Вариант для проекта: модуль logging",
        "paragraphs": [
          "`logger.info` — обычная запись. `logger.exception` — запись об ошибке вместе с подробностями, где она случилась.",
          "После записи ошибки стоит `raise` без аргументов — он отправляет ту же ошибку дальше. Мы её записали, но не спрятали."
        ],
        "example": "import logging\nimport sys\nfrom functools import wraps\n\nlogging.basicConfig(level=logging.INFO, format=\"%(message)s\", stream=sys.stdout)\nlogger = logging.getLogger(__name__)\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        logger.info(\"Начало: %s\", func.__name__)\n        try:\n            result = func(*args, **kwargs)\n        except Exception:\n            logger.exception(\"Ошибка: %s\", func.__name__)\n            raise\n        logger.info(\"Успех: %s\", func.__name__)\n        return result\n    return wrapper\n\n@logged\ndef check():\n    return \"passed\"\n\nprint(check())",
        "output": "Начало: check\nУспех: check\npassed",
        "note": "Здесь широкий `except Exception` допустим только потому, что сразу за ним `raise`. Настраивать `logging` (`basicConfig`) нужно один раз в начале программы."
      }
    ],
    "id": "logging",
    "quick": {
      "summary": "Обёртка печатает сообщение до вызова и после. «Успех» печатается только после того, как функция отработала. Результат обязательно возвращаем.",
      "code": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Начало:\", func.__name__)\n        result = func(*args, **kwargs)\n        print(\"Успех:\", func.__name__)\n        return result\n    return wrapper\n\n@logged\ndef check_status(status):\n    return status == 200\n\nprint(check_status(200))",
      "takeaway": "В настоящем проекте вместо `print` используйте модуль `logging`. И не пишите в лог все аргументы подряд: среди них могут быть пароли и токены.",
      "output": "Начало: check_status\nУспех: check_status\nTrue",
      "analogy": "Как журнал на проходной: «вошёл в 9:00», «вышел в 18:00». Если сотрудник не вышел (функция упала), записи «вышел» не будет — и сразу понятно, где искать проблему."
    },
    "inTests": {
      "text": "Логи — главный помощник при разборе упавшего теста. pytest сам собирает сообщения из `logging` и показывает их в отчёте, если тест упал. А фикстура `caplog` позволяет проверить, что нужная запись появилась.",
      "code": "import logging\n\ndef test_warning_is_logged(caplog):\n    logging.getLogger().warning(\"Медленный ответ\")\n    assert \"Медленный ответ\" in caplog.text"
    },
    "level": "Следующий шаг",
    "aliases": [
      "logging"
    ],
    "related": [
      "decorators/universal",
      "topics/exceptions",
      "decorators/timer"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Измерение времени",
    "lead": "Узнать, сколько времени работала функция — даже если она упала.",
    "sections": [
      {
        "id": "part-1",
        "title": "Зачем здесь finally",
        "paragraphs": [
          "`perf_counter()` — это секундомер. Он не зависит от часов на компьютере, поэтому перевод времени не испортит замер.",
          "`finally` выполняется перед выходом из обёртки всегда: и когда функция вернула результат, и когда упала. Поэтому время печатается в любом случае."
        ],
        "example": "from functools import wraps\nfrom time import perf_counter\n\ndef timed(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        started = perf_counter()\n        try:\n            return func(*args, **kwargs)\n        finally:\n            elapsed = perf_counter() - started\n            print(f\"{func.__name__}: {elapsed:.6f} с\")\n    return wrapper\n\n@timed\ndef total():\n    return sum(range(1000))\n\nprint(total())",
        "steps": [
          "Запомнили время старта.",
          "Вызвали функцию внутри `try`.",
          "В `finally` вычли старт из текущего времени и напечатали разницу."
        ],
        "note": "Программа выведет что-то вроде `total: 0.000012 с`, а затем `499500`. Точное время каждый раз своё."
      },
      {
        "id": "timing-errors",
        "title": "Как не потерять результат и ошибку",
        "paragraphs": [
          "В `finally` пишите только замер. Если поставить туда `return`, он заменит настоящий результат и может «проглотить» ошибку."
        ],
        "mistakes": [
          "Мерить через `time.time()`. Это часы компьютера — их могут перевести. Для замеров берите `perf_counter()`.",
          "Не использовать `finally`. Тогда упавшие вызовы останутся без замера.",
          "Мерить `async`-функцию обычной обёрткой. Она измерит только создание, а не выполнение."
        ]
      }
    ],
    "id": "timer",
    "quick": {
      "summary": "Запоминаем время до вызова, потом после, и вычитаем. Для этого есть `perf_counter()`. Замер «после» ставим в `finally` — так он сработает и при успехе, и при ошибке.",
      "code": "from functools import wraps\nfrom time import perf_counter\n\ndef timed(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        started = perf_counter()\n        try:\n            return func(*args, **kwargs)\n        finally:\n            elapsed = perf_counter() - started\n            print(f\"{func.__name__}: {elapsed:.6f} с\")\n    return wrapper\n\n@timed\ndef total():\n    return sum(range(1000))\n\nprint(total())",
      "takeaway": "Время каждый раз немного разное. Один замер ничего не доказывает — для честного сравнения скорости используйте модуль `timeit`.",
      "analogy": "Как секундомер на забеге: нажали «старт» перед функцией, «стоп» — когда она финишировала или сошла с дистанции. `finally` гарантирует, что «стоп» нажмут в любом случае."
    },
    "inTests": {
      "text": "Можно проверить, что операция укладывается во время: например, страница отвечает быстрее 2 секунд. pytest сам умеет показывать самые медленные тесты: `pytest --durations=5`.",
      "code": "from time import perf_counter\n\ndef test_fast_enough():\n    started = perf_counter()\n    sum(range(100_000))\n    assert perf_counter() - started < 2"
    },
    "level": "Следующий шаг",
    "aliases": [
      "timer"
    ],
    "related": [
      "topics/exceptions",
      "decorators/logging",
      "contexts/contextmanager"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Проверка аргументов",
    "lead": "Проверить аргумент одинаково для `f(5)` и `f(n=5)`.",
    "sections": [
      {
        "id": "part-1",
        "title": "Почему нельзя просто смотреть в args",
        "paragraphs": [
          "`scale(5)` кладёт 5 в `args`, а `scale(n=5)` — в `kwargs`. Если проверять только `args`, второй вариант проскочит без проверки.",
          "`signature(func).bind(...)` раскладывает все аргументы по именам: «`n` = 5». `apply_defaults()` добавляет значения по умолчанию, если их не передали."
        ],
        "example": "from functools import wraps\nfrom inspect import signature\n\ndef positive_n(func):\n    sig = signature(func)\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        bound = sig.bind(*args, **kwargs)\n        bound.apply_defaults()\n        n = bound.arguments[\"n\"]\n        if type(n) not in (int, float) or not n > 0:\n            raise ValueError(\"n должно быть положительным числом\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@positive_n\ndef scale(n, factor=2):\n    return n * factor\n\nprint(scale(n=5))  # 10",
        "output": "10",
        "steps": [
          "Один раз, при декорировании, получаем «описание» параметров функции — `sig`.",
          "При каждом вызове `bind` сопоставляет значения с именами.",
          "Проверяем `bound.arguments[\"n\"]`. Если плохое — выбрасываем ошибку, и функция не запускается."
        ]
      },
      {
        "id": "named-parameter",
        "title": "Когда такой декоратор нужен",
        "paragraphs": [
          "Декоратор полезен, если одно и то же правило нужно нескольким функциям. Для одной функции проще написать обычный `if` внутри неё.",
          "Если у функции нет параметра `n`, этот декоратор ей не подходит."
        ],
        "mistakes": [
          "Вместо ошибки просто печатать сообщение. Тот, кто вызвал функцию, не узнает, что она не сработала.",
          "Проверять `isinstance(n, int)`. `True` и `False` тоже считаются `int`, поэтому здесь используется точная проверка через `type`."
        ]
      }
    ],
    "id": "validation",
    "quick": {
      "summary": "Декоратор проверяет аргумент `n` до вызова функции. Чтобы найти `n` при любом способе передачи, используем `signature(func).bind(...)` — он сопоставляет значения с именами параметров.",
      "code": "from functools import wraps\nfrom inspect import signature\n\ndef positive_n(func):\n    sig = signature(func)\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        bound = sig.bind(*args, **kwargs)\n        bound.apply_defaults()\n        n = bound.arguments[\"n\"]\n        if type(n) not in (int, float) or not n > 0:\n            raise ValueError(\"n должно быть положительным числом\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@positive_n\ndef scale(n, factor=2):\n    return n * factor\n\nprint(scale(n=5))  # 10",
      "takeaway": "Пример проверяет только `n`: это должно быть положительное число (`int` или `float`, но не `True`/`False`). Остальные параметры он не проверяет.",
      "output": "10",
      "analogy": "Как охранник на входе, который проверяет билет. Неважно, показали вы билет в руке или в телефоне (позиционный или именованный аргумент) — охранник найдёт его и проверит. Без билета внутрь не пустят."
    },
    "inTests": {
      "text": "В тестах проверяют, что неверные данные **не проходят**. Для этого используют `pytest.raises` — тест проходит, если функция действительно выбросила ошибку.",
      "code": "import pytest\n\ndef scale(n):\n    if n <= 0:\n        raise ValueError(\"n должно быть положительным\")\n    return n * 2\n\n@pytest.mark.parametrize(\"bad\", [0, -5])\ndef test_scale_rejects_bad_n(bad):\n    with pytest.raises(ValueError):\n        scale(bad)"
    },
    "level": "Следующий шаг",
    "aliases": [
      "validation"
    ],
    "related": [
      "topics/args-kwargs",
      "topics/exceptions",
      "decorators/universal"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Повтор при временной ошибке",
    "lead": "Повторить попытку при временном сбое — но не прятать настоящие ошибки.",
    "sections": [
      {
        "id": "part-1",
        "title": "Как идут попытки",
        "paragraphs": [
          "Чтобы пример работал без интернета, `attempts` заранее задаёт ответы: две неудачи, потом успех.",
          "`except` ловит только `ConnectionError`. Любая другая ошибка — например, `AssertionError` — сразу выйдет наружу без повторов."
        ],
        "example": "from functools import wraps\n\ndef retry(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        for attempt in range(3):\n            try:\n                return func(*args, **kwargs)\n            except ConnectionError:\n                if attempt == 2:\n                    raise\n    return wrapper\n\nattempts = iter([False, False, True])\n\n@retry\ndef fetch():\n    print(\"Попытка\")\n    if not next(attempts):\n        raise ConnectionError(\"Временный сбой\")\n    return \"ok\"\n\nprint(fetch())",
        "output": "Попытка\nПопытка\nПопытка\nok",
        "steps": [
          "Попытка 1 — `ConnectionError`, пробуем ещё.",
          "Попытка 2 — снова ошибка, осталась последняя.",
          "Попытка 3 — успех, `return \"ok\"` завершает цикл."
        ],
        "mistakes": [
          "Ловить `Exception` и повторять любой упавший тест. Так настоящий баг будет «проскакивать».",
          "После последней неудачи ничего не делать. Функция вернёт `None`, и ошибка потеряется. Нужен `raise`."
        ]
      },
      {
        "id": "retry-boundaries",
        "title": "Где повтор опасен",
        "paragraphs": [
          "Повторить чтение данных — безопасно. А повторить «создать заказ» или «списать деньги» — опасно: действие может выполниться дважды.",
          "В реальном проекте между попытками делают паузу и ограничивают общее время. Этот учебный пример показывает только саму идею повтора."
        ]
      }
    ],
    "id": "retry",
    "quick": {
      "summary": "Декоратор пробует вызвать функцию до 3 раз, если она упала с `ConnectionError`. Получилось — сразу возвращает результат. Все 3 попытки неудачны — выпускает ошибку наружу.",
      "code": "from functools import wraps\n\ndef retry(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        for attempt in range(3):\n            try:\n                return func(*args, **kwargs)\n            except ConnectionError:\n                if attempt == 2:\n                    raise\n    return wrapper\n\nattempts = iter([False, False, True])\n\n@retry\ndef fetch():\n    print(\"Попытка\")\n    if not next(attempts):\n        raise ConnectionError(\"Временный сбой\")\n    return \"ok\"\n\nprint(fetch())",
      "takeaway": "Повторяйте только временные ошибки (сеть, таймаут). Ошибку проверки (`AssertionError`) повторять нельзя — так можно скрыть настоящий баг.",
      "output": "Попытка\nПопытка\nПопытка\nok",
      "analogy": "Как дозвониться другу: занято — набираете ещё раз, потом ещё. После третьей неудачи сдаётесь и говорите «не дозвонился», а не делаете вид, что поговорили."
    },
    "inTests": {
      "text": "Повторы используют для нестабильных внешних вещей: сервер не успел подняться, сеть моргнула. Для целых тестов есть плагин `pytest-rerunfailures` (`@pytest.mark.flaky(reruns=2)`), но злоупотреблять им нельзя: «мигающий» тест — это сигнал разобраться, а не повод перезапускать."
    },
    "level": "Следующий шаг",
    "aliases": [
      "повтор",
      "повторить",
      "ошибка соединения",
      "retry"
    ],
    "related": [
      "topics/exceptions",
      "decorators/parameterized",
      "decorators/logging"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  },
  {
    "title": "Декоратор метода",
    "lead": "Повесить декоратор на метод класса.",
    "sections": [
      {
        "id": "part-1",
        "title": "Один шаблон для функций и методов",
        "paragraphs": [
          "Когда вы пишете `client.label(...)`, Python передаёт в обёртку сначала сам объект `client`, а потом остальные аргументы. Обёртка отдаёт всё это настоящему методу."
        ],
        "example": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Метод:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\nclass Client:\n    def __init__(self, name):\n        self.name = name\n\n    @logged\n    def label(self, suffix=\"\"):\n        return self.name + suffix\n\nprint(Client(\"test\").label(suffix=\"-api\"))",
        "output": "Метод: label\ntest-api",
        "mistakes": [
          "Передать `self` ещё раз при вызове `func(self, *args)`, если `self` уже в `args`. Объект попадёт в метод дважды.",
          "Хранить данные конкретного объекта в переменной декоратора. Она общая для всех объектов. Данные объекта храните в `self`."
        ]
      },
      {
        "id": "class-static",
        "title": "Вместе с classmethod и staticmethod",
        "paragraphs": [
          "Ваш декоратор ставьте **ближе к `def`** (ниже), а `@classmethod` или `@staticmethod` — **выше**. Тогда они правильно настроят уже обёрнутую функцию."
        ],
        "example": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\nclass Client:\n    @classmethod\n    @logged\n    def kind(cls):\n        return cls.__name__\n\n    @staticmethod\n    @logged\n    def valid(name):\n        return bool(name)\n\nprint(Client.kind())\nprint(Client.valid(\"test\"))",
        "output": "kind\nClient\nvalid\nTrue"
      }
    ],
    "id": "method",
    "quick": {
      "summary": "Обычная обёртка с `*args, **kwargs` подходит и для методов. Python сам передаст объект (`self`) первым аргументом — он окажется в `args[0]`.",
      "code": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Метод:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\nclass Client:\n    def __init__(self, name):\n        self.name = name\n\n    @logged\n    def label(self, suffix=\"\"):\n        return self.name + suffix\n\nprint(Client(\"test\").label(suffix=\"-api\"))",
      "takeaway": "Не передавайте `self` второй раз: он уже лежит в `args`. Если в обёртке явно написали `wrapper(self, *args, **kwargs)` — вызывайте `func(self, *args, **kwargs)`.",
      "output": "Метод: label\ntest-api",
      "analogy": "Курьеру всё равно, кому посылка — человеку или компании. Он берёт всё, что передали (включая `self`), и доставляет как есть."
    },
    "inTests": {
      "text": "В UI-тестах с Page Object декораторы часто вешают на методы страницы: например, чтобы каждый шаг (`login`, `open_cart`) попадал в отчёт Allure через `@allure.step`.",
      "code": "from functools import wraps\n\ndef step(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"ШАГ:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\nclass LoginPage:\n    @step\n    def login(self, user):\n        return f\"вошли как {user}\"\n\ndef test_login():\n    assert LoginPage().login(\"admin\") == \"вошли как admin\""
    },
    "level": "Следующий шаг",
    "aliases": [
      "method"
    ],
    "related": [
      "classes/self",
      "classes/classmethod",
      "decorators/universal"
    ],
    "source": "https://docs.python.org/3/library/functools.html",
    "sectionAliases": {}
  }
];
