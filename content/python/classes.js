/* Материалы: редактируйте текст и примеры, сохраняйте постоянные id. */
window.PythonBase.content.classes = [
  {
    "title": "Класс",
    "lead": "Класс — это чертёж: он описывает, какие данные хранит объект и что умеет делать.",
    "sections": [
      {
        "title": "Что описывает class",
        "paragraphs": [
          "Класс — это описание, а объект (экземпляр) — конкретная вещь, сделанная по этому описанию. `User` — правила для всех пользователей, а `anna` — один конкретный пользователь.",
          "Имя класса пишут с большой буквы, слова слитно: `User`, `LoginPage`, `OrderItem`. Внутри класса — методы (функции объекта)."
        ],
        "useWhen": [
          "Несколько сущностей имеют одинаковый набор данных и действий.",
          "Нужно хранить состояние между вызовами методов."
        ],
        "steps": [
          "Назовите класс существительным: `User`, `Order`, `Point`.",
          "Решите, какие данные хранит объект и что он умеет делать.",
          "Создайте объект — вызовите класс со скобками: `Lamp()`."
        ],
        "mistakes": [
          "Делать класс ради одной функции, которой не нужно ничего хранить. Это лишняя сложность.",
          "Называть класс глаголом или с маленькой буквы: `check_user` вместо `UserChecker`."
        ],
        "syntax": "class ClassName:\n    def method(self):\n        ...",
        "example": "class Lamp:\n    def turn_on(self):\n        return \"Лампа включена\"\n\nlamp = Lamp()\nprint(lamp.turn_on())",
        "template": "class Thing:\n    def action(self):\n        return \"результат\"",
        "id": "part-1",
        "output": "Лампа включена"
      },
      {
        "title": "Класс и объект — не одно и то же",
        "paragraphs": [
          "`Lamp` — это сам класс (чертёж). `Lamp()` — новый объект (лампа). Из одного класса можно сделать сколько угодно объектов.",
          "`isinstance(объект, Класс)` отвечает на вопрос «этот объект сделан по этому чертежу?»."
        ],
        "syntax": "object = ClassName()\nisinstance(object, ClassName)",
        "example": "class Lamp:\n    pass\n\nlamp = Lamp()\nprint(isinstance(lamp, Lamp))\nprint(lamp is Lamp)",
        "note": "Класс — чертёж и правила. Объект — конкретная вещь со своими данными.",
        "id": "part-2",
        "output": "True\nFalse"
      }
    ],
    "id": "class",
    "quick": {
      "summary": "`class` создаёт свой тип данных. Внутри пишут методы — функции, которые «умеет» объект. Чтобы получить объект, класс вызывают как функцию: `Lamp()`.",
      "code": "class Lamp:\n    def turn_on(self):\n        return \"Лампа включена\"\n\nlamp = Lamp()\nprint(lamp.turn_on())",
      "takeaway": "Берите класс, когда данные и действия над ними — одно целое (пользователь, заказ, страница сайта). Если нужно просто что-то посчитать — хватит обычной функции.",
      "analogy": "Класс — как чертёж лампы на бумаге. По нему можно собрать сколько угодно настоящих ламп (объектов). У каждой лампы есть кнопка «включить» (метод), описанная в чертеже один раз.",
      "output": "Лампа включена"
    },
    "inTests": {
      "text": "В автотестах классы повсюду: тестовые классы pytest (`class TestLogin:`) группируют похожие тесты, а паттерн Page Object описывает каждую страницу сайта отдельным классом.",
      "code": "class LoginPage:\n    def open(self):\n        return \"Открыта страница входа\"\n\nclass TestLogin:\n    def test_page_opens(self):\n        page = LoginPage()\n        assert page.open() == \"Открыта страница входа\""
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
    "lead": "Объект (экземпляр) — конкретная вещь, созданная по классу, со своими данными.",
    "sections": [
      {
        "title": "Создание независимых объектов",
        "paragraphs": [
          "Класс вызывают как функцию: `Counter(5)`. Python создаёт новый объект, настраивает его и кладёт в переменную.",
          "Два вызова — два объекта. Мы прибавили 1 к `first`, а `second` остался 5."
        ],
        "useWhen": [
          "Нужны несколько значений одного типа с разным состоянием.",
          "Объект должен помнить изменения между вызовами."
        ],
        "steps": [
          "Вызовите класс и передайте начальные значения: `Counter(5)`.",
          "Сохраните объект в переменную.",
          "Обращайтесь к данным и методам через точку: `first.value`."
        ],
        "mistakes": [
          "Думать, что `b = a` создаёт копию. Это то же самое, просто под вторым именем.",
          "Сравнивать объекты через `is`, когда важны данные. `is` — «это тот же самый объект?», а `==` — «у них одинаковое содержимое?»."
        ],
        "syntax": "first = ClassName(...)\nsecond = ClassName(...)",
        "example": "class Counter:\n    def __init__(self, value=0):\n        self.value = value\n\nfirst = Counter(5)\nsecond = Counter(5)\nfirst.value += 1\nprint(first.value, second.value)\nprint(first is second)",
        "template": "item = ClassName(...)\nitem.method()",
        "id": "part-1",
        "output": "6 5\nFalse"
      }
    ],
    "id": "instance",
    "quick": {
      "summary": "Каждый вызов класса создаёт новый, отдельный объект. Если поменять данные одного объекта, другой не изменится.",
      "code": "class Counter:\n    def __init__(self, value=0):\n        self.value = value\n\nfirst = Counter(5)\nsecond = Counter(5)\nfirst.value += 1\nprint(first.value, second.value)\nprint(first is second)",
      "takeaway": "`b = a` **не** создаёт новый объект — это второе имя для того же самого. Новый объект появляется только при вызове класса: `Counter()`.",
      "analogy": "Два пирожка из одной формочки: форма (класс) одна, а пирожки разные. Откусили от одного — второй остался целым.",
      "output": "6 5\nFalse"
    },
    "inTests": {
      "text": "Каждый тест должен работать со своим, свежим объектом. Если тесты делят один объект, один тест может «испортить» данные другому. Поэтому объекты создают в фикстурах — pytest вызывает их заново для каждого теста.",
      "code": "import pytest\n\nclass Cart:\n    def __init__(self):\n        self.items = []\n\n@pytest.fixture\ndef cart():\n    return Cart()          # новый объект для каждого теста\n\ndef test_add(cart):\n    cart.items.append(\"book\")\n    assert len(cart.items) == 1\n\ndef test_empty(cart):\n    assert cart.items == []"
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
    "lead": "`self` — это «я сам»: объект, у которого сейчас вызвали метод.",
    "sections": [
      {
        "title": "Как объект попадает в метод",
        "paragraphs": [
          "В описании метода первым параметром пишут `self`. При вызове `account.deposit(50)` Python сам передаёт `account` в `self`, а `50` — в `amount`.",
          "Запись `Account.deposit(account, 25)` делает то же самое, только «вручную». Так видно, откуда берётся `self`. В обычном коде так не пишут."
        ],
        "useWhen": [
          "Методу нужны данные конкретного экземпляра.",
          "Метод изменяет состояние или вызывает другой метод объекта."
        ],
        "steps": [
          "Добавьте `self` первым параметром метода.",
          "Внутри обращайтесь к данным объекта через `self.имя`.",
          "При вызове через точку `self` не передавайте."
        ],
        "mistakes": [
          "Забыть `self` в описании метода. Будет ошибка «takes 1 positional argument but 2 were given».",
          "Написать `balance += amount` вместо `self.balance += amount`. Python не найдёт переменную `balance`."
        ],
        "syntax": "def method(self, value):\n    self.attribute = value",
        "example": "class Account:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\naccount = Account(100)\naccount.deposit(50)\nAccount.deposit(account, 25)\nprint(account.balance)",
        "template": "def method(self, argument):\n    self.attribute = argument",
        "id": "part-1",
        "output": "175"
      }
    ],
    "id": "self",
    "quick": {
      "summary": "Первый параметр любого обычного метода — `self`. Когда вы пишете `account.deposit(50)`, Python сам подставляет `account` в `self`. Через `self` метод добирается до данных своего объекта.",
      "code": "class Account:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\naccount = Account(100)\naccount.deposit(50)\nAccount.deposit(account, 25)\nprint(account.balance)",
      "takeaway": "При вызове `self` не передают — Python сделает это сам. А внутри метода к данным объекта всегда обращаются через `self.`: `self.balance`, а не просто `balance`.",
      "analogy": "`self` — как слово «мой» в речи. Каждый человек говорит «мой рюкзак», но у каждого рюкзак свой. Метод говорит `self.balance` — и берёт баланс именно того счёта, у которого его вызвали.",
      "output": "175"
    },
    "inTests": {
      "text": "В Page Object через `self` страница хранит драйвер браузера и адрес. В тестовых классах pytest первым параметром каждого теста тоже стоит `self`.",
      "code": "class Page:\n    def __init__(self, url):\n        self.url = url\n\n    def full_url(self, path):\n        return self.url + path\n\ndef test_full_url():\n    page = Page(\"https://site.ru\")\n    assert page.full_url(\"/cart\") == \"https://site.ru/cart\""
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
    "lead": "`__init__` задаёт новому объекту стартовые данные.",
    "sections": [
      {
        "title": "Что происходит при создании объекта",
        "paragraphs": [
          "Когда вы пишете `Task(\"Изучить классы\")`, Python сначала создаёт пустой объект, а потом вызывает `__init__`, чтобы его заполнить.",
          "`__init__` не обязателен. Если объекту не нужны стартовые данные, класс работает и без него."
        ],
        "useWhen": [
          "Объекту нужны обязательные или начальные значения.",
          "Нужно сразу привести входные данные к нужному виду."
        ],
        "steps": [
          "Сначала пишите обязательные параметры, потом — со значением по умолчанию.",
          "Сохраните каждое значение через `self`.",
          "Пустые списки и словари создавайте прямо внутри `__init__`."
        ],
        "mistakes": [
          "Писать `return` со значением в `__init__`. Будет ошибка: он должен ничего не возвращать.",
          "Вызывать `__init__` вручную. Python вызывает его сам при создании объекта.",
          "Писать `def __init__(self, tags=[])`. Этот список будет общим для всех объектов."
        ],
        "syntax": "def __init__(self, обязательный, необязательный=значение):\n    self.обязательный = обязательный\n    self.необязательный = необязательный",
        "example": "class Task:\n    def __init__(self, title, done=False):\n        self.title = title\n        self.done = done\n        self.tags = []\n\ntask = Task(\"Изучить классы\")\nprint(task.title, task.done, task.tags)",
        "template": "class Item:\n    def __init__(self, name, active=True):\n        self.name = name\n        self.active = active",
        "id": "part-1",
        "output": "Изучить классы False []"
      }
    ],
    "id": "init",
    "quick": {
      "summary": "`__init__` запускается автоматически, когда вы создаёте объект. В нём записывают начальные данные через `self`: `self.title = title`.",
      "code": "class Task:\n    def __init__(self, title, done=False):\n        self.title = title\n        self.done = done\n        self.tags = []\n\ntask = Task(\"Изучить классы\")\nprint(task.title, task.done, task.tags)",
      "takeaway": "`__init__` ничего не возвращает. Списки и словари создавайте внутри него (`self.tags = []`), тогда у каждого объекта будет свой список.",
      "analogy": "Как настройка нового телефона при первом включении: имя, язык, пустой список контактов. Телефон уже существует, `__init__` только заполняет его стартовыми данными.",
      "output": "Изучить классы False []"
    },
    "inTests": {
      "text": "В Page Object через `__init__` странице передают браузер, с которым она работает. В тестовых данных удобно делать классы-«строители»: `User(name=\"admin\", role=\"admin\")`.",
      "code": "class User:\n    def __init__(self, name, role=\"guest\"):\n        self.name = name\n        self.role = role\n\ndef test_default_role():\n    assert User(\"anna\").role == \"guest\""
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
    "lead": "Данные объекта бывают личные (у каждого свои) и общие (одни на весь класс).",
    "sections": [
      {
        "title": "Где Python ищет атрибут",
        "paragraphs": [
          "Когда вы пишете `boris.role`, Python сначала ищет `role` у самого объекта. Не нашёл — смотрит в классе. Поэтому у `boris` роль `guest` из класса.",
          "`anna.role = \"admin\"` создаёт личный атрибут только у `anna`. Общее значение в классе не меняется."
        ],
        "useWhen": [
          "Экземпляр: имя, баланс, текущий статус и другие личные данные.",
          "Класс: константа, общий счётчик или настройка для всех экземпляров."
        ],
        "steps": [
          "Личные данные записывайте через `self`.",
          "Общие значения объявляйте в теле класса.",
          "Общее значение меняйте через класс: `User.role = ...`."
        ],
        "mistakes": [
          "Положить список в атрибут класса, когда он должен быть личным. Все объекты будут дописывать в один список.",
          "Менять общий счётчик через `self.count += 1`. Вместо изменения общего значения создастся личный атрибут."
        ],
        "syntax": "class User:\n    role = \"guest\"\n\n    def __init__(self, name):\n        self.name = name",
        "example": "class User:\n    role = \"guest\"\n\n    def __init__(self, name):\n        self.name = name\n\nanna = User(\"Анна\")\nboris = User(\"Борис\")\nanna.role = \"admin\"\nprint(anna.role, boris.role, User.role)",
        "template": "class Item:\n    shared = \"общее\"\n\n    def __init__(self, personal):\n        self.personal = personal",
        "id": "part-1",
        "output": "admin guest guest"
      }
    ],
    "id": "attributes",
    "quick": {
      "summary": "Атрибут экземпляра (`self.name`) — личный, у каждого объекта свой. Атрибут класса (`role = \"guest\"` в теле класса) — общий и служит значением по умолчанию.",
      "code": "class User:\n    role = \"guest\"\n\n    def __init__(self, name):\n        self.name = name\n\nanna = User(\"Анна\")\nboris = User(\"Борис\")\nanna.role = \"admin\"\nprint(anna.role, boris.role, User.role)",
      "takeaway": "Разное у объектов — пишите через `self`. Одинаковое для всех — в теле класса. Списки и словари почти всегда должны быть личными.",
      "analogy": "В школьном классе у каждого ученика своё имя (личный атрибут), а номер класса «5Б» — общий для всех (атрибут класса). Если один ученик пришёл в бейджике «староста», у остальных бейджик не поменялся.",
      "output": "admin guest guest"
    },
    "inTests": {
      "text": "Атрибуты класса удобны для общих настроек тестов: базовый адрес сайта, таймаут. Личные — для данных конкретного объекта: логин пользователя, открытая страница.",
      "code": "class BasePage:\n    base_url = \"https://site.ru\"      # общее для всех страниц\n\n    def __init__(self, path):\n        self.path = path                # своё у каждой страницы\n\ndef test_pages_share_base_url():\n    assert BasePage(\"/a\").base_url == BasePage(\"/b\").base_url"
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
    "lead": "Метод — это действие, которое умеет делать объект.",
    "sections": [
      {
        "title": "Методы-действия и методы-вопросы",
        "paragraphs": [
          "Метод — это обычный `def` внутри класса с первым параметром `self`.",
          "Бывают методы-действия (меняют объект, например `deposit`) и методы-вопросы (возвращают ответ через `return`, например `total`). Если вместо `return` написать `print`, результат нельзя будет использовать дальше — например, в `assert`."
        ],
        "useWhen": [
          "Действию нужны атрибуты конкретного объекта.",
          "Правило изменения данных должно всегда выполняться одинаково."
        ],
        "steps": [
          "Назовите метод действием: `deposit`, `close`, `total`.",
          "Сначала проверьте аргументы, потом меняйте данные.",
          "Если ответ нужен снаружи — верните его через `return`."
        ],
        "mistakes": [
          "Забыть `return` и получить `None`.",
          "Сначала поменять данные, а потом проверить аргумент. При ошибке объект уже будет испорчен.",
          "Передавать объект в скобках при вызове через точку: `wallet.deposit(wallet, 50)`."
        ],
        "syntax": "def action(self, value):\n    if value_is_invalid:\n        raise ValueError(\"...\")\n    self.attribute = value",
        "example": "class Wallet:\n    def __init__(self, balance=0):\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        self.balance += amount\n\n    def total(self):\n        return self.balance\n\nwallet = Wallet(100)\nwallet.deposit(50)\nprint(wallet.total())",
        "template": "def method(self, value):\n    if value <= 0:\n        raise ValueError(\"Некорректное значение\")\n    self.attribute += value",
        "id": "part-1",
        "output": "150"
      }
    ],
    "id": "instance-methods",
    "quick": {
      "summary": "Метод экземпляра — функция внутри класса с первым параметром `self`. Он может менять данные объекта (`deposit`) или что-то о нём сообщать (`total`).",
      "code": "class Wallet:\n    def __init__(self, balance=0):\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        self.balance += amount\n\n    def total(self):\n        return self.balance\n\nwallet = Wallet(100)\nwallet.deposit(50)\nprint(wallet.total())",
      "takeaway": "Проверяйте данные **до** изменения объекта. Если метод должен что-то сообщить — используйте `return`, а не `print`.",
      "analogy": "Кошелёк умеет «положить деньги» и «показать сумму». Это и есть его методы. Каждый кошелёк выполняет их со своими деньгами.",
      "output": "150"
    },
    "inTests": {
      "text": "В Page Object каждое действие на странице — отдельный метод: `login()`, `add_to_cart()`, `get_title()`. Тест получается коротким и читается как сценарий.",
      "code": "class CartPage:\n    def __init__(self):\n        self.items = []\n\n    def add(self, item):\n        self.items.append(item)\n\n    def count(self):\n        return len(self.items)\n\ndef test_add_two_items():\n    cart = CartPage()\n    cart.add(\"book\")\n    cart.add(\"pen\")\n    assert cart.count() == 2"
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
    "lead": "Специальные методы с двумя подчёркиваниями учат объект работать с `print`, `==`, `len`, `+` и другими.",
    "sections": [
      {
        "title": "Стандартные операции для своих объектов",
        "paragraphs": [
          "Магические методы обычно не вызывают сами. Их вызывает Python: `print(book)` запускает `book.__str__()`, а `a == b` — `a.__eq__(b)`.",
          "Без `__eq__` два объекта с одинаковыми данными будут считаться разными: Python сравнит, один ли это объект, а не что в нём лежит."
        ],
        "useWhen": [
          "`__str__` — понятный текст для пользователя.",
          "`__repr__` — однозначный вид для разработчика и логов.",
          "`__eq__` — равенство по данным, а не по идентичности."
        ],
        "steps": [
          "Выберите операцию, смысл которой понятен.",
          "Верните значение нужного типа: строку из `__str__`, `True`/`False` из `__eq__`.",
          "Проверьте тип второго объекта, прежде чем читать его данные."
        ],
        "mistakes": [
          "Писать `print(...)` внутри `__str__` вместо `return`.",
          "В `__eq__` сразу читать `other.title`. Если сравнить книгу со строкой, будет ошибка.",
          "Возвращать `False` для чужого типа. Правильнее `NotImplemented` — тогда Python сам разберётся."
        ],
        "syntax": "def __eq__(self, other):\n    if not isinstance(other, type(self)):\n        return NotImplemented\n    return self.value == other.value",
        "example": "class Book:\n    def __init__(self, title):\n        self.title = title\n\n    def __str__(self):\n        return f\"Книга: {self.title}\"\n\n    def __eq__(self, other):\n        if not isinstance(other, Book):\n            return NotImplemented\n        return self.title == other.title\n\nbook = Book(\"Мы\")\nprint(book)\nprint(book == Book(\"Мы\"))\nprint(book == \"Мы\")",
        "template": "def __str__(self):\n    return f\"ClassName({self.attribute})\"\n\ndef __eq__(self, other):\n    if not isinstance(other, ClassName):\n        return NotImplemented\n    return self.attribute == other.attribute",
        "id": "part-1",
        "output": "Книга: Мы\nTrue\nFalse"
      },
      {
        "title": "__str__ и __repr__ — два вида текста",
        "paragraphs": [
          "`__str__` — текст для человека. Его использует `print(obj)`.",
          "`__repr__` — текст для разработчика. Его видно в логах, в отладчике и когда объект лежит в списке. Хороший `__repr__` похож на код создания объекта: `Book('Мы')`."
        ],
        "useWhen": [
          "`__str__` — объект показывают пользователю.",
          "`__repr__` — объект попадает в логи, консоль или коллекции."
        ],
        "mistakes": [
          "Печатать внутри метода вместо `return`.",
          "Показывать в тексте пароль, токен и другие секретные данные.",
          "Делать `__repr__` огромным и нечитаемым."
        ],
        "syntax": "def __str__(self):\n    return \"понятный текст\"\n\ndef __repr__(self):\n    return \"ClassName(...)\"",
        "example": "class Book:\n    def __init__(self, title):\n        self.title = title\n\n    def __str__(self):\n        return f\"Книга «{self.title}»\"\n\n    def __repr__(self):\n        return f\"Book({self.title!r})\"\n\nbook = Book(\"Мы\")\nprint(book)\nprint([book])",
        "note": "Если `__str__` нет, `print` использует `__repr__`. А в списке объекты всегда показываются через `__repr__`.",
        "id": "part-2",
        "output": "Книга «Мы»\n[Book('Мы')]"
      },
      {
        "title": "__len__, __iter__ и __contains__ — объект как коллекция",
        "paragraphs": [
          "`len(obj)` вызывает `__len__`, цикл `for` — `__iter__`, проверка `x in obj` — `__contains__`. Обычно эти методы просто передают работу списку внутри объекта.",
          "Так объект можно перебирать циклом, как список, но сам список остаётся спрятанным внутри."
        ],
        "useWhen": [
          "Объект по смыслу является контейнером или коллекцией.",
          "Нужно поддержать `len`, `for` или `in`."
        ],
        "steps": [
          "`__len__` возвращает целое число от 0.",
          "`__iter__` возвращает итератор: `iter(self.items)`.",
          "`__contains__` возвращает `True` или `False`."
        ],
        "mistakes": [
          "Возвращать из `__iter__` сам список вместо `iter(список)`.",
          "Делать «коллекцией» объект, который по смыслу ею не является."
        ],
        "syntax": "def __len__(self):\n    return len(self.items)\n\ndef __iter__(self):\n    return iter(self.items)\n\ndef __contains__(self, item):\n    return item in self.items",
        "example": "class Playlist:\n    def __init__(self, tracks):\n        self._tracks = list(tracks)\n\n    def __len__(self):\n        return len(self._tracks)\n\n    def __iter__(self):\n        return iter(self._tracks)\n\n    def __contains__(self, track):\n        return track in self._tracks\n\nplaylist = Playlist([\"Intro\", \"Finale\"])\nprint(len(playlist))\nprint(\"Finale\" in playlist)\nprint(list(playlist))",
        "template": "def __len__(self):\n    return len(self._items)\n\ndef __iter__(self):\n    return iter(self._items)",
        "id": "part-3",
        "output": "2\nTrue\n['Intro', 'Finale']"
      },
      {
        "title": "Операторы: + и сравнения",
        "paragraphs": [
          "`a + b` вызывает `a.__add__(b)`, `a < b` — `a.__lt__(b)`. Обычно `__add__` возвращает **новый** объект и не меняет старые.",
          "Если сложить с объектом такого типа нельзя, верните `NotImplemented`. Python покажет понятную ошибку `TypeError`."
        ],
        "useWhen": [
          "Оператор имеет однозначный смысл для вашей сущности.",
          "Такой синтаксис делает код короче и понятнее именованного метода."
        ],
        "mistakes": [
          "Менять левый объект внутри `__add__`. После `c = a + b` значение `a` неожиданно поменяется.",
          "Придумывать оператору смысл, который нельзя угадать.",
          "Читать данные второго объекта без проверки его типа."
        ],
        "syntax": "def __add__(self, other):\n    if not isinstance(other, type(self)):\n        return NotImplemented\n    return type(self)(self.value + other.value)",
        "example": "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n\n    def __add__(self, other):\n        if not isinstance(other, Money):\n            return NotImplemented\n        return Money(self.amount + other.amount)\n\n    def __repr__(self):\n        return f\"Money({self.amount})\"\n\nfirst = Money(100)\ntotal = first + Money(50)\nprint(first, total)",
        "note": "Для изменения «на месте» (`a += b`) есть отдельный `__iadd__`, но в обычных классах проще возвращать новый объект.",
        "id": "part-4",
        "output": "Money(100) Money(150)"
      }
    ],
    "id": "magic-methods",
    "quick": {
      "summary": "Методы вида `__имя__` («магические», или dunder) Python вызывает сам. `print(book)` вызывает `__str__`, `book == other` вызывает `__eq__`, `len(obj)` — `__len__`.",
      "code": "class Book:\n    def __init__(self, title):\n        self.title = title\n\n    def __str__(self):\n        return f\"Книга: {self.title}\"\n\n    def __eq__(self, other):\n        if not isinstance(other, Book):\n            return NotImplemented\n        return self.title == other.title\n\nbook = Book(\"Мы\")\nprint(book)\nprint(book == Book(\"Мы\"))\nprint(book == \"Мы\")",
      "takeaway": "Добавляйте магический метод, только если операция понятна без объяснений. Сравнить две книги — понятно. Сложить две книги — странно, лучше обычный метод.",
      "analogy": "Это как научить игрушку реагировать на стандартные кнопки пульта. Пульт (`print`, `==`, `len`) один для всех, а что произойдёт при нажатии — вы описываете сами.",
      "output": "Книга: Мы\nTrue\nFalse"
    },
    "inTests": {
      "text": "`__eq__` очень важен для тестов: благодаря ему `assert actual == expected` сравнивает объекты по данным. А хороший `__repr__` делает сообщение об упавшем тесте понятным.",
      "code": "class User:\n    def __init__(self, name):\n        self.name = name\n\n    def __eq__(self, other):\n        return isinstance(other, User) and self.name == other.name\n\n    def __repr__(self):\n        return f\"User({self.name!r})\"\n\ndef test_users_equal():\n    assert User(\"anna\") == User(\"anna\")"
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
    "lead": "`@property` позволяет проверять значение, когда его записывают через точку.",
    "sections": [
      {
        "title": "Проверка при каждой записи",
        "paragraphs": [
          "Метод с `@property` срабатывает, когда значение **читают**: `product.price`. Метод с `@price.setter` — когда значение **записывают**: `product.price = 120`.",
          "Само число хранится в `_price`. Если в сеттере написать `self.price = value`, сеттер будет вызывать сам себя бесконечно.",
          "В `__init__` пишем `self.price = price`, а не `self._price`. Тогда даже стартовая цена проходит проверку — `Product(-1)` вызовет ошибку."
        ],
        "useWhen": [
          "Запись значения требует проверки или преобразования.",
          "Значение вычисляется из других атрибутов.",
          "Нужно сохранить внешний интерфейс `obj.attr` при добавлении логики."
        ],
        "steps": [
          "Сделайте метод с `@property` — он возвращает `self._price`.",
          "Добавьте `@price.setter` с проверкой.",
          "В сеттере сохраните значение в `self._price`.",
          "В `__init__` присвойте `self.price`, чтобы сработала проверка."
        ],
        "mistakes": [
          "В сеттере написать `self.price = value` — бесконечная рекурсия.",
          "В `__init__` записать `self._price` напрямую — проверка пропускается.",
          "Делать `property` для поля без всякой логики. Обычного атрибута достаточно."
        ],
        "syntax": "@property\ndef price(self):\n    return self._price\n\n@price.setter\ndef price(self, value):\n    if value < 0:\n        raise ValueError(\"...\")\n    self._price = value",
        "example": "class Product:\n    def __init__(self, price):\n        self.price = price\n\n    @property\n    def price(self):\n        return self._price\n\n    @price.setter\n    def price(self, value):\n        if value < 0:\n            raise ValueError(\"Цена не может быть отрицательной\")\n        self._price = value\n\nproduct = Product(100)\nproduct.price = 120\nprint(product.price)\ntry:\n    Product(-1)\nexcept ValueError as error:\n    print(error)",
        "template": "@property\ndef attribute(self):\n    return self._attribute\n\n@attribute.setter\ndef attribute(self, value):\n    if value_is_invalid:\n        raise ValueError(\"Некорректное значение\")\n    self._attribute = value",
        "id": "part-1",
        "output": "120\nЦена не может быть отрицательной"
      }
    ],
    "id": "property",
    "quick": {
      "summary": "С `@property` запись `product.price = 120` выглядит как обычное присваивание, но на самом деле вызывает ваш код — например, проверку, что цена не отрицательная.",
      "code": "class Product:\n    def __init__(self, price):\n        self.price = price\n\n    @property\n    def price(self):\n        return self._price\n\n    @price.setter\n    def price(self, value):\n        if value < 0:\n            raise ValueError(\"Цена не может быть отрицательной\")\n        self._price = value\n\nproduct = Product(100)\nproduct.price = 120  # проходит проверку setter\nprint(product.price)",
      "takeaway": "Настоящее значение храните в `self._price` (с подчёркиванием). В `__init__` пишите `self.price = price` — так стартовое значение тоже пройдёт проверку.",
      "analogy": "Как банкомат вместо открытого сейфа: снаружи вы просто «берёте деньги», а внутри банкомат проверяет карту и лимит. Пользоваться так же просто, но защищено.",
      "output": "120"
    },
    "inTests": {
      "text": "Через `property` в Page Object удобно делать «поля» страницы: `page.title` или `page.error_text` выглядят как атрибуты, а на самом деле каждый раз читают актуальное значение со страницы.",
      "code": "class LoginPage:\n    def __init__(self):\n        self._errors = [\"Неверный пароль\"]\n\n    @property\n    def error_text(self):\n        return self._errors[-1]\n\ndef test_error_shown():\n    assert LoginPage().error_text == \"Неверный пароль\""
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
    "lead": "`@classmethod` — метод класса. Чаще всего это «другой способ создать объект».",
    "sections": [
      {
        "title": "Метод, которому нужен класс, а не объект",
        "paragraphs": [
          "Над методом ставят `@classmethod`, первый параметр называют `cls`. Python передаёт туда сам класс, поэтому объект заранее создавать не нужно: `Person.from_string(...)`.",
          "`from_string` разбирает строку `\"Анна,30\"` и вызывает обычный конструктор `cls(name, int(age))`. Вся проверка данных остаётся в одном месте — в `__init__`."
        ],
        "useWhen": [
          "Нужен способ создания `from_string`, `from_dict` или похожий.",
          "Метод читает или меняет атрибут класса."
        ],
        "steps": [
          "Поставьте `@classmethod`.",
          "Первый параметр назовите `cls`.",
          "Создайте и верните объект: `return cls(...)`."
        ],
        "mistakes": [
          "Ждать, что в `classmethod` есть данные конкретного объекта. Их нет — там только класс.",
          "Писать `Person(...)` вместо `cls(...)`. Наследники будут получать объект не того класса.",
          "Повторять проверки из `__init__`. Просто вызовите `cls(...)` — проверки сработают сами."
        ],
        "syntax": "@classmethod\ndef from_string(cls, text):\n    ...\n    return cls(...)",
        "example": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    @classmethod\n    def from_string(cls, text):\n        name, age = text.split(\",\")\n        return cls(name, int(age))\n\nperson = Person.from_string(\"Анна,30\")\nprint(person.name, person.age)",
        "template": "@classmethod\ndef from_value(cls, value):\n    prepared = prepare(value)\n    return cls(prepared)",
        "id": "part-1",
        "output": "Анна 30"
      }
    ],
    "id": "classmethod",
    "quick": {
      "summary": "Метод с `@classmethod` получает не объект, а сам класс — в параметр `cls`. Главное применение — создать объект из данных в другом формате: строки, словаря, файла.",
      "code": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    @classmethod\n    def from_string(cls, text):\n        name, age = text.split(\",\")\n        return cls(name, int(age))\n\nperson = Person.from_string(\"Анна,30\")\nprint(person.name, person.age)",
      "takeaway": "Внутри создавайте объект через `cls(...)`, а не через имя класса. Тогда метод правильно сработает и у классов-наследников.",
      "analogy": "Обычный конструктор — заказать пиццу, назвав все ингредиенты. `from_string` — отдать готовый чек «Маргарита,30», и пиццерия сама разберёт его и сделает ту же пиццу.",
      "output": "Анна 30"
    },
    "inTests": {
      "text": "Удобно для тестовых данных: `User.from_dict(json_from_api)` превращает ответ сервера в объект, с которым приятно работать в проверках.",
      "code": "class User:\n    def __init__(self, name, age):\n        self.name, self.age = name, age\n\n    @classmethod\n    def from_dict(cls, data):\n        return cls(data[\"name\"], data[\"age\"])\n\ndef test_user_from_api():\n    response = {\"name\": \"anna\", \"age\": 30}\n    user = User.from_dict(response)\n    assert user.age == 30"
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
    "lead": "`@staticmethod` — обычная функция, которую положили в класс, потому что она с ним связана.",
    "sections": [
      {
        "title": "Связанная по смыслу проверка",
        "paragraphs": [
          "Статический метод получает только то, что передали в скобках. В класс его кладут, когда он по смыслу относится к этому классу, но не трогает его данные.",
          "Проверка артикула полезна рядом с `Product`. А если функция нужна многим разным классам — лучше сделать её обычной функцией вне класса."
        ],
        "useWhen": [
          "Функция относится к классу по смыслу.",
          "Вычислению не нужны атрибуты экземпляра и класса."
        ],
        "steps": [
          "Поставьте `@staticmethod`.",
          "Не пишите `self` или `cls`.",
          "Всё, что нужно функции, передавайте аргументами."
        ],
        "mistakes": [
          "Обращаться внутри к `self.что-то` — `self` здесь нет.",
          "Делать статическим метод, которому скоро понадобятся данные объекта.",
          "Складывать случайные функции в класс `Utils`, не связанные общей темой."
        ],
        "syntax": "@staticmethod\ndef validate(value):\n    return condition",
        "example": "class Product:\n    @staticmethod\n    def is_valid_sku(value):\n        return len(value) == 6 and value.isalnum()\n\nprint(Product.is_valid_sku(\"A12B34\"))\nprint(Product.is_valid_sku(\"bad!\"))",
        "template": "@staticmethod\ndef helper(value):\n    return result",
        "id": "part-1",
        "output": "True\nFalse"
      }
    ],
    "id": "staticmethod",
    "quick": {
      "summary": "Статический метод не получает ни `self`, ни `cls`. Он работает только с тем, что передали в скобках. Вызывать можно прямо через класс: `Product.is_valid_sku(\"A12B34\")`.",
      "code": "class Product:\n    @staticmethod\n    def is_valid_sku(value):\n        return len(value) == 6 and value.isalnum()\n\nprint(Product.is_valid_sku(\"A12B34\"))\nprint(Product.is_valid_sku(\"bad!\"))",
      "takeaway": "Нужны данные объекта — обычный метод (`self`). Нужен класс — `@classmethod` (`cls`). Не нужно ни то, ни другое — `@staticmethod` или функция вне класса.",
      "analogy": "Как линейка, которая лежит в пенале. Ей всё равно, чей это пенал и что в нём ещё лежит, — она просто меряет. Но хранить её удобно рядом с остальными школьными вещами.",
      "output": "True\nFalse"
    },
    "inTests": {
      "text": "Хорошо подходит для маленьких помощников внутри Page Object или класса с тестовыми данными: проверить формат email, сгенерировать уникальный логин.",
      "code": "class TestData:\n    @staticmethod\n    def email(name):\n        return f\"{name}@test.ru\"\n\ndef test_email_format():\n    assert TestData.email(\"anna\") == \"anna@test.ru\""
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
