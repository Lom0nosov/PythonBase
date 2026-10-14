/* Самодостаточные примеры; output — проверяемый ожидаемый stdout. Сохраняйте id для ссылок. */
window.PythonBase.content.contexts = [
  {
    "title": "Как работает with",
    "lead": "Получить ресурс, поработать, освободить.",
    "sections": [
      {
        "id": "part-1",
        "title": "Что происходит до и после тела",
        "paragraphs": [
          "StringIO — текстовый буфер в памяти с интерфейсом файла. Его удобно использовать в примере, чтобы не создавать файл на диске.",
          "Вход возвращает буфер в report. Выход закрывает его. Переменная report после блока остаётся, но ресурс уже закрыт."
        ],
        "example": "from io import StringIO\n\nwith StringIO(\"passed\") as report:\n    print(report.read())\n    print(report.closed)\n\nprint(report.closed)",
        "output": "passed\nFalse\nTrue",
        "steps": [
          "Создать StringIO и вызвать __enter__.",
          "Записать результат входа в report и выполнить тело.",
          "Вызвать __exit__ и перейти к коду после блока."
        ]
      },
      {
        "id": "choose",
        "title": "Когда нужен with",
        "paragraphs": [
          "Берите with для операций с парным завершением: открыть/закрыть, захватить/освободить, временно изменить/восстановить.",
          "Менеджер не обязательно подавляет ошибки. Файловый менеджер закрывает файл и передаёт исключение дальше. Если __enter__ сам упал, его __exit__ не вызывается."
        ],
        "mistakes": [
          "Отступ определяет время жизни ресурса. Не читайте файл после выхода из with.",
          "with не превращает произвольный объект в менеджер: нужен протокол входа и выхода."
        ]
      }
    ],
    "id": "with",
    "quick": {
      "summary": "`with` вызывает вход контекстного менеджера, выполняет тело и вызывает выход. `as` получает результат входа, а не обязательно сам менеджер.",
      "code": "from io import StringIO\n\nwith StringIO(\"passed\") as report:\n    print(report.read())\n    print(report.closed)\n\nprint(report.closed)",
      "takeaway": "Выход вызывается после успешного __enter__, включая ошибку в теле. Что именно делает выход — закрывает файл, снимает блокировку или другое — определяет менеджер.",
      "output": "passed\nFalse\nTrue"
    },
    "level": "Следующий шаг",
    "aliases": [
      "with"
    ],
    "related": [
      "contexts/files",
      "contexts/manager-class",
      "contexts/exceptions"
    ],
    "source": "https://docs.python.org/3/library/contextlib.html",
    "sectionAliases": {}
  },
  {
    "title": "Файлы: чтение и запись",
    "lead": "Выбрать режим и закрыть файл даже при ошибке.",
    "sections": [
      {
        "id": "part-1",
        "title": "Записать и прочитать текст",
        "paragraphs": [
          "open открывает файл ещё до входа в with. Если путь неверен или нет доступа, ошибка возникает при открытии.",
          "Первый with закрывает запись перед вторым открытием на чтение. Внешний TemporaryDirectory удаляет временную папку после примера."
        ],
        "example": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\n\nwith TemporaryDirectory() as folder:\n    path = Path(folder) / \"report.txt\"\n    with open(path, \"w\", encoding=\"utf-8\") as file:\n        file.write(\"passed\\n\")\n    with open(path, \"r\", encoding=\"utf-8\") as file:\n        print(file.read().strip())",
        "output": "passed",
        "mistakes": [
          "Для текста явно задавайте encoding. Для байтов нужны rb/wb без encoding.",
          "write возвращает число записанных символов; это не содержимое файла.",
          "read читает с текущей позиции. Повторный read после конца вернёт пустую строку."
        ]
      },
      {
        "id": "cursor",
        "title": "Позиция чтения и seek",
        "paragraphs": [
          "Поток помнит текущую позицию. seek(0) возвращает её в начало, если поток поддерживает перемещение."
        ],
        "example": "from io import StringIO\n\nwith StringIO(\"alpha\\nbeta\\n\") as file:\n    print(file.readline().strip())\n    print(file.read().strip())\n    print(repr(file.read()))\n    file.seek(0)\n    print(file.readline().strip())",
        "output": "alpha\nbeta\n''\nalpha",
        "note": "Большой файл обычно обходят построчно: for line in file. Не обязательно загружать его целиком через read()."
      }
    ],
    "id": "files",
    "quick": {
      "summary": "`open(path, \"r\", encoding=\"utf-8\")` читает текст. Режим `w` создаёт или очищает файл, `a` дописывает в конец. Закрытие поручите with.",
      "code": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\n\nwith TemporaryDirectory() as folder:\n    path = Path(folder) / \"report.txt\"\n    with open(path, \"w\", encoding=\"utf-8\") as file:\n        file.write(\"passed\\n\")\n    with open(path, \"r\", encoding=\"utf-8\") as file:\n        print(file.read().strip())",
      "takeaway": "В примере временная папка нужна для безопасного запуска. В работе замените path своим путём. Не используйте w для чтения: существующее содержимое будет стёрто.",
      "output": "passed"
    },
    "level": "Следующий шаг",
    "aliases": [
      "files"
    ],
    "related": [
      "contexts/with",
      "topics/strings",
      "contexts/multiple"
    ],
    "source": "https://docs.python.org/3/library/contextlib.html",
    "sectionAliases": {}
  },
  {
    "title": "Свой менеджер: класс",
    "lead": "Роли __enter__ и __exit__ на одном примере.",
    "sections": [
      {
        "id": "part-1",
        "title": "Два метода протокола",
        "paragraphs": [
          "__init__ хранит настройки, __enter__ выполняет вход, __exit__ — завершение. Экземпляр создаётся до входа в with.",
          "Возвращаемое значение __enter__ может быть самим менеджером, отдельным ресурсом или None. В этом примере это строка."
        ],
        "example": "class Resource:\n    def __enter__(self):\n        print(\"Вход\")\n        return \"ресурс\"\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"Выход\")\n        return False\n\nwith Resource() as value:\n    print(value)",
        "output": "Вход\nресурс\nВыход",
        "steps": [
          "Resource() создаёт менеджер.",
          "__enter__ возвращает строку: value = \"ресурс\".",
          "После print вызывается __exit__(None, None, None)."
        ]
      },
      {
        "id": "exit-arguments",
        "title": "Аргументы при ошибке",
        "paragraphs": [
          "Ошибка из тела передаётся в __exit__. После освобождения ресурса она продолжает распространяться, если метод вернул False или None."
        ],
        "example": "class Resource:\n    def __enter__(self):\n        return self\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"Тип:\", exc_type.__name__ if exc_type else \"нет\")\n        return False\n\ntry:\n    with Resource():\n        raise ValueError(\"неверные данные\")\nexcept ValueError as error:\n    print(error)",
        "output": "Тип: ValueError\nневерные данные"
      }
    ],
    "id": "manager-class",
    "quick": {
      "summary": "`__enter__` подготавливает ресурс и возвращает значение для as. `__exit__` освобождает ресурс; False или None оставляет ошибку видимой.",
      "code": "class Resource:\n    def __enter__(self):\n        print(\"Вход\")\n        return \"ресурс\"\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"Выход\")\n        return False\n\nwith Resource() as value:\n    print(value)",
      "takeaway": "Аргументы __exit__: тип ошибки, объект ошибки, traceback. При успешном теле все три равны None. Возвращайте True только для намеренного подавления ошибки.",
      "output": "Вход\nресурс\nВыход"
    },
    "level": "Следующий шаг",
    "aliases": [
      "manager-class"
    ],
    "related": [
      "contexts/with",
      "contexts/resource",
      "contexts/exceptions"
    ],
    "source": "https://docs.python.org/3/library/contextlib.html",
    "sectionAliases": {}
  },
  {
    "title": "Временное изменение и восстановление",
    "lead": "Практический менеджер для настройки на время блока.",
    "sections": [
      {
        "id": "part-1",
        "title": "Сохранить → изменить → восстановить",
        "paragraphs": [
          "Контекстный менеджер не обязан открывать файл. Здесь ресурс — временное состояние словаря: внутри блока timeout равен 1, снаружи снова 10.",
          "__init__ только запоминает аргументы. Реальное изменение происходит на входе, восстановление — на выходе, в том числе после исключения."
        ],
        "example": "class TemporaryValue:\n    def __init__(self, settings, key, value):\n        self.settings, self.key, self.value = settings, key, value\n\n    def __enter__(self):\n        self.previous = self.settings[self.key]\n        self.settings[self.key] = self.value\n        return self.settings\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        self.settings[self.key] = self.previous\n        return False\n\nsettings = {\"timeout\": 10}\nwith TemporaryValue(settings, \"timeout\", 1):\n    print(settings[\"timeout\"])\nprint(settings[\"timeout\"])",
        "output": "1\n10",
        "steps": [
          "Сначала читаем существующее значение: ошибка ключа произойдёт до изменения словаря.",
          "Заменяем значение и выполняем тело.",
          "В __exit__ восстанавливаем previous, не подавляя исключение."
        ]
      },
      {
        "id": "partial-entry",
        "title": "Если вход завершился не полностью",
        "paragraphs": [
          "Если __enter__ успел получить первый ресурс, но не смог получить второй, его __exit__ вызван не будет. Частично выполненный вход нужно откатить внутри самого __enter__.",
          "Для нескольких ресурсов обычно проще вложенные with или contextlib.ExitStack: они уже отслеживают успешно открытые контексты."
        ]
      }
    ],
    "id": "resource",
    "quick": {
      "summary": "Сохраните прежнее значение на входе, примените временное и восстановите прежнее на выходе. Это пригодится для локальных настроек проверки.",
      "code": "class TemporaryValue:\n    def __init__(self, settings, key, value):\n        self.settings, self.key, self.value = settings, key, value\n\n    def __enter__(self):\n        self.previous = self.settings[self.key]\n        self.settings[self.key] = self.value\n        return self.settings\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        self.settings[self.key] = self.previous\n        return False\n\nsettings = {\"timeout\": 10}\nwith TemporaryValue(settings, \"timeout\", 1):\n    print(settings[\"timeout\"])\nprint(settings[\"timeout\"])",
      "takeaway": "Пример требует существующий ключ словаря. Не используйте один экземпляр менеджера во вложенных with: он хранит только одно прежнее значение. Общие настройки нельзя так менять параллельно.",
      "output": "1\n10"
    },
    "level": "Следующий шаг",
    "aliases": [
      "resource"
    ],
    "related": [
      "contexts/manager-class",
      "contexts/multiple",
      "contexts/contextmanager"
    ],
    "source": "https://docs.python.org/3/library/contextlib.html",
    "sectionAliases": {}
  },
  {
    "title": "Ошибки внутри with",
    "lead": "Уборка не означает подавление ошибки.",
    "sections": [
      {
        "id": "part-1",
        "title": "Закрыть ресурс и передать ошибку",
        "paragraphs": [
          "StringIO закрывается, хотя тело не завершилось успешно. Внешний except обрабатывает ValueError уже после выхода из контекста."
        ],
        "example": "from io import StringIO\n\nreport = StringIO()\ntry:\n    with report:\n        report.write(\"started\")\n        raise ValueError(\"Проверка не прошла\")\nexcept ValueError as error:\n    print(error)\n\nprint(\"Закрыт:\", report.closed)",
        "output": "Проверка не прошла\nЗакрыт: True"
      },
      {
        "id": "suppress",
        "title": "Когда подавление уместно",
        "paragraphs": [
          "contextlib.suppress подходит для конкретной ожидаемой ошибки, которую действительно можно проигнорировать. Ограничивайте им маленький блок."
        ],
        "example": "from contextlib import suppress\n\nvalues = {\"temporary\": 1}\nwith suppress(KeyError):\n    del values[\"missing\"]\n    print(\"Эта строка не выполнится\")\n\nprint(\"Продолжаем\")",
        "output": "Продолжаем",
        "mistakes": [
          "Не используйте suppress(Exception) вокруг теста: пропадёт информация о падении.",
          "Если сам __exit__ выбросил новую ошибку, наружу выйдет она; исходная останется в цепочке исключений."
        ]
      },
      {
        "id": "entry-failure",
        "title": "Ошибка на входе — отдельный случай",
        "paragraphs": [
          "Если __enter__ не завершился, тело и __exit__ этого менеджера не выполняются. Поэтому уборку частично полученного ресурса нельзя отложить только на __exit__."
        ],
        "example": "class Broken:\n    def __enter__(self):\n        print(\"Начало входа\")\n        raise RuntimeError(\"Не удалось открыть ресурс\")\n\n    def __exit__(self, *args):\n        print(\"Выход\")\n\ntry:\n    with Broken():\n        print(\"Тело\")\nexcept RuntimeError as error:\n    print(error)",
        "output": "Начало входа\nНе удалось открыть ресурс"
      }
    ],
    "id": "exceptions",
    "quick": {
      "summary": "При ошибке в теле сначала выполняется выход менеджера. Если он не подавил исключение, оно попадёт во внешний except.",
      "code": "from io import StringIO\n\nreport = StringIO()\ntry:\n    with report:\n        report.write(\"started\")\n        raise ValueError(\"Проверка не прошла\")\nexcept ValueError as error:\n    print(error)\n\nprint(\"Закрыт:\", report.closed)",
      "takeaway": "Ложный результат __exit__ сохраняет ошибку. Истинный подавляет её: выполнение продолжится после with, но не с прерванной строки внутри блока.",
      "output": "Проверка не прошла\nЗакрыт: True"
    },
    "level": "Следующий шаг",
    "aliases": [
      "ошибка",
      "error",
      "traceback",
      "exceptions"
    ],
    "related": [
      "contexts/manager-class",
      "topics/exceptions",
      "contexts/contextmanager"
    ],
    "source": "https://docs.python.org/3/library/contextlib.html",
    "sectionAliases": {}
  },
  {
    "title": "Несколько контекстов",
    "lead": "Вход слева направо, выход в обратном порядке.",
    "sections": [
      {
        "id": "part-1",
        "title": "Почему выход идёт в обратном порядке",
        "paragraphs": [
          "Второй контекст находится внутри первого. Поэтому сначала завершается внутренний ресурс, потом внешний. В примере contextmanager создаёт маленький менеджер для наблюдения за порядком."
        ],
        "example": "from contextlib import contextmanager\n\n@contextmanager\ndef resource(name):\n    print(\"Вход\", name)\n    try:\n        yield name\n    finally:\n        print(\"Выход\", name)\n\nwith resource(\"A\") as a, resource(\"B\") as b:\n    print(\"Тело\", a, b)",
        "output": "Вход A\nВход B\nТело A B\nВыход B\nВыход A"
      },
      {
        "id": "exit-stack",
        "title": "Когда число ресурсов известно только во время работы",
        "paragraphs": [
          "ExitStack хранит выходы успешно открытых менеджеров. Каждый enter_context добавляет ресурс; при выходе все они закрываются в обратном порядке."
        ],
        "example": "from contextlib import ExitStack\nfrom io import StringIO\n\nwith ExitStack() as stack:\n    files = [stack.enter_context(StringIO(text))\n             for text in [\"first\", \"second\"]]\n    print([file.read() for file in files])\n\nprint(all(file.closed for file in files))",
        "output": "['first', 'second']\nTrue",
        "note": "Если открытие очередного ресурса завершится ошибкой, ExitStack освободит уже открытые. Для двух заранее известных ресурсов обычный with проще."
      }
    ],
    "id": "multiple",
    "quick": {
      "summary": "`with A() as a, B() as b` работает как два вложенных with. Сначала вход в A, затем в B; выход — B, затем A.",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef resource(name):\n    print(\"Вход\", name)\n    try:\n        yield name\n    finally:\n        print(\"Выход\", name)\n\nwith resource(\"A\") as a, resource(\"B\") as b:\n    print(\"Тело\", a, b)",
      "takeaway": "Если вход в B упал, A уже открыт и будет закрыт. Если вход в A упал, до B выполнение не дойдёт.",
      "output": "Вход A\nВход B\nТело A B\nВыход B\nВыход A"
    },
    "level": "Следующий шаг",
    "aliases": [
      "multiple"
    ],
    "related": [
      "contexts/with",
      "contexts/contextmanager",
      "contexts/files"
    ],
    "source": "https://docs.python.org/3/library/contextlib.html",
    "sectionAliases": {}
  },
  {
    "title": "Менеджер через @contextmanager",
    "lead": "Тот же цикл жизни без отдельного класса.",
    "sections": [
      {
        "id": "part-1",
        "title": "Где выполняется тело with",
        "paragraphs": [
          "Вызов temporary_value(...) создаёт менеджер. При входе генератор начинает работать и доходит до yield. В этот момент выполняется тело with, а генератор ждёт.",
          "После нормального тела генератор продолжает работу за yield. При ошибке исключение передаётся в точку yield; finally всё равно восстанавливает настройку."
        ],
        "example": "from contextlib import contextmanager\n\n@contextmanager\ndef temporary_value(settings, key, value):\n    previous = settings[key]\n    settings[key] = value\n    try:\n        yield settings\n    finally:\n        settings[key] = previous\n\nsettings = {\"timeout\": 10}\nwith temporary_value(settings, \"timeout\", 1) as current:\n    print(current[\"timeout\"])\nprint(settings[\"timeout\"])",
        "output": "1\n10",
        "steps": [
          "Запоминаем timeout = 10, меняем на 1.",
          "yield settings передаёт словарь в current и отдаёт управление телу.",
          "При выходе finally возвращает timeout = 10."
        ]
      },
      {
        "id": "error-path",
        "title": "Восстановление после исключения",
        "paragraphs": [
          "Уборка не должна зависеть от успешного завершения тела. Здесь ошибка выходит наружу, а настройка уже восстановлена."
        ],
        "example": "from contextlib import contextmanager\n\n@contextmanager\ndef temporary_value(settings, key, value):\n    previous = settings[key]\n    settings[key] = value\n    try:\n        yield settings\n    finally:\n        settings[key] = previous\n\nsettings = {\"timeout\": 10}\ntry:\n    with temporary_value(settings, \"timeout\", 1):\n        raise ValueError(\"Сбой проверки\")\nexcept ValueError as error:\n    print(error)\nprint(settings[\"timeout\"])",
        "output": "Сбой проверки\n10",
        "mistakes": [
          "Код просто после yield, без finally, может быть пропущен при исключении.",
          "Не ловите ошибку возле yield без raise, если хотите сохранить падение: иначе менеджер подавит её.",
          "Не переиспользуйте один созданный генераторный менеджер: для каждого with вызывайте фабрику заново."
        ]
      }
    ],
    "id": "contextmanager",
    "quick": {
      "summary": "До yield — подготовка. Значение yield попадёт в as. Пока выполняется тело with, генератор приостановлен; затем он продолжит работу для завершения.",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef temporary_value(settings, key, value):\n    previous = settings[key]\n    settings[key] = value\n    try:\n        yield settings\n    finally:\n        settings[key] = previous\n\nsettings = {\"timeout\": 10}\nwith temporary_value(settings, \"timeout\", 1) as current:\n    print(current[\"timeout\"])\nprint(settings[\"timeout\"])",
      "takeaway": "Должен выполниться ровно один yield. Уборку пишите в finally: исключение из тела with приходит в генератор в точку yield.",
      "output": "1\n10"
    },
    "level": "Следующий шаг",
    "aliases": [
      "contextmanager"
    ],
    "related": [
      "contexts/manager-class",
      "contexts/resource",
      "topics/generators"
    ],
    "source": "https://docs.python.org/3/library/contextlib.html",
    "sectionAliases": {}
  }
];
