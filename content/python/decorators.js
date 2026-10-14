/* Самодостаточные примеры; output — проверяемый ожидаемый stdout. Сохраняйте id для ссылок. */
window.PythonBase.content.decorators = [
  {
    "title": "Простой декоратор",
    "lead": "Как добавить действие вокруг вызова функции.",
    "sections": [
      {
        "id": "part-1",
        "title": "Функция → обёртка → вызов",
        "paragraphs": [
          "Представьте проверку, перед которой нужно напечатать сообщение. Менять её тело не требуется: обёртка вызывает проверку внутри себя.",
          "Во время определения `check` Python передаёт её в `logged`. Декоратор возвращает `wrapper`, и имя `check` теперь указывает на эту обёртку. Исходная функция остаётся доступна внутри неё как `func`."
        ],
        "example": "def logged(func):\n    def wrapper():\n        print(\"До вызова\")\n        result = func()\n        print(\"После вызова\")\n        return result\n    return wrapper\n\n@logged\ndef check():\n    return \"passed\"\n\nprint(check())",
        "output": "До вызова\nПосле вызова\npassed",
        "steps": [
          "`logged(check)` выполняется при определении функции, а не при каждом вызове.",
          "`check()` запускает wrapper: сообщение → func() → сообщение.",
          "`return result` передаёт результат исходной функции вызывающему коду."
        ],
        "mistakes": [
          "Забыли `return wrapper` — имя check получит None.",
          "Забыли `return result` — проверка выполнится, но её результат потеряется."
        ]
      },
      {
        "id": "without-at",
        "title": "Та же запись без @",
        "paragraphs": [
          "Сначала сохраните исходную функцию, затем замените её обёрткой. `@` — сокращение этой операции, а не отдельный механизм."
        ],
        "example": "def logged(func):\n    def wrapper():\n        print(\"Вызов\")\n        return func()\n    return wrapper\n\ndef check():\n    return \"passed\"\n\noriginal = check\ncheck = logged(check)\nprint(check())\nprint(original())",
        "output": "Вызов\npassed\npassed",
        "note": "Этот минимальный вариант подходит только для функций без аргументов. Для рабочего шаблона откройте «Аргументы, return и wraps»."
      }
    ],
    "id": "simple",
    "quick": {
      "summary": "Декоратор получает функцию и возвращает то, что займёт её место. В этом примере — функцию-обёртку. `@logged` означает `check = logged(check)`.",
      "code": "def logged(func):\n    def wrapper():\n        print(\"До вызова\")\n        result = func()\n        print(\"После вызова\")\n        return result\n    return wrapper\n\n@logged\ndef check():\n    return \"passed\"\n\nprint(check())",
      "takeaway": "`return wrapper` отдаёт функцию для будущего вызова. `return wrapper()` вызовет её сразу и вернёт уже результат.",
      "output": "До вызова\nПосле вызова\npassed"
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
    "lead": "Рабочий шаблон для обычной синхронной функции.",
    "sections": [
      {
        "id": "part-1",
        "title": "Что сохраняет обёртка",
        "paragraphs": [
          "В wrapper позиционные аргументы собраны в кортеж args, именованные — в словарь kwargs. В вызове func звёздочки распаковывают их обратно.",
          "`wraps` не вызывает func и не пересылает аргументы. Он переносит метаданные: без него `total.__name__` был бы wrapper, а документация исходной функции потерялась бы."
        ],
        "example": "from functools import wraps\n\ndef traced(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Вызов:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@traced\ndef total(price, quantity=1):\n    \"\"\"Стоимость заказа.\"\"\"\n    return price * quantity\n\nprint(total(100, quantity=2))\nprint(total.__name__)",
        "output": "Вызов: total\n200\ntotal",
        "steps": [
          "В `total(100, quantity=2)` получаем args = (100,) и kwargs = {\"quantity\": 2}.",
          "`func(*args, **kwargs)` делает исходный вызов с теми же значениями.",
          "`return` отдаёт 200, `wraps` сохраняет имя total."
        ]
      },
      {
        "id": "limitations",
        "title": "Что шаблон не делает",
        "paragraphs": [
          "Он не перехватывает исключения: если исходная функция выбросила ошибку, она пойдёт к вызывающему коду. Это нормальное поведение."
        ],
        "mistakes": [
          "Не пишите `func(args, kwargs)`: это два новых аргумента вместо исходного набора.",
          "Не добавляйте голый except ради «надёжности»: он скроет причину ошибки.",
          "Генератор и корутина начинают работу позже: обычный wrapper не оборачивает всё их выполнение."
        ]
      }
    ],
    "id": "universal",
    "quick": {
      "summary": "`*args` и `**kwargs` передают аргументы, `return` сохраняет результат, `@wraps(func)` — имя, документацию и ссылку на исходную функцию.",
      "code": "from functools import wraps\n\ndef traced(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Вызов:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@traced\ndef total(price, quantity=1):\n    \"\"\"Стоимость заказа.\"\"\"\n    return price * quantity\n\nprint(total(100, quantity=2))\nprint(total.__name__)",
      "takeaway": "Шаблон для `def`. Для `async def` нужна обёртка `async def` с `await`; иначе измеряться или логироваться будет создание корутины, а не её выполнение.",
      "output": "Вызов: total\n200\ntotal"
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
    "lead": "Три уровня функций без путаницы.",
    "sections": [
      {
        "id": "part-1",
        "title": "Кто какие аргументы получает",
        "paragraphs": [
          "Внешняя функция tagged — фабрика декораторов. Она нужна только потому, что мы хотим настроить поведение заранее.",
          "decorator получает исходную функцию и создаёт wrapper. Обёртка помнит label и func благодаря замыканию."
        ],
        "example": "from functools import wraps\n\ndef tagged(label):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            print(label, func.__name__)\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@tagged(\"SMOKE\")\ndef check_login():\n    return \"passed\"\n\nprint(check_login())",
        "output": "SMOKE check_login\npassed",
        "steps": [
          "При определении: tagged(\"SMOKE\") возвращает decorator.",
          "Затем decorator(check_login) возвращает wrapper.",
          "При каждом check_login(): wrapper печатает метку и вызывает исходную функцию."
        ],
        "mistakes": [
          "`@tagged` без скобок передаст функцию в label. Для этой фабрики нужен вызов с меткой.",
          "`return decorator` и `return wrapper` относятся к разным уровням. Проверяйте отступы."
        ]
      },
      {
        "id": "stacking",
        "title": "Несколько декораторов: порядок важен",
        "paragraphs": [
          "Декораторы применяются снизу вверх. Вызов начинается с внешней обёртки — той, чей @ записан выше."
        ],
        "example": "from functools import wraps\n\ndef tagged(label):\n    def decorator(func):\n        @wraps(func)\n        def wrapper():\n            print(label, \"до\")\n            result = func()\n            print(label, \"после\")\n            return result\n        return wrapper\n    return decorator\n\n@tagged(\"A\")\n@tagged(\"B\")\ndef check():\n    print(\"проверка\")\n\ncheck()",
        "output": "A до\nB до\nпроверка\nB после\nA после",
        "note": "Здесь check = tagged(\"A\")(tagged(\"B\")(check)). Порядок особенно важен при сочетании логирования, retry и кэша."
      }
    ],
    "id": "parameterized",
    "quick": {
      "summary": "`tagged(\"SMOKE\")` запоминает настройку и возвращает декоратор. Декоратор получает функцию. Обёртка получает аргументы её будущих вызовов.",
      "code": "from functools import wraps\n\ndef tagged(label):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            print(label, func.__name__)\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@tagged(\"SMOKE\")\ndef check_login():\n    return \"passed\"\n\nprint(check_login())",
      "takeaway": "Запись `@tagged(\"SMOKE\")` равна `check_login = tagged(\"SMOKE\")(check_login)`. Настройки декоратора и аргументы функции передаются в разные моменты.",
      "output": "SMOKE check_login\npassed"
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
    "lead": "Как помнить данные между вызовами.",
    "sections": [
      {
        "id": "part-1",
        "title": "Почему счётчик не сбрасывается",
        "paragraphs": [
          "counted вызывается один раз при декорировании. wrapper вызывается много раз и обращается к одной внешней переменной calls."
        ],
        "example": "from functools import wraps\n\ndef counted(func):\n    calls = 0\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        nonlocal calls\n        calls += 1\n        print(\"Вызов\", calls)\n        return func(*args, **kwargs)\n    return wrapper\n\n@counted\ndef check():\n    return \"passed\"\n\nprint(check())\nprint(check())",
        "output": "Вызов 1\npassed\nВызов 2\npassed",
        "steps": [
          "calls = 0 выполняется при создании обёртки.",
          "nonlocal связывает присваивание с именем из counted.",
          "Каждый вызов увеличивает сохранённое число."
        ],
        "mistakes": [
          "calls = 0 внутри wrapper будет сбрасывать счётчик при каждом вызове.",
          "Без nonlocal операция calls += 1 попытается читать ещё не заданную локальную переменную и даст UnboundLocalError."
        ]
      },
      {
        "id": "scope",
        "title": "Границы такого состояния",
        "paragraphs": [
          "Каждое применение counted создаёт своё замыкание: две разные декорированные функции получат независимые счётчики.",
          "Пример считает начатые вызовы, включая неудачные. Если нужны только успешные, увеличивайте счётчик после func. Для параллельных потоков простого счётчика недостаточно: нужна синхронизация."
        ]
      }
    ],
    "id": "stateful",
    "quick": {
      "summary": "Создайте счётчик рядом с wrapper. Замыкание сохранит его между вызовами; `nonlocal` разрешит менять это имя из обёртки.",
      "code": "from functools import wraps\n\ndef counted(func):\n    calls = 0\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        nonlocal calls\n        calls += 1\n        print(\"Вызов\", calls)\n        return func(*args, **kwargs)\n    return wrapper\n\n@counted\ndef check():\n    return \"passed\"\n\nprint(check())\nprint(check())",
      "takeaway": "Счётчик относится к одной декорированной функции. У декорированного метода он будет общим для всех экземпляров, а не отдельным для каждого объекта.",
      "output": "Вызов 1\npassed\nВызов 2\npassed"
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
    "lead": "Не вычислять повторно то, что уже известно.",
    "sections": [
      {
        "id": "part-1",
        "title": "Готовый кэш вместо самодельного словаря",
        "paragraphs": [
          "Для повседневного кода используйте functools.lru_cache. Здесь print показывает, когда тело действительно работает: во втором вызове его уже нет.",
          "maxsize ограничивает число записей; при заполнении вытесняются давно не использованные. cache_info() показывает попадания и промахи."
        ],
        "example": "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef normalize(name):\n    print(\"Вычисление\")\n    return name.strip().lower()\n\nprint(normalize(\" Admin \"))\nprint(normalize(\" Admin \"))\nprint(normalize.cache_info().hits)\nnormalize.cache_clear()",
        "output": "Вычисление\nadmin\nadmin\n1",
        "mistakes": [
          "Список или словарь в аргументах вызовет TypeError: unhashable type.",
          "Разные способы передачи аргументов могут образовать разные записи: f(1) и f(x=1).",
          "При изменении внешних данных кэш сам не очистится."
        ]
      },
      {
        "id": "mutable-result",
        "title": "Почему нельзя менять общий результат",
        "paragraphs": [
          "Кэш хранит возвращённый объект, а не его свежую копию. Изменение списка в одном месте станет видно следующему вызову."
        ],
        "example": "from functools import lru_cache\n\n@lru_cache(maxsize=2)\ndef labels():\n    return [\"smoke\"]\n\nfirst = labels()\nfirst.append(\"changed\")\nprint(labels())\nprint(first is labels())",
        "output": "['smoke', 'changed']\nTrue",
        "note": "Если результат надо менять, верните неизменяемую структуру или создайте копию перед изменением. Не кэшируйте async-функции этим декоратором."
      }
    ],
    "id": "cache",
    "quick": {
      "summary": "`@lru_cache(maxsize=128)` сохраняет результаты по аргументам. Повторный такой же вызов берёт готовый результат; `cache_clear()` очищает кэш.",
      "code": "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef normalize(name):\n    print(\"Вычисление\")\n    return name.strip().lower()\n\nprint(normalize(\" Admin \"))\nprint(normalize(\" Admin \"))\nprint(normalize.cache_info().hits)\nnormalize.cache_clear()",
      "takeaway": "Аргументы должны быть хешируемыми. Не кэшируйте проверку текущего состояния сервера: сохранённый ответ может устареть. Возвращаемый изменяемый объект тоже будет общим.",
      "output": "Вычисление\nadmin\nadmin\n1"
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
    "lead": "Видеть начало, успешное завершение и причину ошибки.",
    "sections": [
      {
        "id": "part-1",
        "title": "Что означает каждое сообщение",
        "paragraphs": [
          "В учебном примере print показывает последовательность. Если check_status выбросит исключение, строка «Успех» не выполнится: ошибка выйдет наружу."
        ],
        "example": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Начало:\", func.__name__)\n        result = func(*args, **kwargs)\n        print(\"Успех:\", func.__name__)\n        return result\n    return wrapper\n\n@logged\ndef check_status(status):\n    return status == 200\n\nprint(check_status(200))",
        "output": "Начало: check_status\nУспех: check_status\nTrue"
      },
      {
        "id": "logging-module",
        "title": "Вариант с logging и сохранением ошибки",
        "paragraphs": [
          "logger.exception добавляет traceback. После записи используйте raise без аргументов, чтобы передать то же исключение дальше."
        ],
        "example": "import logging\nimport sys\nfrom functools import wraps\n\nlogging.basicConfig(level=logging.INFO, format=\"%(message)s\", stream=sys.stdout)\nlogger = logging.getLogger(__name__)\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        logger.info(\"Начало: %s\", func.__name__)\n        try:\n            result = func(*args, **kwargs)\n        except Exception:\n            logger.exception(\"Ошибка: %s\", func.__name__)\n            raise\n        logger.info(\"Успех: %s\", func.__name__)\n        return result\n    return wrapper\n\n@logged\ndef check():\n    return \"passed\"\n\nprint(check())",
        "output": "Начало: check\nУспех: check\npassed",
        "note": "Здесь широкий except допустим только для записи ошибки с немедленным raise. Настройку logging в приложении выполняют один раз в точке входа."
      }
    ],
    "id": "logging",
    "quick": {
      "summary": "Добавьте сообщения до и после вызова. Сообщение «успех» ставьте после func; результат обязательно верните.",
      "code": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Начало:\", func.__name__)\n        result = func(*args, **kwargs)\n        print(\"Успех:\", func.__name__)\n        return result\n    return wrapper\n\n@logged\ndef check_status(status):\n    return status == 200\n\nprint(check_status(200))",
      "takeaway": "Для проекта используйте модуль logging. Не записывайте все args и kwargs без разбора: среди них могут быть пароли, токены и персональные данные.",
      "output": "Начало: check_status\nУспех: check_status\nTrue"
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
    "lead": "Измерять весь вызов, включая неудачный.",
    "sections": [
      {
        "id": "part-1",
        "title": "Почему finally находится вокруг вызова",
        "paragraphs": [
          "perf_counter подходит для длительности: счётчик монотонный, поэтому перевод часов не испортит замер.",
          "Сначала вычисляется результат func. Перед выходом из wrapper выполняется finally. Успешный результат или исходное исключение затем передаётся вызывающему коду."
        ],
        "example": "from functools import wraps\nfrom time import perf_counter\n\ndef timed(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        started = perf_counter()\n        try:\n            return func(*args, **kwargs)\n        finally:\n            elapsed = perf_counter() - started\n            print(f\"{func.__name__}: {elapsed:.6f} с\")\n    return wrapper\n\n@timed\ndef total():\n    return sum(range(1000))\n\nprint(total())",
        "steps": [
          "Сохранить начальный отсчёт.",
          "Вызвать исходную функцию внутри try.",
          "В finally вычесть начальный отсчёт и вывести длительность."
        ],
        "note": "Вывод: total: <измеренное время> с, затем 499500. Точное время заранее неизвестно."
      },
      {
        "id": "timing-errors",
        "title": "Не потерять результат и ошибку",
        "paragraphs": [
          "В finally оставьте только завершающее действие. `return` из finally заменит результат try и может подавить исключение."
        ],
        "mistakes": [
          "time.time измеряет системное время, которое может быть скорректировано; для интервала берите perf_counter.",
          "Без finally неудачные вызовы останутся без замера.",
          "Обычная синхронная обёртка не измеряет выполнение async-функции: для этого нужен await."
        ]
      }
    ],
    "id": "timer",
    "quick": {
      "summary": "Используйте разность двух `perf_counter()`. Замер конца в `finally` выполнится и при return, и при исключении.",
      "code": "from functools import wraps\nfrom time import perf_counter\n\ndef timed(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        started = perf_counter()\n        try:\n            return func(*args, **kwargs)\n        finally:\n            elapsed = perf_counter() - started\n            print(f\"{func.__name__}: {elapsed:.6f} с\")\n    return wrapper\n\n@timed\ndef total():\n    return sum(range(1000))\n\nprint(total())",
      "takeaway": "Число секунд меняется от запуска к запуску. Один замер не доказывает производительность; для сравнения небольших фрагментов используйте timeit."
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
    "lead": "Одинаковая проверка для f(5) и f(n=5).",
    "sections": [
      {
        "id": "part-1",
        "title": "Почему недостаточно пройтись по args",
        "paragraphs": [
          "Вызов scale(5) кладёт 5 в args, а scale(n=5) — в kwargs. Перебор только args пропустит второй вариант.",
          "inspect.signature(func).bind(...) собирает оба вида аргументов в соответствие «параметр → значение». apply_defaults добавляет пропущенные значения по умолчанию."
        ],
        "example": "from functools import wraps\nfrom inspect import signature\n\ndef positive_n(func):\n    sig = signature(func)\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        bound = sig.bind(*args, **kwargs)\n        bound.apply_defaults()\n        n = bound.arguments[\"n\"]\n        if type(n) not in (int, float) or not n > 0:\n            raise ValueError(\"n должно быть положительным числом\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@positive_n\ndef scale(n, factor=2):\n    return n * factor\n\nprint(scale(n=5))  # 10",
        "output": "10",
        "steps": [
          "Получаем сигнатуру один раз при декорировании.",
          "На каждом вызове bind проверяет форму вызова и сопоставляет аргументы именам.",
          "Проверяем bound.arguments[\"n\"]. При ошибке func не вызывается."
        ]
      },
      {
        "id": "named-parameter",
        "title": "Когда декоратор уместен",
        "paragraphs": [
          "Декоратор имеет смысл, если одинаковое правило повторяется у нескольких функций с параметром n. Для единственной функции понятнее обычный if в её теле.",
          "Если функция не имеет параметра n, этот декоратор к ней неприменим. Если неправильно передали аргументы, bind выбросит TypeError до запуска тела."
        ],
        "mistakes": [
          "Не подменяйте исключение печатью сообщения: вызывающий код должен знать, что операция не состоялась.",
          "bool — подкласс int. Здесь точная проверка type исключает True и False намеренно."
        ]
      }
    ],
    "id": "validation",
    "quick": {
      "summary": "Свяжите args и kwargs с сигнатурой, затем проверьте нужный параметр по имени. Так именованный вызов не обойдёт проверку.",
      "code": "from functools import wraps\nfrom inspect import signature\n\ndef positive_n(func):\n    sig = signature(func)\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        bound = sig.bind(*args, **kwargs)\n        bound.apply_defaults()\n        n = bound.arguments[\"n\"]\n        if type(n) not in (int, float) or not n > 0:\n            raise ValueError(\"n должно быть положительным числом\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@positive_n\ndef scale(n, factor=2):\n    return n * factor\n\nprint(scale(n=5))  # 10",
      "takeaway": "Этот пример проверяет параметр n: положительный int или float, но не bool. Он не заменяет валидацию остальных параметров функции.",
      "output": "10"
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
    "lead": "Ограниченные попытки без скрытых падений тестов.",
    "sections": [
      {
        "id": "part-1",
        "title": "Порядок попыток",
        "paragraphs": [
          "Пример воспроизводит два временных сбоя и успех без сети и ожидания. Iterator attempts задаёт ответы, чтобы порядок был виден при каждом запуске.",
          "except ловит только ConnectionError. AssertionError, TypeError и другие ошибки не повторяются: они сразу выйдут наружу."
        ],
        "example": "from functools import wraps\n\ndef retry(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        for attempt in range(3):\n            try:\n                return func(*args, **kwargs)\n            except ConnectionError:\n                if attempt == 2:\n                    raise\n    return wrapper\n\nattempts = iter([False, False, True])\n\n@retry\ndef fetch():\n    print(\"Попытка\")\n    if not next(attempts):\n        raise ConnectionError(\"Временный сбой\")\n    return \"ok\"\n\nprint(fetch())",
        "output": "Попытка\nПопытка\nПопытка\nok",
        "steps": [
          "Первая попытка — ConnectionError, идём дальше.",
          "Вторая — та же ошибка, остаётся последняя попытка.",
          "Третья успешна: return \"ok\" прекращает цикл."
        ],
        "mistakes": [
          "Не ловите Exception для повторного запуска любого падающего теста: так можно скрыть дефект.",
          "После последней ошибки не возвращайте None — используйте raise."
        ]
      },
      {
        "id": "retry-boundaries",
        "title": "Где повтор опасен",
        "paragraphs": [
          "Повтор чтения часто допустим, а повтор создания заказа или списания денег может выполнить действие дважды. Проверяйте поведение операции и используйте механизм идемпотентности, если он предусмотрен.",
          "Для реального клиента нужны ограничение числа попыток, тайм-аут самой операции и пауза между попытками. Этот учебный декоратор показывает только управление вызовами."
        ]
      }
    ],
    "id": "retry",
    "quick": {
      "summary": "Повторяйте только ожидаемое исключение. Успех сразу возвращает результат; последняя неудача должна выйти наружу.",
      "code": "from functools import wraps\n\ndef retry(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        for attempt in range(3):\n            try:\n                return func(*args, **kwargs)\n            except ConnectionError:\n                if attempt == 2:\n                    raise\n    return wrapper\n\nattempts = iter([False, False, True])\n\n@retry\ndef fetch():\n    print(\"Попытка\")\n    if not next(attempts):\n        raise ConnectionError(\"Временный сбой\")\n    return \"ok\"\n\nprint(fetch())",
      "takeaway": "Это 3 попытки всего, а не 3 повтора после первой. Для сети добавьте паузу и используйте конкретный тип исключения вашей библиотеки. Повтор операции должен быть безопасен.",
      "output": "Попытка\nПопытка\nПопытка\nok"
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
    "lead": "Как объект self попадает в обёртку.",
    "sections": [
      {
        "id": "part-1",
        "title": "Один шаблон для функции и метода",
        "paragraphs": [
          "При вызове client.label(...) Python связывает wrapper с client. Обёртка получает self вместе с остальными аргументами и передаёт всё исходному методу."
        ],
        "example": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Метод:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\nclass Client:\n    def __init__(self, name):\n        self.name = name\n\n    @logged\n    def label(self, suffix=\"\"):\n        return self.name + suffix\n\nprint(Client(\"test\").label(suffix=\"-api\"))",
        "output": "Метод: label\ntest-api",
        "mistakes": [
          "Не передавайте self ещё раз, если уже распаковываете полный args: экземпляр продублируется.",
          "Состояние в замыкании декоратора метода общее для экземпляров. Состояние конкретного объекта храните в self."
        ]
      },
      {
        "id": "class-static",
        "title": "Порядок с classmethod и staticmethod",
        "paragraphs": [
          "Обычный декоратор функции разместите ближе к def. Снаружи classmethod или staticmethod настроит способ вызова уже обёрнутой функции."
        ],
        "example": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\nclass Client:\n    @classmethod\n    @logged\n    def kind(cls):\n        return cls.__name__\n\n    @staticmethod\n    @logged\n    def valid(name):\n        return bool(name)\n\nprint(Client.kind())\nprint(Client.valid(\"test\"))",
        "output": "kind\nClient\nvalid\nTrue"
      }
    ],
    "id": "method",
    "quick": {
      "summary": "Обычный wrapper с `*args, **kwargs` подходит и методу экземпляра: Python передаст объект первым аргументом.",
      "code": "from functools import wraps\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"Метод:\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\nclass Client:\n    def __init__(self, name):\n        self.name = name\n\n    @logged\n    def label(self, suffix=\"\"):\n        return self.name + suffix\n\nprint(Client(\"test\").label(suffix=\"-api\"))",
      "takeaway": "В этом wrapper `args[0]` — экземпляр Client. Если явно написали wrapper(self, *args, **kwargs), вызовите func(self, *args, **kwargs).",
      "output": "Метод: label\ntest-api"
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
