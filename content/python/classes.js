/* Материалы: редактируйте текст и примеры, сохраняйте постоянные id. */
window.PythonBase.content.classes = [
  {
    "title": "Класс",
    "lead": "Класс описывает новый тип данных: какие значения хранит объект и какие действия с ними выполняет.",
    "sections": [
      {
        "title": "Что описывает class",
        "paragraphs": [
          "Класс — это описание, а экземпляр — конкретное значение, созданное по этому описанию. Например, `User` задаёт правила для пользователей, а `anna` хранит данные одного пользователя.",
          "После `class` пишут имя в стиле `PascalCase`. В теле размещают атрибуты и методы. Пустое тело можно обозначить `pass`, но в рабочем классе обычно сразу задают начальные данные и поведение."
        ],
        "useWhen": [
          "Несколько сущностей имеют одинаковый набор данных и действий.",
          "Нужно хранить состояние между вызовами методов."
        ],
        "steps": [
          "Назовите сущность существительным: `User`, `Order`, `Point`.",
          "Определите данные объекта и действия над ними.",
          "Создайте экземпляр вызовом класса."
        ],
        "mistakes": [
          "Создавать класс ради одной функции без состояния.",
          "Называть класс глаголом или со строчной буквы."
        ],
        "syntax": "class ClassName:\n    def method(self):\n        ...",
        "example": "class Lamp:\n    def turn_on(self):\n        return \"Лампа включена\"\n\nlamp = Lamp()\nprint(lamp.turn_on())\n# Лампа включена",
        "template": "class Thing:\n    def action(self):\n        return \"результат\"",
        "note": "берите класс, когда данные и работающие с ними функции образуют одну сущность. Для независимого вычисления достаточно функции.",
        "id": "part-1"
      },
      {
        "title": "Класс и экземпляр — разные уровни",
        "paragraphs": [
          "Имя `Lamp` ссылается на сам класс. Выражение `Lamp()` создаёт экземпляр этого класса. Один класс может создать сколько угодно независимых экземпляров.",
          "`isinstance` удобно использовать на границе программы, когда нужно проверить тип полученного объекта."
        ],
        "syntax": "object = ClassName()\nisinstance(object, ClassName)",
        "example": "class Lamp:\n    pass\n\nlamp = Lamp()\nprint(isinstance(lamp, Lamp))\nprint(lamp is Lamp)\n# True\n# False",
        "note": "Класс — фабрика и набор правил; экземпляр — конкретный объект с собственным состоянием.",
        "id": "part-2"
      }
    ],
    "id": "class",
    "quick": {
      "summary": "Класс описывает новый тип данных: какие значения хранит объект и какие действия с ними выполняет.",
      "code": "class Lamp:\n    def turn_on(self):\n        return \"Лампа включена\"\n\nlamp = Lamp()\nprint(lamp.turn_on())\n# Лампа включена",
      "takeaway": "Берите класс, когда данные и работающие с ними функции образуют одну сущность. Для независимого вычисления достаточно функции."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/instance",
      "classes/init"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Объект (экземпляр)",
    "lead": "Объект, или экземпляр, — конкретный результат вызова класса со своими данными.",
    "sections": [
      {
        "title": "Создание независимых объектов",
        "paragraphs": [
          "Класс вызывают как функцию: `Counter(5)`. Python создаёт объект, настраивает его и возвращает ссылку. Переменная хранит эту ссылку, а не копию класса.",
          "Два вызова создают два объекта. Изменение атрибута одного объекта не меняет другой, если данные не были ошибочно размещены в общем атрибуте класса."
        ],
        "useWhen": [
          "Нужны несколько значений одного типа с разным состоянием.",
          "Объект должен помнить изменения между вызовами."
        ],
        "steps": [
          "Вызовите класс и передайте нужные начальные значения.",
          "Сохраните объект в переменную.",
          "Обращайтесь к данным и методам через точку."
        ],
        "mistakes": [
          "Считать разные переменные разными объектами: `b = a` создаёт вторую ссылку на тот же объект.",
          "Сравнивать идентичность через `is`, когда нужны равные значения."
        ],
        "syntax": "first = ClassName(...)\nsecond = ClassName(...)",
        "example": "class Counter:\n    def __init__(self, value=0):\n        self.value = value\n\nfirst = Counter(5)\nsecond = Counter(5)\nfirst.value += 1\nprint(first.value, second.value)\nprint(first is second)\n# 6 5\n# False",
        "template": "item = ClassName(...)\nitem.method()",
        "note": "создавайте отдельный экземпляр для каждой сущности, состояние которой должно изменяться независимо.",
        "id": "part-1"
      }
    ],
    "id": "instance",
    "quick": {
      "summary": "Объект, или экземпляр, — конкретный результат вызова класса со своими данными.",
      "code": "class Counter:\n    def __init__(self, value=0):\n        self.value = value\n\nfirst = Counter(5)\nsecond = Counter(5)\nfirst.value += 1\nprint(first.value, second.value)\nprint(first is second)\n# 6 5\n# False",
      "takeaway": "Создавайте отдельный экземпляр для каждой сущности, состояние которой должно изменяться независимо."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/self"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "self",
    "lead": "`self` — ссылка на экземпляр, для которого сейчас выполняется метод.",
    "sections": [
      {
        "title": "Как объект попадает в метод",
        "paragraphs": [
          "В определении обычного метода первым параметром пишут `self`. При вызове `account.deposit(50)` Python сам передаёт `account` в этот параметр.",
          "Через `self` метод читает и меняет атрибуты именно текущего объекта, а также вызывает его другие методы."
        ],
        "useWhen": [
          "Методу нужны данные конкретного экземпляра.",
          "Метод изменяет состояние или вызывает другой метод объекта."
        ],
        "steps": [
          "Добавьте `self` первым параметром метода.",
          "Используйте `self.attribute` вместо случайной локальной переменной.",
          "При обычном вызове не передавайте `self` вручную."
        ],
        "mistakes": [
          "Забыть `self` в сигнатуре и получить ошибку о лишнем аргументе.",
          "Написать `balance += amount` вместо `self.balance += amount`."
        ],
        "syntax": "def method(self, value):\n    self.attribute = value",
        "example": "class Account:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\naccount = Account(100)\naccount.deposit(50)\nAccount.deposit(account, 25)\nprint(account.balance)\n# 175",
        "template": "def method(self, argument):\n    self.attribute = argument",
        "note": "нужен текущий объект — обычный метод с `self`; нужен класс — `classmethod`; не нужен ни один — `staticmethod` или отдельная функция.",
        "id": "part-1"
      }
    ],
    "id": "self",
    "quick": {
      "summary": "self — ссылка на экземпляр, для которого сейчас выполняется метод.",
      "code": "class Account:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\naccount = Account(100)\naccount.deposit(50)\nAccount.deposit(account, 25)\nprint(account.balance)\n# 175",
      "takeaway": "Нужен текущий объект — обычный метод с `self`; нужен класс — `classmethod`; не нужен ни один — `staticmethod` или отдельная функция."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Конструктор __init__",
    "lead": "`__init__` инициализирует уже созданный экземпляр начальными данными; он необязателен.",
    "sections": [
      {
        "title": "Создание и инициализация",
        "paragraphs": [
          "При вызове класса Python сначала создаёт объект, затем вызывает `__init__` для настройки его атрибутов. Поэтому точная формулировка такая: `__init__` инициализирует объект, а не создаёт его.",
          "`__init__` необязателен: если начальные данные не нужны, класс работает и без него. Низкоуровневое создание выполняет `__new__`; переопределять его в обычных прикладных классах почти никогда не требуется."
        ],
        "useWhen": [
          "Объекту нужны обязательные или начальные значения.",
          "Нужно сразу привести входные данные к нужному виду."
        ],
        "steps": [
          "Поставьте обязательные параметры перед параметрами со значениями по умолчанию.",
          "Сохраните входные значения через `self`.",
          "Создавайте личные списки и словари внутри `__init__`."
        ],
        "mistakes": [
          "Возвращать значение из `__init__`: он должен вернуть `None`.",
          "Считать `__init__` обязательным или вызывать его вручную.",
          "Использовать общий список вместо нового списка для каждого объекта."
        ],
        "syntax": "def __init__(self, required, optional=default):\n    self.required = required\n    self.optional = optional",
        "example": "class Task:\n    def __init__(self, title, done=False):\n        self.title = title\n        self.done = done\n        self.tags = []\n\ntask = Task(\"Изучить классы\")\nprint(task.title, task.done, task.tags)\n# Изучить классы False []",
        "template": "class Item:\n    def __init__(self, name, active=True):\n        self.name = name\n        self.active = active",
        "note": "добавляйте `__init__`, когда экземпляр должен сразу получить корректное состояние. `__new__` оставьте для редких задач управления самим созданием.",
        "id": "part-1"
      }
    ],
    "id": "init",
    "quick": {
      "summary": "__init__ инициализирует уже созданный экземпляр начальными данными; он необязателен.",
      "code": "class Task:\n    def __init__(self, title, done=False):\n        self.title = title\n        self.done = done\n        self.tags = []\n\ntask = Task(\"Изучить классы\")\nprint(task.title, task.done, task.tags)\n# Изучить классы False []",
      "takeaway": "Добавляйте `__init__`, когда экземпляр должен сразу получить корректное состояние. `__new__` оставьте для редких задач управления самим созданием."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Атрибуты класса и экземпляра",
    "lead": "Атрибут экземпляра хранит личное значение, атрибут класса — общее значение и значение по умолчанию.",
    "sections": [
      {
        "title": "Где Python ищет атрибут",
        "paragraphs": [
          "Для обычных атрибутов значение экземпляра перекрывает значение класса. Если его нет у экземпляра, Python ищет в классе и базовых классах по MRO. `property` — исключение: его чтение и запись управляются дескриптором класса.",
          "Присваивание обычного `user.role` меняет атрибут этого объекта. Общие изменяемые данные (например, список на уровне класса) остаются общими, пока вы не создадите отдельный атрибут экземпляра."
        ],
        "useWhen": [
          "Экземпляр: имя, баланс, текущий статус и другие личные данные.",
          "Класс: константа, общий счётчик или настройка для всех экземпляров."
        ],
        "steps": [
          "Личные данные записывайте через `self`.",
          "Общие значения объявляйте в теле класса.",
          "Общий атрибут меняйте через класс, чтобы случайно не создать личную копию."
        ],
        "mistakes": [
          "Класть изменяемый список или словарь в атрибут класса, когда он должен быть личным.",
          "Менять общий счётчик через `self.count += 1` и тем самым создавать личный атрибут."
        ],
        "syntax": "class User:\n    role = \"guest\"\n\n    def __init__(self, name):\n        self.name = name",
        "example": "class User:\n    role = \"guest\"\n\n    def __init__(self, name):\n        self.name = name\n\nanna = User(\"Анна\")\nboris = User(\"Борис\")\nanna.role = \"admin\"\nprint(anna.role, boris.role, User.role)\n# admin guest guest",
        "template": "class Item:\n    shared = \"общее\"\n\n    def __init__(self, personal):\n        self.personal = personal",
        "note": "значение различается у объектов — атрибут экземпляра; едино для типа целиком — атрибут класса.",
        "id": "part-1"
      }
    ],
    "id": "attributes",
    "quick": {
      "summary": "Атрибут экземпляра хранит личное значение, атрибут класса — общее значение и значение по умолчанию.",
      "code": "class User:\n    role = \"guest\"\n\n    def __init__(self, name):\n        self.name = name\n\nanna = User(\"Анна\")\nboris = User(\"Борис\")\nanna.role = \"admin\"\nprint(anna.role, boris.role, User.role)\n# admin guest guest",
      "takeaway": "Значение различается у объектов — атрибут экземпляра; едино для типа целиком — атрибут класса."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Методы экземпляра",
    "lead": "Метод экземпляра получает `self` и выполняет действие с состоянием конкретного объекта.",
    "sections": [
      {
        "title": "Команды и вычисления объекта",
        "paragraphs": [
          "Метод экземпляра — обычный `def` в теле класса с первым параметром `self`. Он может менять состояние объекта или вычислять результат по его данным.",
          "Метод-команда обычно меняет объект. Метод-запрос возвращает результат через `return`. Печать внутри вычисляющего метода ограничивает повторное использование результата."
        ],
        "useWhen": [
          "Действию нужны атрибуты конкретного объекта.",
          "Правило изменения данных должно всегда выполняться одинаково."
        ],
        "steps": [
          "Назовите метод действием: `deposit`, `close`, `total`.",
          "Проверьте аргументы до изменения состояния.",
          "Верните вычисленное значение, если оно нужно вызывающему коду."
        ],
        "mistakes": [
          "Забыть `return` и неожиданно получить `None`.",
          "Менять атрибут до проверки аргумента.",
          "Передавать объект отдельным аргументом при вызове через точку."
        ],
        "syntax": "def action(self, value):\n    if value_is_invalid:\n        raise ValueError(\"...\")\n    self.attribute = value",
        "example": "class Wallet:\n    def __init__(self, balance=0):\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        self.balance += amount\n\n    def total(self):\n        return self.balance\n\nwallet = Wallet(100)\nwallet.deposit(50)\nprint(wallet.total())\n# 150",
        "template": "def method(self, value):\n    if value <= 0:\n        raise ValueError(\"Некорректное значение\")\n    self.attribute += value",
        "note": "если действие зависит от состояния экземпляра, это метод экземпляра; иначе проверьте, нужен ли `classmethod`, `staticmethod` или обычная функция.",
        "id": "part-1"
      }
    ],
    "id": "instance-methods",
    "quick": {
      "summary": "Метод экземпляра получает self и выполняет действие с состоянием конкретного объекта.",
      "code": "class Wallet:\n    def __init__(self, balance=0):\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        self.balance += amount\n\n    def total(self):\n        return self.balance\n\nwallet = Wallet(100)\nwallet.deposit(50)\nprint(wallet.total())\n# 150",
      "takeaway": "Если действие зависит от состояния экземпляра, это метод экземпляра; иначе проверьте, нужен ли `classmethod`, `staticmethod` или обычная функция."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Магические методы",
    "lead": "Dunder-методы связывают объект со стандартным синтаксисом Python: печатью, сравнением, длиной и операторами.",
    "sections": [
      {
        "title": "Стандартные операции без ручных вызовов",
        "paragraphs": [
          "Имена вида `__str__` называют dunder-методами. Обычно их не вызывают напрямую: `print(book)` запускает `book.__str__()`, а `left == right` запускает `left.__eq__(right)`.",
          "Добавляйте только те операции, смысл которых очевиден для сущности. Книга может иметь понятное строковое представление и сравнение, но операция сложения книг, скорее всего, запутает читателя."
        ],
        "useWhen": [
          "`__str__` — понятный текст для пользователя.",
          "`__repr__` — однозначный вид для разработчика и логов.",
          "`__eq__` — равенство по данным, а не по идентичности."
        ],
        "steps": [
          "Выберите стандартную операцию с ясным смыслом.",
          "Верните значение требуемого типа: строку из `__str__`, bool или `NotImplemented` из `__eq__`.",
          "Проверьте тип второго операнда перед чтением его атрибутов."
        ],
        "mistakes": [
          "Возвращать `print(...)` вместо значения.",
          "В `__eq__` обращаться к `other.title` без проверки типа.",
          "Возвращать `False` для неподдерживаемого типа вместо `NotImplemented`."
        ],
        "syntax": "def __eq__(self, other):\n    if not isinstance(other, type(self)):\n        return NotImplemented\n    return self.value == other.value",
        "example": "class Book:\n    def __init__(self, title):\n        self.title = title\n\n    def __str__(self):\n        return f\"Книга: {self.title}\"\n\n    def __eq__(self, other):\n        if not isinstance(other, Book):\n            return NotImplemented\n        return self.title == other.title\n\nbook = Book(\"Мы\")\nprint(book)\nprint(book == Book(\"Мы\"))\nprint(book == \"Мы\")\n# Книга: Мы\n# True\n# False",
        "template": "def __str__(self):\n    return f\"ClassName({self.attribute})\"\n\ndef __eq__(self, other):\n    if not isinstance(other, ClassName):\n        return NotImplemented\n    return self.attribute == other.attribute",
        "note": "реализуйте dunder-метод, только если стандартная операция естественна для объекта. Для обычного действия лучше именованный метод.",
        "id": "part-1"
      },
      {
        "title": "__str__ и __repr__ — два вида текста",
        "paragraphs": [
          "`__str__` возвращает удобный текст для пользователя: его вызывают `print(obj)` и `str(obj)`. `__repr__` нужен разработчику: его используют `repr(obj)`, отладчик и отображение объектов внутри списка.",
          "Оба метода обязаны вернуть строку. Полезный `__repr__` показывает имя класса и основные поля, чтобы по результату было понятно, какой объект перед вами."
        ],
        "useWhen": [
          "`__str__` — объект показывают пользователю.",
          "`__repr__` — объект попадает в логи, консоль или коллекции."
        ],
        "mistakes": [
          "Печатать внутри метода вместо `return`.",
          "Возвращать пароль, токен или другие секретные поля.",
          "Делать `__repr__` слишком длинным и нечитабельным."
        ],
        "syntax": "def __str__(self):\n    return \"понятный текст\"\n\ndef __repr__(self):\n    return \"ClassName(...)\"",
        "example": "class Book:\n    def __init__(self, title):\n        self.title = title\n\n    def __str__(self):\n        return f\"Книга «{self.title}»\"\n\n    def __repr__(self):\n        return f\"Book({self.title!r})\"\n\nbook = Book(\"Мы\")\nprint(book)\nprint([book])\n# Книга «Мы»\n# [Book('Мы')]",
        "note": "Если `__str__` не определён, `str(obj)` использует `__repr__`. Обратного правила нет: список всегда показывает элементы через `repr`.",
        "id": "part-2"
      },
      {
        "title": "__len__, __iter__ и __contains__ — поведение коллекции",
        "paragraphs": [
          "`len(obj)` вызывает `__len__`, цикл `for` получает итератор через `__iter__`, а `value in obj` использует `__contains__`. Обычно эти методы делегируют работу внутренней коллекции.",
          "Так объект можно использовать обычным синтаксисом Python, не раскрывая наружу список, в котором он хранит элементы."
        ],
        "useWhen": [
          "Объект по смыслу является контейнером или коллекцией.",
          "Нужно поддержать `len`, `for` или `in`."
        ],
        "steps": [
          "`__len__` возвращает целое неотрицательное число.",
          "`__iter__` возвращает итератор, например `iter(self.items)`.",
          "`__contains__` возвращает результат проверки принадлежности."
        ],
        "mistakes": [
          "Возвращать сам список из `__iter__` вместо итератора.",
          "Добавлять интерфейс коллекции объекту, который коллекцией не является."
        ],
        "syntax": "def __len__(self):\n    return len(self.items)\n\ndef __iter__(self):\n    return iter(self.items)\n\ndef __contains__(self, item):\n    return item in self.items",
        "example": "class Playlist:\n    def __init__(self, tracks):\n        self._tracks = list(tracks)\n\n    def __len__(self):\n        return len(self._tracks)\n\n    def __iter__(self):\n        return iter(self._tracks)\n\n    def __contains__(self, track):\n        return track in self._tracks\n\nplaylist = Playlist([\"Intro\", \"Finale\"])\nprint(len(playlist))\nprint(\"Finale\" in playlist)\nprint(list(playlist))\n# 2\n# True\n# ['Intro', 'Finale']",
        "template": "def __len__(self):\n    return len(self._items)\n\ndef __iter__(self):\n    return iter(self._items)",
        "id": "part-3"
      },
      {
        "title": "Операторы: __add__ и сравнения",
        "paragraphs": [
          "Выражение `left + right` вызывает `left.__add__(right)`, а `<` вызывает `__lt__`. Метод проверяет второй операнд и обычно возвращает новый объект, не изменяя исходные.",
          "Если операция с переданным типом не поддерживается, возвращайте `NotImplemented`. Тогда Python сможет попробовать отражённую операцию второго объекта или выдать корректный `TypeError`."
        ],
        "useWhen": [
          "Оператор имеет однозначный смысл для вашей сущности.",
          "Такой синтаксис делает код короче и понятнее именованного метода."
        ],
        "mistakes": [
          "Неожиданно изменять левый объект внутри `__add__`.",
          "Придумывать оператору смысл, который нельзя угадать.",
          "Читать атрибуты второго операнда без проверки типа."
        ],
        "syntax": "def __add__(self, other):\n    if not isinstance(other, type(self)):\n        return NotImplemented\n    return type(self)(self.value + other.value)",
        "example": "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n\n    def __add__(self, other):\n        if not isinstance(other, Money):\n            return NotImplemented\n        return Money(self.amount + other.amount)\n\n    def __repr__(self):\n        return f\"Money({self.amount})\"\n\nfirst = Money(100)\ntotal = first + Money(50)\nprint(first, total)\n# Money(100) Money(150)",
        "note": "Для изменения объекта на месте существуют отдельные методы вроде `__iadd__`, но в обычном классе безопаснее сначала возвращать новый объект.",
        "id": "part-4"
      }
    ],
    "id": "magic-methods",
    "quick": {
      "summary": "Dunder-методы связывают объект со стандартным синтаксисом Python: печатью, сравнением, длиной и операторами.",
      "code": "class Book:\n    def __init__(self, title):\n        self.title = title\n\n    def __str__(self):\n        return f\"Книга: {self.title}\"\n\n    def __eq__(self, other):\n        if not isinstance(other, Book):\n            return NotImplemented\n        return self.title == other.title\n\nbook = Book(\"Мы\")\nprint(book)\nprint(book == Book(\"Мы\"))\nprint(book == \"Мы\")\n# Книга: Мы\n# True\n# False",
      "takeaway": "Реализуйте dunder-метод, только если стандартная операция естественна для объекта. Для обычного действия лучше именованный метод."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "@property",
    "lead": "`property` сохраняет удобный доступ через точку, но выполняет код при чтении или записи значения.",
    "sections": [
      {
        "title": "Проверка любой записи, включая начальную",
        "paragraphs": [
          "Геттер с `@property` выполняется при чтении `product.price`, сеттер — при записи `product.price = value`. Реальное значение обычно хранится в `_price`, чтобы сеттер не вызывал сам себя.",
          "В `__init__` нужно писать `self.price = price`, а не `self._price = price`. Тогда начальное значение проходит через тот же сеттер и не обходит валидацию."
        ],
        "useWhen": [
          "Запись значения требует проверки или преобразования.",
          "Значение вычисляется из других атрибутов.",
          "Нужно сохранить внешний интерфейс `obj.attr` при добавлении логики."
        ],
        "steps": [
          "Создайте геттер с именем публичного атрибута.",
          "Добавьте `@name.setter` с проверкой.",
          "Внутри сеттера сохраните значение в атрибут с подчёркиванием.",
          "В `__init__` присвойте публичное свойство, чтобы запустить проверку."
        ],
        "mistakes": [
          "В сеттере писать `self.price = value` и получить бесконечную рекурсию.",
          "В `__init__` записать `_price` напрямую и пропустить проверку.",
          "Добавлять property к простому полю без логики."
        ],
        "syntax": "@property\ndef price(self):\n    return self._price\n\n@price.setter\ndef price(self, value):\n    if value < 0:\n        raise ValueError(\"...\")\n    self._price = value",
        "example": "class Product:\n    def __init__(self, price):\n        self.price = price\n\n    @property\n    def price(self):\n        return self._price\n\n    @price.setter\n    def price(self, value):\n        if value < 0:\n            raise ValueError(\"Цена не может быть отрицательной\")\n        self._price = value\n\nproduct = Product(100)\nproduct.price = 120\nprint(product.price)\ntry:\n    Product(-1)\nexcept ValueError as error:\n    print(error)\n# 120\n# Цена не может быть отрицательной",
        "template": "@property\ndef attribute(self):\n    return self._attribute\n\n@attribute.setter\ndef attribute(self, value):\n    if value_is_invalid:\n        raise ValueError(\"Некорректное значение\")\n    self._attribute = value",
        "note": "используйте property, когда доступ выглядит как работа со значением, но внутри нужна короткая проверка или вычисление. Сложное действие оформляйте методом.",
        "id": "part-1"
      }
    ],
    "id": "property",
    "quick": {
      "summary": "property сохраняет удобный доступ через точку, но выполняет код при чтении или записи значения.",
      "code": "class Product:\n    def __init__(self, price):\n        self.price = price\n\n    @property\n    def price(self):\n        return self._price\n\n    @price.setter\n    def price(self, value):\n        if value < 0:\n            raise ValueError(\"Цена не может быть отрицательной\")\n        self._price = value\n\nproduct = Product(100)\nproduct.price = 120  # проходит проверку setter\nprint(product.price)  # 120",
      "takeaway": "Используйте property, когда доступ выглядит как работа со значением, но внутри нужна короткая проверка или вычисление. Сложное действие оформляйте методом."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "@classmethod",
    "lead": "`classmethod` получает класс в параметре `cls` и подходит для альтернативного создания объектов и работы с общими данными.",
    "sections": [
      {
        "title": "Метод, которому нужен класс",
        "paragraphs": [
          "После `@classmethod` первым параметром указывают `cls`. Python передаёт туда класс, через который вызван метод, поэтому экземпляр заранее не нужен.",
          "Практический случай — альтернативный конструктор `from_string`: он преобразует другой формат входных данных и вызывает `cls(...)`. Основные правила инициализации при этом остаются в одном `__init__`."
        ],
        "useWhen": [
          "Нужен способ создания `from_string`, `from_dict` или похожий.",
          "Метод читает или меняет атрибут класса."
        ],
        "steps": [
          "Поставьте декоратор `@classmethod`.",
          "Назовите первый параметр `cls`.",
          "Для создания верните `cls(...)`, а не жёстко указанное имя класса."
        ],
        "mistakes": [
          "Использовать `self` и ждать доступ к конкретному объекту.",
          "Писать `Person(...)` вместо `cls(...)` и ломать корректную работу подклассов.",
          "Дублировать проверки из `__init__`."
        ],
        "syntax": "@classmethod\ndef from_string(cls, text):\n    ...\n    return cls(...)",
        "example": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    @classmethod\n    def from_string(cls, text):\n        name, age = text.split(\",\")\n        return cls(name, int(age))\n\nperson = Person.from_string(\"Анна,30\")\nprint(person.name, person.age)\n# Анна 30",
        "template": "@classmethod\ndef from_value(cls, value):\n    prepared = prepare(value)\n    return cls(prepared)",
        "note": "нужен сам класс — `classmethod`; нужен готовый экземпляр — обычный метод; класс и объект не нужны — `staticmethod` или функция.",
        "id": "part-1"
      }
    ],
    "id": "classmethod",
    "quick": {
      "summary": "classmethod получает класс в параметре cls и подходит для альтернативного создания объектов и работы с общими данными.",
      "code": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    @classmethod\n    def from_string(cls, text):\n        name, age = text.split(\",\")\n        return cls(name, int(age))\n\nperson = Person.from_string(\"Анна,30\")\nprint(person.name, person.age)\n# Анна 30",
      "takeaway": "Нужен сам класс — `classmethod`; нужен готовый экземпляр — обычный метод; класс и объект не нужны — `staticmethod` или функция."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "@staticmethod",
    "lead": "`staticmethod` — функция внутри пространства имён класса, которая не получает ни `self`, ни `cls`.",
    "sections": [
      {
        "title": "Связанная по смыслу проверка",
        "paragraphs": [
          "Статический метод получает только явно переданные аргументы. Его размещают в классе, когда функция тесно связана с его предметной областью, но не читает состояние объекта или класса.",
          "Например, проверка формата артикула полезна рядом с `Product`. Если функция полезна многим несвязанным классам, понятнее оставить её на уровне модуля."
        ],
        "useWhen": [
          "Функция относится к классу по смыслу.",
          "Вычислению не нужны атрибуты экземпляра и класса."
        ],
        "steps": [
          "Поставьте `@staticmethod`.",
          "Не добавляйте `self` или `cls`.",
          "Передайте все зависимости обычными аргументами."
        ],
        "mistakes": [
          "Обращаться внутри к `self.attribute` или `cls.attribute`.",
          "Делать статическим метод, которому вскоре понадобится состояние объекта.",
          "Собирать случайные функции в класс `Utils` без общей предметной области."
        ],
        "syntax": "@staticmethod\ndef validate(value):\n    return condition",
        "example": "class Product:\n    @staticmethod\n    def is_valid_sku(value):\n        return len(value) == 6 and value.isalnum()\n\nprint(Product.is_valid_sku(\"A12B34\"))\nprint(Product.is_valid_sku(\"bad!\"))\n# True\n# False",
        "template": "@staticmethod\ndef helper(value):\n    return result",
        "note": "нужны данные объекта — instance method; данные класса — classmethod; нужна только связанная по смыслу функция — staticmethod.",
        "id": "part-1"
      }
    ],
    "id": "staticmethod",
    "quick": {
      "summary": "staticmethod — функция внутри пространства имён класса, которая не получает ни self, ни cls.",
      "code": "class Product:\n    @staticmethod\n    def is_valid_sku(value):\n        return len(value) == 6 and value.isalnum()\n\nprint(Product.is_valid_sku(\"A12B34\"))\nprint(Product.is_valid_sku(\"bad!\"))\n# True\n# False",
      "takeaway": "Нужны данные объекта — instance method; данные класса — classmethod; нужна только связанная по смыслу функция — staticmethod."
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "classes/class",
      "classes/instance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  }
];
