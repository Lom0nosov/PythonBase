/* Самодостаточные примеры; output — проверяемый ожидаемый stdout. Сохраняйте id для ссылок. */
window.PythonBase.content.contexts = [
  {
    "title": "Как работает with",
    "lead": "Взять вещь, поработать с ней и гарантированно вернуть на место.",
    "sections": [
      {
        "id": "part-1",
        "title": "Что происходит до, во время и после блока",
        "paragraphs": [
          "У `with` всегда три шага: **вход**, **тело** и **выход**. На входе ресурс открывается, в теле вы с ним работаете, на выходе Python сам его закрывает.",
          "Слово `as` даёт ресурсу имя. В примере это `file` — через него мы пишем в файл.",
          "Обратите внимание на вывод: внутри блока `file.closed` равно `False` (файл открыт), а после блока — `True` (Python уже закрыл файл)."
        ],
        "example": "with open(\"report.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"passed\")\n    print(\"Внутри with файл закрыт?\", file.closed)\n\nprint(\"После with файл закрыт?\", file.closed)",
        "output": "Внутри with файл закрыт? False\nПосле with файл закрыт? True",
        "steps": [
          "Вход: `open(...)` открывает файл, и он попадает в переменную `file`.",
          "Тело: выполняются строки с отступом — записываем текст и печатаем, открыт ли файл.",
          "Выход: отступ закончился — Python сам закрывает файл."
        ],
        "syntax": "with ресурс as имя:\n    работа_с_ресурсом"
      },
      {
        "id": "choose",
        "title": "Когда нужен with",
        "paragraphs": [
          "Используйте `with`, когда у действия есть пара: **открыл — закрыл**, **занял — освободил**, **поменял — вернул как было**.",
          "`with` не прячет ошибки. Если внутри блока что-то сломалось, Python сначала закроет ресурс, а потом всё равно покажет ошибку."
        ],
        "mistakes": [
          "Работать с файлом после блока. Отступ закончился — файл уже закрыт, читать из него нельзя.",
          "Писать `with` с любым объектом. Работает только с объектами, которые умеют «входить» и «выходить»: файлы, блокировки, `pytest.raises` и т. п."
        ]
      }
    ],
    "id": "with",
    "quick": {
      "summary": "`with` сам выполняет «уборку» после блока: закрывает файл, освобождает ресурс, возвращает настройку. Даже если внутри блока случилась ошибка.",
      "code": "with open(\"report.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"passed\")\n    print(\"Внутри with файл закрыт?\", file.closed)\n\nprint(\"После with файл закрыт?\", file.closed)",
      "takeaway": "Всё, что сдвинуто вправо под `with`, работает с открытым ресурсом. Как только отступ закончился — ресурс уже закрыт. Переменная `file` остаётся, но читать из неё больше нельзя.",
      "output": "Внутри with файл закрыт? False\nПосле with файл закрыт? True",
      "analogy": "Как библиотека с автоматическим возвратом: вы берёте книгу (`with`), читаете её внутри блока, а когда выходите из блока — книга сама возвращается на полку. Забыть её вернуть невозможно."
    },
    "inTests": {
      "text": "В pytest `with` встречается постоянно. Самый частый случай — проверка, что код падает с нужной ошибкой: `pytest.raises` ловит ошибку внутри блока, и тест проходит.",
      "code": "import pytest\n\ndef test_division_by_zero():\n    with pytest.raises(ZeroDivisionError):\n        1 / 0"
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
    "lead": "Прочитать или записать файл и не забыть его закрыть.",
    "sections": [
      {
        "id": "part-1",
        "title": "Записать и прочитать текст",
        "paragraphs": [
          "Чтобы пример можно было запустить где угодно, он создаёт временную папку `TemporaryDirectory` — она сама удалится после примера. В своей работе просто укажите путь к нужному файлу.",
          "Здесь два `with` подряд. Первый открывает файл на запись и закрывает его. Второй открывает тот же файл уже на чтение.",
          "Если файла нет или нет прав на него, ошибка появится сразу на строке с `open` — ещё до входа в блок."
        ],
        "example": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\n\nwith TemporaryDirectory() as folder:\n    path = Path(folder) / \"report.txt\"\n    with open(path, \"w\", encoding=\"utf-8\") as file:\n        file.write(\"passed\\n\")\n    with open(path, \"r\", encoding=\"utf-8\") as file:\n        print(file.read().strip())",
        "output": "passed",
        "mistakes": [
          "Забыть `encoding=\"utf-8\"`. На Windows русский текст превратится в «кракозябры».",
          "Открыть файл в режиме `\"w\"`, чтобы прочитать. Файл будет очищен, а прочитать ничего не получится.",
          "Думать, что `write` возвращает текст. Он возвращает число записанных символов."
        ],
        "syntax": "with open(путь, \"r\", encoding=\"utf-8\") as file:\n    текст = file.read()"
      },
      {
        "id": "cursor",
        "title": "Курсор чтения и seek",
        "paragraphs": [
          "У открытого файла есть невидимый курсор — как закладка в книге. Каждое чтение двигает закладку дальше.",
          "Когда файл прочитан до конца, следующий `read()` вернёт пустую строку `''`. Чтобы прочитать заново, верните закладку в начало: `file.seek(0)`.",
          "`StringIO` в примере — это «файл в памяти». Он ведёт себя как настоящий файл, но ничего не создаёт на диске."
        ],
        "example": "from io import StringIO\n\nwith StringIO(\"alpha\\nbeta\\n\") as file:\n    print(file.readline().strip())\n    print(file.read().strip())\n    print(repr(file.read()))\n    file.seek(0)\n    print(file.readline().strip())",
        "output": "alpha\nbeta\n''\nalpha",
        "note": "Большой файл удобнее читать по строкам: `for line in file:`. Так он не загружается в память целиком."
      }
    ],
    "id": "files",
    "quick": {
      "summary": "`open(путь, режим, encoding=\"utf-8\")` открывает файл. Режим `\"r\"` — читать, `\"w\"` — записать заново, `\"a\"` — дописать в конец. Закрывать файл поручите `with`.",
      "code": "with open(\"report.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"test_login: passed\\n\")\n\nwith open(\"report.txt\", \"a\", encoding=\"utf-8\") as file:\n    file.write(\"test_logout: passed\\n\")\n\nwith open(\"report.txt\", \"r\", encoding=\"utf-8\") as file:\n    print(file.read())",
      "takeaway": "Режим `\"w\"` стирает всё, что было в файле. Если нужно добавить строку к старому содержимому — берите `\"a\"`. Для русского текста всегда указывайте `encoding=\"utf-8\"`.",
      "output": "test_login: passed\ntest_logout: passed",
      "analogy": "Режим файла — как способ открыть тетрадь: `r` — только посмотреть, `w` — вырвать все листы и писать с чистого, `a` — продолжить писать после последней строчки."
    },
    "inTests": {
      "text": "В тестах файлы читают, чтобы взять тестовые данные (логины, JSON с ответом сервера) или проверить, что программа записала правильный отчёт. pytest даёт фикстуру `tmp_path` — временную папку, которая сама удаляется после теста.",
      "code": "def test_report_is_saved(tmp_path):\n    path = tmp_path / \"report.txt\"\n    with open(path, \"w\", encoding=\"utf-8\") as file:\n        file.write(\"passed\")\n\n    with open(path, encoding=\"utf-8\") as file:\n        assert file.read() == \"passed\""
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
    "lead": "Сделать свой объект, который умеет работать с `with`.",
    "sections": [
      {
        "id": "part-1",
        "title": "Два метода: вход и выход",
        "paragraphs": [
          "`__enter__` — это «что сделать на входе». То, что он вернёт (`return`), окажется в переменной после `as`. Здесь он возвращает строку `\"ресурс\"`.",
          "`__exit__` — это «что сделать на выходе». Он срабатывает, когда блок `with` закончился.",
          "Лишние параметры у `__exit__` (`exc_type`, `exc_value`, `traceback`) — это информация об ошибке. Если ошибки не было, все три равны `None`."
        ],
        "example": "class Resource:\n    def __enter__(self):\n        print(\"Вход\")\n        return \"ресурс\"\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"Выход\")\n        return False\n\nwith Resource() as value:\n    print(value)",
        "output": "Вход\nресурс\nВыход",
        "steps": [
          "`Resource()` создаёт объект.",
          "Python вызывает `__enter__`: печатается «Вход», строка «ресурс» попадает в `value`.",
          "Выполняется тело: печатается `value`.",
          "Блок закончился — Python вызывает `__exit__`: печатается «Выход»."
        ],
        "syntax": "class Имя:\n    def __enter__(self):\n        return значение_для_as\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        return False"
      },
      {
        "id": "exit-arguments",
        "title": "Что получает __exit__ при ошибке",
        "paragraphs": [
          "Если внутри блока случилась ошибка, Python передаёт её в `__exit__`: в `exc_type` придёт тип ошибки (например, `ValueError`).",
          "Если `__exit__` вернул `False` (или ничего не вернул), ошибка полетит дальше, и её можно поймать через `try/except`. Это правильное поведение почти всегда."
        ],
        "example": "class Resource:\n    def __enter__(self):\n        return self\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"Тип:\", exc_type.__name__ if exc_type else \"нет\")\n        return False\n\ntry:\n    with Resource():\n        raise ValueError(\"неверные данные\")\nexcept ValueError as error:\n    print(error)",
        "output": "Тип: ValueError\nневерные данные"
      }
    ],
    "id": "manager-class",
    "quick": {
      "summary": "Чтобы объект работал с `with`, у класса должно быть два метода: `__enter__` — что сделать на входе, `__exit__` — что сделать на выходе. То, что вернул `__enter__`, попадает в переменную после `as`.",
      "code": "class Resource:\n    def __enter__(self):\n        print(\"Вход\")\n        return \"ресурс\"\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"Выход\")\n        return False\n\nwith Resource() as value:\n    print(value)",
      "takeaway": "`__exit__` вызывается всегда, когда вход прошёл успешно, даже при ошибке в блоке. Возвращайте из `__exit__` `False` — тогда ошибка не потеряется.",
      "output": "Вход\nресурс\nВыход",
      "analogy": "Как дверь с охранником: `__enter__` — охранник открывает дверь и выдаёт пропуск, `__exit__` — забирает пропуск и закрывает дверь, когда вы выходите. Даже если вы выбежали в панике (ошибка)."
    },
    "inTests": {
      "text": "Свой менеджер удобен, когда перед проверкой нужно что-то включить, а после — обязательно выключить: открыть соединение с базой, войти под пользователем, запустить таймер.",
      "code": "class LoggedIn:\n    def __init__(self, user):\n        self.user = user\n\n    def __enter__(self):\n        print(\"Вошли как\", self.user)\n        return self.user\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"Вышли из аккаунта\")\n        return False\n\ndef test_profile_opens():\n    with LoggedIn(\"admin\") as user:\n        assert user == \"admin\""
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
    "lead": "Поменять настройку только на время блока, а потом вернуть как было.",
    "sections": [
      {
        "id": "part-1",
        "title": "Сохранить → изменить → восстановить",
        "paragraphs": [
          "Здесь «ресурс» — это значение в словаре настроек. Внутри блока `timeout` равен 1, а снаружи снова 10.",
          "`__init__` только запоминает, что и на что менять. Само изменение происходит в `__enter__`, а возврат старого значения — в `__exit__`."
        ],
        "example": "class TemporaryValue:\n    def __init__(self, settings, key, value):\n        self.settings, self.key, self.value = settings, key, value\n\n    def __enter__(self):\n        self.previous = self.settings[self.key]\n        self.settings[self.key] = self.value\n        return self.settings\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        self.settings[self.key] = self.previous\n        return False\n\nsettings = {\"timeout\": 10}\nwith TemporaryValue(settings, \"timeout\", 1):\n    print(settings[\"timeout\"])\nprint(settings[\"timeout\"])",
        "output": "1\n10",
        "steps": [
          "На входе запоминаем старое значение: `previous = 10`.",
          "Ставим новое значение `1` и выполняем блок.",
          "На выходе возвращаем `previous` обратно. Ошибку, если она была, не прячем."
        ]
      },
      {
        "id": "partial-entry",
        "title": "Если вход сломался на полпути",
        "paragraphs": [
          "Представьте, что `__enter__` открыл первый файл, а на втором упал с ошибкой. Тогда `__exit__` **не вызовется**, и первый файл останется открытым.",
          "Поэтому для нескольких ресурсов проще использовать несколько `with` (или `ExitStack`) — они сами закроют всё, что успело открыться."
        ]
      }
    ],
    "id": "resource",
    "quick": {
      "summary": "Менеджер может не только открывать файлы. Он может временно поменять значение: на входе запомнить старое и поставить новое, на выходе вернуть старое.",
      "code": "class TemporaryValue:\n    def __init__(self, settings, key, value):\n        self.settings, self.key, self.value = settings, key, value\n\n    def __enter__(self):\n        self.previous = self.settings[self.key]\n        self.settings[self.key] = self.value\n        return self.settings\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        self.settings[self.key] = self.previous\n        return False\n\nsettings = {\"timeout\": 10}\nwith TemporaryValue(settings, \"timeout\", 1):\n    print(settings[\"timeout\"])\nprint(settings[\"timeout\"])",
      "takeaway": "Внутри блока `timeout` равен 1, после блока снова 10. Старое значение вернётся даже при ошибке внутри блока. Пример работает только если ключ уже есть в словаре.",
      "output": "1\n10",
      "analogy": "Как поменять громкость телевизора, пока говорите по телефону: сделали тише, поговорили, вернули прежнюю громкость. `with` делает «вернуть» автоматически."
    },
    "inTests": {
      "text": "Удобно для тестов, которым нужна особая настройка: короткий таймаут, другой адрес сервера, включённый «режим отладки». После теста настройка вернётся, и другие тесты не сломаются. В pytest для этого есть готовая фикстура `monkeypatch`.",
      "code": "def test_fast_timeout(monkeypatch):\n    settings = {\"timeout\": 10}\n    monkeypatch.setitem(settings, \"timeout\", 1)\n    assert settings[\"timeout\"] == 1\n    # после теста monkeypatch сам вернёт timeout = 10"
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
    "lead": "`with` закрывает ресурс при ошибке, но саму ошибку не прячет.",
    "sections": [
      {
        "id": "part-1",
        "title": "Ресурс закрыт, ошибка видна",
        "paragraphs": [
          "Внутри блока мы специально вызываем ошибку `raise ValueError`. Блок прерывается.",
          "Перед тем как ошибка выйдет наружу, `with` закрывает `report`. Потом ошибку ловит внешний `except` и печатает её текст. В последней строке видно: `report` действительно закрыт."
        ],
        "example": "from io import StringIO\n\nreport = StringIO()\ntry:\n    with report:\n        report.write(\"started\")\n        raise ValueError(\"Проверка не прошла\")\nexcept ValueError as error:\n    print(error)\n\nprint(\"Закрыт:\", report.closed)",
        "output": "Проверка не прошла\nЗакрыт: True"
      },
      {
        "id": "suppress",
        "title": "Когда ошибку можно спрятать",
        "paragraphs": [
          "Иногда ошибка ожидаема и не важна. Например, удалить ключ, которого может не быть. Для этого есть `contextlib.suppress(ТипОшибки)`.",
          "Внимание: после ошибки строки внутри блока **не выполняются**. Программа просто продолжается после `with`."
        ],
        "example": "from contextlib import suppress\n\nvalues = {\"temporary\": 1}\nwith suppress(KeyError):\n    del values[\"missing\"]\n    print(\"Эта строка не выполнится\")\n\nprint(\"Продолжаем\")",
        "output": "Продолжаем",
        "mistakes": [
          "`suppress(Exception)` вокруг проверки в тесте. Так спрячутся все падения — тест будет зелёным, даже если всё сломано.",
          "Оборачивать в `suppress` большой кусок кода. Держите внутри одну-две строки, где ошибка действительно ожидаема."
        ]
      },
      {
        "id": "entry-failure",
        "title": "Ошибка на входе — особый случай",
        "paragraphs": [
          "Если упал сам `__enter__`, вход не случился. Значит, не будет ни тела блока, ни `__exit__`. В выводе нет строк «Тело» и «Выход».",
          "Вывод: всё, что `__enter__` успел открыть до ошибки, он должен закрыть сам."
        ],
        "example": "class Broken:\n    def __enter__(self):\n        print(\"Начало входа\")\n        raise RuntimeError(\"Не удалось открыть ресурс\")\n\n    def __exit__(self, *args):\n        print(\"Выход\")\n\ntry:\n    with Broken():\n        print(\"Тело\")\nexcept RuntimeError as error:\n    print(error)",
        "output": "Начало входа\nНе удалось открыть ресурс"
      }
    ],
    "id": "exceptions",
    "quick": {
      "summary": "Если в блоке `with` случилась ошибка, Python сначала закроет ресурс, а потом передаст ошибку дальше. Поймать её можно обычным `try/except` вокруг `with`.",
      "code": "from io import StringIO\n\nreport = StringIO()\ntry:\n    with report:\n        report.write(\"started\")\n        raise ValueError(\"Проверка не прошла\")\nexcept ValueError as error:\n    print(error)\n\nprint(\"Закрыт:\", report.closed)",
      "takeaway": "Уборка ≠ скрыть ошибку. Ресурс закрыт, а ошибка видна. Прятать ошибку стоит только намеренно, через `contextlib.suppress`, и только конкретную.",
      "output": "Проверка не прошла\nЗакрыт: True",
      "analogy": "Как пожарная тревога в библиотеке: вы бросаете книгу и выбегаете, но библиотекарь всё равно вернёт её на полку. А о тревоге (ошибке) узнают все."
    },
    "inTests": {
      "text": "Это важно для отчётов: если тест упал внутри `with`, ресурс будет закрыт, а падение всё равно попадёт в отчёт pytest. Никогда не прячьте ошибки в тестах через `suppress(Exception)` — тест «позеленеет», хотя на самом деле сломан."
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
    "lead": "Открыть несколько ресурсов в одном `with`.",
    "sections": [
      {
        "id": "part-1",
        "title": "Почему закрываются в обратном порядке",
        "paragraphs": [
          "Запись `with A, B:` — это то же самое, что `with B` внутри `with A`. Внутренний блок всегда заканчивается первым, поэтому B закрывается раньше A.",
          "Функция `resource` в примере — маленький менеджер, который просто печатает «Вход» и «Выход». Так хорошо видно порядок. Как её сделать — в теме «Менеджер через @contextmanager»."
        ],
        "example": "from contextlib import contextmanager\n\n@contextmanager\ndef resource(name):\n    print(\"Вход\", name)\n    try:\n        yield name\n    finally:\n        print(\"Выход\", name)\n\nwith resource(\"A\") as a, resource(\"B\") as b:\n    print(\"Тело\", a, b)",
        "output": "Вход A\nВход B\nТело A B\nВыход B\nВыход A"
      },
      {
        "id": "exit-stack",
        "title": "Когда ресурсов заранее неизвестно сколько",
        "paragraphs": [
          "Если файлов то 2, то 10, писать их все в одном `with` нельзя. Тут помогает `ExitStack` — «корзина» для ресурсов.",
          "Каждый `stack.enter_context(...)` открывает ресурс и кладёт его в корзину. Когда блок заканчивается, корзина закрывает всё, что в ней лежит."
        ],
        "example": "from contextlib import ExitStack\nfrom io import StringIO\n\nwith ExitStack() as stack:\n    files = [stack.enter_context(StringIO(text))\n             for text in [\"first\", \"second\"]]\n    print([file.read() for file in files])\n\nprint(all(file.closed for file in files))",
        "output": "['first', 'second']\nTrue",
        "note": "Если два ресурса известны заранее, обычный `with A, B:` проще и понятнее."
      }
    ],
    "id": "multiple",
    "quick": {
      "summary": "`with A() as a, B() as b:` открывает сначала A, потом B. Закрывает в обратном порядке: сначала B, потом A.",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef resource(name):\n    print(\"Вход\", name)\n    try:\n        yield name\n    finally:\n        print(\"Выход\", name)\n\nwith resource(\"A\") as a, resource(\"B\") as b:\n    print(\"Тело\", a, b)",
      "takeaway": "Если B не открылся, A всё равно будет закрыт. Если не открылся A, до B дело не дойдёт.",
      "output": "Вход A\nВход B\nТело A B\nВыход B\nВыход A",
      "analogy": "Как матрёшки: сначала открываете большую, потом маленькую внутри. Собираете обратно наоборот — сначала маленькую, потом большую."
    },
    "inTests": {
      "text": "Пригодится, когда в тесте нужно сразу два ресурса: например, прочитать входные данные из одного файла и сравнить с ожидаемым результатом из другого.",
      "code": "def test_files_are_equal(tmp_path):\n    (tmp_path / \"actual.txt\").write_text(\"ok\", encoding=\"utf-8\")\n    (tmp_path / \"expected.txt\").write_text(\"ok\", encoding=\"utf-8\")\n\n    with open(tmp_path / \"actual.txt\", encoding=\"utf-8\") as actual, \\\n         open(tmp_path / \"expected.txt\", encoding=\"utf-8\") as expected:\n        assert actual.read() == expected.read()"
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
    "lead": "Сделать менеджер из обычной функции, без класса.",
    "sections": [
      {
        "id": "part-1",
        "title": "Где выполняется блок with",
        "paragraphs": [
          "Функция начинает работать при входе в `with`: запоминает старое значение и ставит новое.",
          "Дойдя до `yield`, функция «засыпает» и передаёт `settings` в переменную `current`. В это время выполняется блок `with`.",
          "Когда блок закончился, функция «просыпается» и выполняет `finally` — возвращает старое значение."
        ],
        "example": "from contextlib import contextmanager\n\n@contextmanager\ndef temporary_value(settings, key, value):\n    previous = settings[key]\n    settings[key] = value\n    try:\n        yield settings\n    finally:\n        settings[key] = previous\n\nsettings = {\"timeout\": 10}\nwith temporary_value(settings, \"timeout\", 1) as current:\n    print(current[\"timeout\"])\nprint(settings[\"timeout\"])",
        "output": "1\n10",
        "steps": [
          "Запоминаем `timeout = 10` и ставим `1`.",
          "`yield settings` отдаёт словарь в `current` и ставит функцию на паузу.",
          "Блок `with` закончился — `finally` возвращает `timeout = 10`."
        ],
        "syntax": "@contextmanager\ndef имя():\n    подготовка\n    try:\n        yield значение\n    finally:\n        уборка"
      },
      {
        "id": "error-path",
        "title": "Уборка при ошибке",
        "paragraphs": [
          "Внутри блока случилась ошибка. Благодаря `finally` настройка всё равно вернулась к 10, а ошибка вышла наружу и попала в `except`."
        ],
        "example": "from contextlib import contextmanager\n\n@contextmanager\ndef temporary_value(settings, key, value):\n    previous = settings[key]\n    settings[key] = value\n    try:\n        yield settings\n    finally:\n        settings[key] = previous\n\nsettings = {\"timeout\": 10}\ntry:\n    with temporary_value(settings, \"timeout\", 1):\n        raise ValueError(\"Сбой проверки\")\nexcept ValueError as error:\n    print(error)\nprint(settings[\"timeout\"])",
        "output": "Сбой проверки\n10",
        "mistakes": [
          "Писать уборку после `yield` без `finally`. При ошибке она просто не выполнится.",
          "Ловить ошибку вокруг `yield` через `except` и не выбрасывать её снова. Менеджер «проглотит» ошибку, и вы о ней не узнаете.",
          "Использовать один созданный менеджер в двух `with`. Для каждого `with` вызывайте функцию заново."
        ]
      }
    ],
    "id": "contextmanager",
    "quick": {
      "summary": "Декоратор `@contextmanager` превращает функцию в менеджер. Всё **до** `yield` — это вход, всё **после** — выход. Значение из `yield` попадает в `as`.",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef temporary_value(settings, key, value):\n    previous = settings[key]\n    settings[key] = value\n    try:\n        yield settings\n    finally:\n        settings[key] = previous\n\nsettings = {\"timeout\": 10}\nwith temporary_value(settings, \"timeout\", 1) as current:\n    print(current[\"timeout\"])\nprint(settings[\"timeout\"])",
      "takeaway": "Уборку пишите в `finally` — тогда она выполнится даже при ошибке в блоке. И в функции должен быть ровно один `yield`.",
      "output": "1\n10",
      "analogy": "`yield` — это пауза в фильме. Функция делает подготовку, ставит паузу и отдаёт управление блоку `with`. Когда блок закончился, «фильм» продолжается с места паузы — и выполняется уборка."
    },
    "inTests": {
      "text": "Так устроены фикстуры pytest: всё до `yield` выполняется перед тестом (подготовка), всё после — после теста (уборка). Если вы поняли `@contextmanager`, вы поняли фикстуры.",
      "code": "import pytest\n\n@pytest.fixture\ndef settings():\n    data = {\"timeout\": 10}   # подготовка перед тестом\n    yield data               # тест получает data\n    data.clear()             # уборка после теста\n\ndef test_timeout(settings):\n    assert settings[\"timeout\"] == 10"
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
