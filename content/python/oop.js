/* Материалы: редактируйте текст и примеры, сохраняйте постоянные id. */
window.PythonBase.content.oop = [
  {
    "title": "Инкапсуляция",
    "lead": "Объект сам следит за своими данными и не даёт их испортить.",
    "sections": [
      {
        "title": "Зачем прятать данные",
        "paragraphs": [
          "Инкапсуляция — это когда данные и методы, которые с ними работают, живут в одном классе. Снаружи пользуются простыми методами, а как всё устроено внутри — знает только класс.",
          "Посмотрите на пример: любой может записать на счёт `-500`, и класс даже не узнает. Ошибки нет, но данные испорчены. Ниже — способы это исправить."
        ],
        "useWhen": [
          "У значения есть ограничения: сумма положительна, статус допустим, дата корректна.",
          "Внутреннее хранение может измениться, а публичный интерфейс нужно сохранить."
        ],
        "steps": [
          "Решите, какие данные объект должен защищать.",
          "Дайте снаружи понятные методы и свойства.",
          "Проверяйте новое значение до того, как его сохранить."
        ],
        "mistakes": [
          "Проверять данные где-то снаружи, а не в самом классе.",
          "Разрешать менять внутренние поля напрямую."
        ],
        "syntax": "account.balance = -500   # ничто не мешает испортить данные",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\naccount = BankAccount(100)\naccount.balance = -500\nprint(f\"Некорректный баланс: {account.balance}\")",
        "template": "class Model:\n    def __init__(self, value):\n        self.value = value\n\n    def change(self, value):\n        if value_is_invalid:\n            raise ValueError(\"Некорректное значение\")\n        self.value = value",
        "note": "Ошибки не случилось, но счёт с минусом существовать не должен.",
        "id": "part-1",
        "output": "Некорректный баланс: -500"
      },
      {
        "title": "Одно подчёркивание: «внутреннее, не трогай»",
        "paragraphs": [
          "`_balance` с одним подчёркиванием — это просто договорённость между программистами: «это внутренняя деталь, снаружи не используйте». Python при этом ничего не запрещает.",
          "Опираться на такое поле снаружи опасно: автор класса может переименовать его в любой момент."
        ],
        "syntax": "self._protected = \"Защищённый\"",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self._protected = \"Защищённый\"\n        self._balance = balance\n\n    def get_balance(self):\n        return self._balance\n\nacc = BankAccount(100)\nprint(acc.get_balance())\nprint(acc._protected)",
        "id": "part-2",
        "output": "100\nЗащищённый"
      },
      {
        "title": "Два подчёркивания: имя «прячется»",
        "paragraphs": [
          "С двумя подчёркиваниями (`__private`) Python тайно переименовывает поле в `_BankAccount__private`. Поэтому `account.__private` снаружи выдаст ошибку.",
          "Но это не замок: по новому имени поле всё равно доступно. Главная польза — поле не перепутается с полем с таким же именем у класса-наследника."
        ],
        "syntax": "self.__private = balance\n# снаружи: объект._BankAccount__private",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self.__private = balance\n\n    def get_balance(self):\n        return self.__private\n\naccount = BankAccount(100)\nprint(account.get_balance())\nprint(account._BankAccount__private)",
        "note": "Пароли так не прячут — это не защита. Обращаться к `_Класс__поле` снаружи не нужно.",
        "id": "part-3",
        "output": "100\n100"
      },
      {
        "title": "Правильный доступ — через property",
        "paragraphs": [
          "Данные спрятали — теперь их нужно как-то читать и менять. В Python для этого есть `@property`: снаружи выглядит как обычное поле, а внутри работает проверка.",
          "В `__init__` пишите `self.balance = balance`, а не `self._balance`. Тогда стартовое значение тоже пройдёт проверку."
        ],
        "useWhen": [
          "Нужна удобная запись `object.value`, но чтение или запись требуют логики."
        ],
        "steps": [
          "Метод с `@property` возвращает внутреннее значение.",
          "Сеттер проверяет данные и только потом сохраняет их.",
          "Конструктор присваивает через свойство — и проверка срабатывает сразу."
        ],
        "mistakes": [
          "Писать в `__init__` прямо в `_balance` — проверка пропускается.",
          "В сеттере писать `self.balance = value` — сеттер вызывает сам себя бесконечно."
        ],
        "syntax": "@property\ndef balance(self):\n    return self._balance\n\n@balance.setter\ndef balance(self, value):\n    ...",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    @balance.setter\n    def balance(self, value):\n        if value < 0:\n            raise ValueError(\"Баланс не может быть отрицательным\")\n        self._balance = value\n\naccount = BankAccount(100)\nprint(f\"Баланс: {account.balance}\")\ntry:\n    BankAccount(-1)\nexcept ValueError as error:\n    print(f\"Ошибка: {error}\")",
        "template": "class Model:\n    def __init__(self, value):\n        self.value = value\n\n    @property\n    def value(self):\n        return self._value\n\n    @value.setter\n    def value(self, value):\n        if value_is_invalid:\n            raise ValueError(\"Некорректное значение\")\n        self._value = value",
        "id": "part-4",
        "output": "Баланс: 100\nОшибка: Баланс не может быть отрицательным"
      }
    ],
    "id": "encapsulation",
    "quick": {
      "summary": "Инкапсуляция — данные объекта меняются только через его методы, а методы проверяют, что значение правильное. Внутренние поля помечают подчёркиванием: `_value`.",
      "code": "class Counter:\n    def __init__(self):\n        self._value = 0\n\n    @property\n    def value(self):\n        return self._value\n\n    def add(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Ожидали положительное число\")\n        self._value += amount\n\ncounter = Counter()\ncounter.add(2)\nprint(counter.value)",
      "takeaway": "Меняйте данные через методы (`add`), читайте через свойства (`value`). Подчёркивание — договорённость «не трогай», а не замок: Python доступ не запрещает.",
      "analogy": "Как кофемашина: вы нажимаете кнопку «капучино» (метод), а не лезете руками внутрь к бойлеру и трубкам (внутренние данные). Машина сама проследит, чтобы не налить кипяток мимо чашки.",
      "output": "2"
    },
    "inTests": {
      "text": "В Page Object инкапсуляция — главный принцип: тест не знает, какие там локаторы и кнопки, он вызывает понятные методы `login(user)`. Поменялась вёрстка — правите один класс страницы, а не сотню тестов.",
      "code": "class LoginPage:\n    _login_button = \"#submit\"          # внутренняя деталь\n\n    def login(self, user):\n        return f\"click {self._login_button} as {user}\"\n\ndef test_login():\n    assert \"admin\" in LoginPage().login(\"admin\")"
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "oop/inheritance",
      "oop/multiple-inheritance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Наследование",
    "lead": "Сделать новый класс на основе существующего и взять всё готовое.",
    "sections": [
      {
        "title": "Наследник получает всё от родителя",
        "paragraphs": [
          "У `Dog` нет своего кода (`pass`), но метод `eat` работает — он взят у `Animal`. Python ищет метод сначала в классе объекта, а не найдя — у родителя.",
          "Наследуйтесь только когда верно «является»: собака является животным и может быть везде, где ждут животное. Наследование «ради пары готовых строчек» обычно приводит к путанице."
        ],
        "useWhen": [
          "Наследник действительно является частным случаем базового типа.",
          "Его можно подставить вместо родителя без изменения смысла программы."
        ],
        "steps": [
          "Python ищет метод сначала в классе объекта, потом у родителей.",
          "Наследник получает все методы и может заменить любой из них.",
          "`isinstance(dog, Animal)` — `True`: собака считается и животным тоже."
        ],
        "mistakes": [
          "Наследоваться только ради нескольких строк кода.",
          "Строить длинные цепочки наследования, где объекты на самом деле не похожи."
        ],
        "syntax": "class Dog(Animal):\n    ...",
        "example": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def eat(self):\n        print(f\"{self.name} ест\")\n\nclass Dog(Animal):\n    pass\n\ndog = Dog(\"Рекс\")\ndog.eat()\nprint(f\"Рекс — животное: {isinstance(dog, Animal)}\")",
        "template": "class Base:\n    def action(self):\n        return \"общее поведение\"\n\nclass Child(Base):\n    def own_action(self):\n        return \"своё поведение\"",
        "id": "part-1",
        "output": "Рекс ест\nРекс — животное: True"
      },
      {
        "title": "Свой вариант метода",
        "paragraphs": [
          "В наследнике можно написать то, чего у родителя нет: собака умеет лаять.",
          "Если имя метода совпало с родительским, сработает версия наследника. Это называется **переопределение**: Python нашёл метод у собаки и дальше не ищет."
        ],
        "syntax": "class Dog(Animal):\n    def voice(self):\n        print(\"Гав!\")",
        "example": "class Animal:\n    def voice(self):\n        print(\"Какой-то звук\")\n\nclass Dog(Animal):\n    def voice(self):\n        print(\"Гав!\")\n\nAnimal().voice()\nDog().voice()",
        "id": "part-2",
        "output": "Какой-то звук\nГав!"
      },
      {
        "title": "super(): дополнить, а не заменить",
        "paragraphs": [
          "Если написать в наследнике свой `__init__`, родительский **не вызовется** — и поле `name` не появится.",
          "`super().__init__(name)` говорит: «сначала сделай то, что делает родитель». После этого наследник добавляет своё — `self.breed`."
        ],
        "syntax": "def __init__(self, name, breed):\n    super().__init__(name)   # работа родителя\n    self.breed = breed       # своё",
        "example": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\nrex = Dog(\"Рекс\", \"корги\")\nprint(rex.name, rex.breed)",
        "id": "part-3",
        "output": "Рекс корги"
      },
      {
        "title": "Проверка «является»",
        "paragraphs": [
          "Объект наследника одновременно считается и объектом родителя: `isinstance(rex, Animal)` — `True`.",
          "Отсюда правило: читайте наследование словом «является». Собака является животным — верно. Машина является двигателем — нет, хотя метод `start()` хочется взять готовым. В таком случае двигатель кладут внутрь машины — это композиция (следующий раздел)."
        ],
        "syntax": "isinstance(объект, Родитель)",
        "example": "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nrex = Dog()\nprint(isinstance(rex, Dog))\nprint(isinstance(rex, Animal))\nprint(Dog.__bases__)",
        "id": "part-4",
        "output": "True\nTrue\n(<class '__main__.Animal'>,)"
      },
      {
        "title": "Композиция: объект внутри объекта",
        "paragraphs": [
          "Машине нужен двигатель, но машина — не двигатель. Поэтому объект `Engine` хранят внутри `Car` как поле, и машина просит двигатель завестись.",
          "Это отношение «**имеет**»: машина имеет двигатель. Плюс такого подхода — двигатель легко заменить на другой."
        ],
        "useWhen": [
          "Один объект использует другой как часть или сервис.",
          "Зависимость нужно отдельно настраивать, заменять или тестировать."
        ],
        "steps": [
          "Передайте нужный объект в конструктор.",
          "Сохраните его в поле: `self.engine = engine`.",
          "Поручайте ему работу: `self.engine.start()`."
        ],
        "mistakes": [
          "Писать `class Car(Engine)` только чтобы получить метод `start`.",
          "Создавать двигатель жёстко внутри класса, когда его нужно подменять (например, в тестах)."
        ],
        "syntax": "class Car:\n    def __init__(self, engine):\n        self.engine = engine",
        "example": "class Engine:\n    def start(self):\n        return \"двигатель запущен\"\n\nclass Car:\n    def __init__(self, engine):\n        self.engine = engine\n\n    def start(self):\n        print(f\"Автомобиль: {self.engine.start()}\")\n\nCar(Engine()).start()",
        "template": "class Client:\n    def __init__(self, service):\n        self.service = service\n\n    def run(self):\n        return self.service.action()",
        "note": "«Является» — наследование. «Имеет» или «использует» — композиция. Сомневаетесь — начните с композиции.",
        "id": "part-5",
        "output": "Автомобиль: двигатель запущен"
      }
    ],
    "id": "inheritance",
    "quick": {
      "summary": "`class Dog(Animal):` — собака получает все методы животного. Свои методы можно добавить, а родительские — заменить. Наследование подходит, когда верна фраза «Собака **является** животным».",
      "code": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def eat(self):\n        print(f\"{self.name} ест\")\n\nclass Dog(Animal):\n    pass\n\ndog = Dog(\"Рекс\")\ndog.eat()\nprint(f\"Рекс — животное: {isinstance(dog, Animal)}\")",
      "takeaway": "Проверка простая: «X является Y?». Собака является животным — наследование. Машина является двигателем? Нет — машина **имеет** двигатель, это композиция.",
      "analogy": "Как рецепт «блины с начинкой» на основе рецепта «блины»: всё тесто и жарка берутся из базового рецепта, а вы только добавляете начинку. Переписывать рецепт теста заново не нужно.",
      "output": "Рекс ест\nРекс — животное: True"
    },
    "inTests": {
      "text": "В автотестах почти всегда есть `BasePage` — общий родитель всех страниц с методами `open()`, `wait()`, `screenshot()`. Каждая страница наследуется от него и добавляет только своё.",
      "code": "class BasePage:\n    url = \"https://site.ru\"\n\n    def open(self, path=\"\"):\n        return self.url + path\n\nclass CartPage(BasePage):\n    def open_cart(self):\n        return self.open(\"/cart\")\n\ndef test_cart_url():\n    assert CartPage().open_cart() == \"https://site.ru/cart\""
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "oop/mro",
      "oop/polymorphism"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Множественное наследование",
    "lead": "Класс с несколькими родителями. Продвинутая тема — встречается реже.",
    "sections": [
      {
        "title": "Несколько родителей через запятую",
        "paragraphs": [
          "Родителей перечисляют через запятую. Класс получает методы каждого из них, даже если своего кода у него нет.",
          "На практике так подключают маленькие миксины. Для больших самостоятельных частей понятнее композиция."
        ],
        "useWhen": [
          "Фреймворк уже использует кооперативные mixins.",
          "Каждая примесь мала и добавляет одну чёткую возможность."
        ],
        "steps": [
          "Python выстраивает всех родителей в одну очередь (MRO).",
          "Метод ищется по этой очереди до первого совпадения.",
          "Методы, которые должны сработать у всех родителей, передают вызов дальше через `super()`."
        ],
        "mistakes": [
          "Смешивать большие классы ради готового кода.",
          "Не проверять, нет ли у родителей методов с одинаковыми именами.",
          "Забывать, что порядок родителей в скобках влияет на результат."
        ],
        "syntax": "class Pegasus(Horse, Bird):\n    pass",
        "example": "class SaveMixin:\n    def save(self):\n        print(f\"Сохранено: {self.name}\")\n\nclass Product:\n    def __init__(self, name):\n        self.name = name\n\nclass SavedProduct(SaveMixin, Product):\n    pass\n\nSavedProduct(\"Книга\").save()",
        "template": "class FeatureMixin:\n    def feature(self):\n        return \"дополнительная возможность\"\n\nclass Model(FeatureMixin, BaseModel):\n    pass",
        "id": "part-1",
        "output": "Сохранено: Книга"
      },
      {
        "title": "Миксины (примеси)",
        "paragraphs": [
          "Миксин — маленький класс-добавка с одной способностью. Например, `JsonMixin` умеет превращать объект в JSON-строку.",
          "Миксин не создают отдельно — он не самостоятельная вещь. Его просто дописывают в скобки к нужному классу."
        ],
        "syntax": "class User(JsonMixin):\n    ...",
        "example": "import json\n\nclass JsonMixin:\n    def to_json(self):\n        return json.dumps(self.__dict__, ensure_ascii=False)\n\nclass User(JsonMixin):\n    def __init__(self, name):\n        self.name = name\n\nprint(User(\"Аня\").to_json())",
        "id": "part-2",
        "output": "{\"name\": \"Аня\"}"
      },
      {
        "title": "Конфликт одинаковых имён",
        "paragraphs": [
          "Если у двух родителей есть методы с одинаковым именем, сработает тот, что найдётся первым. В `C(A, B)` это метод из `A`.",
          "Python ищет не случайно, а по специальной очереди классов — MRO. Ей посвящена следующая тема."
        ],
        "syntax": "class C(A, B):\n    pass",
        "example": "class A:\n    def method(self):\n        print(\"Метод из A\")\n\nclass B:\n    def method(self):\n        print(\"Метод из B\")\n\nclass C(A, B):\n    pass\n\nC().method()",
        "note": "«Побеждает левый родитель» — упрощение. Точный порядок всегда показывает `C.mro()`.",
        "id": "part-3",
        "output": "Метод из A"
      }
    ],
    "id": "multiple-inheritance",
    "quick": {
      "summary": "В скобках можно перечислить несколько родителей: `class SavedProduct(SaveMixin, Product)`. Класс получит методы всех. Чаще всего так подключают маленькие «добавки» — миксины.",
      "code": "class SaveMixin:\n    def save(self):\n        print(f\"Сохранено: {self.name}\")\n\nclass Product:\n    def __init__(self, name):\n        self.name = name\n\nclass SavedProduct(SaveMixin, Product):\n    pass\n\nSavedProduct(\"Книга\").save()",
      "takeaway": "Используйте только для маленьких миксинов с одной задачей. Если нужна целая отдельная вещь — подключайте её композицией (полем).",
      "analogy": "Как собрать бутерброд: основа — хлеб (главный класс), а сверху добавки — сыр, ветчина (миксины). Каждая добавка даёт одно новое свойство, но сама по себе бутербродом не является.",
      "output": "Сохранено: Книга"
    },
    "inTests": {
      "text": "В тестовых фреймворках миксины добавляют страницам общие умения: «умеет делать скриншот», «умеет ждать загрузку». Каждый миксин — одна способность.",
      "code": "class ScreenshotMixin:\n    def screenshot(self):\n        return f\"screenshot of {self.name}\"\n\nclass Page:\n    def __init__(self, name):\n        self.name = name\n\nclass MainPage(ScreenshotMixin, Page):\n    pass\n\ndef test_screenshot():\n    assert MainPage(\"main\").screenshot() == \"screenshot of main\""
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "oop/encapsulation",
      "oop/inheritance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "MRO",
    "lead": "Порядок, в котором Python ищет метод у класса и его родителей. Продвинутая тема.",
    "sections": [
      {
        "title": "Очередь поиска метода",
        "paragraphs": [
          "Когда вы вызываете метод, Python идёт по списку классов и берёт первый, где этот метод есть. Этот список и называется MRO.",
          "Сам класс всегда первый, `object` — последний. Для `C(A, B)` очередь `C → A → B → object`. В сложных иерархиях порядок вычисляет специальный алгоритм, поэтому проверяйте его через `mro()`."
        ],
        "useWhen": [
          "Нужно объяснить выбор метода при множественном наследовании.",
          "Нужно отладить кооперативную цепочку `super()`."
        ],
        "steps": [
          "Поиск начинается с класса самого объекта.",
          "Python идёт по `mro()` до первого совпадения.",
          "`object` — последний в любой очереди."
        ],
        "mistakes": [
          "Смотреть только на ближайших родителей и не учитывать дальних.",
          "Менять порядок родителей в скобках и не проверять новую очередь."
        ],
        "syntax": "print(C.mro())",
        "example": "class A:\n    def method(self):\n        print(\"Метод из A\")\n\nclass B:\n    def method(self):\n        print(\"Метод из B\")\n\nclass C(A, B):\n    pass\n\nC().method()\nprint([cls.__name__ for cls in C.mro()])",
        "template": "for cls in Model.mro():\n    print(cls.__name__)",
        "id": "part-1",
        "output": "Метод из A\n['C', 'A', 'B', 'object']"
      },
      {
        "title": "Когда очередь построить нельзя",
        "paragraphs": [
          "Правила очереди простые: наследник всегда стоит раньше родителя, а порядок в скобках сохраняется.",
          "В примере `Broken(A, B)` просит поставить `A` раньше `B`. Но `B` — наследник `A` и должен стоять раньше. Противоречие! Python сразу выдаёт ошибку при создании класса."
        ],
        "syntax": "class Broken(A, B):\n    pass",
        "example": "class A:\n    pass\n\nclass B(A):\n    pass\n\ntry:\n    class Broken(A, B):\n        pass\nexcept TypeError:\n    print(\"Ошибка: MRO построить нельзя\")",
        "note": "Правильно — от частного к общему: `class Fixed(B, A)`. Наследник всегда левее своего родителя.",
        "id": "part-2",
        "output": "Ошибка: MRO построить нельзя"
      },
      {
        "title": "Ромб: общий предок вызывается один раз",
        "paragraphs": [
          "Ромб: `D` наследует `B` и `C`, а они оба наследуют `A`. Очередь получается `D → B → C → A`.",
          "Поэтому `super()` внутри `B` ведёт не в `A`, а в `C` — следующего в очереди. Благодаря этому общий предок `A` срабатывает один раз, а не два."
        ],
        "syntax": "super().method()\n# следующий класс в MRO объекта",
        "example": "class A:\n    def method(self):\n        print(\"Общий класс A\")\n\nclass B(A):\n    def method(self):\n        print(\"Ветка B\")\n        super().method()\n\nclass C(A):\n    def method(self):\n        print(\"Ветка C\")\n        super().method()\n\nclass D(B, C):\n    pass\n\nD().method()\nprint([cls.__name__ for cls in D.mro()])",
        "id": "part-3",
        "output": "Ветка B\nВетка C\nОбщий класс A\n['D', 'B', 'C', 'A', 'object']"
      }
    ],
    "id": "mro",
    "quick": {
      "summary": "MRO (Method Resolution Order) — очередь классов, по которой Python ищет метод. Берётся первое совпадение. Посмотреть очередь: `Класс.mro()`.",
      "code": "class A:\n    def method(self):\n        print(\"Метод из A\")\n\nclass B:\n    def method(self):\n        print(\"Метод из B\")\n\nclass C(A, B):\n    pass\n\nC().method()\nprint([cls.__name__ for cls in C.mro()])",
      "takeaway": "MRO нужен, чтобы разобраться, «почему вызвался не тот метод». Если очередь сложно объяснить словами — иерархия слишком запутанная, упростите её.",
      "analogy": "Как очередь к врачам в поликлинике: вас направили сначала к терапевту, потом к хирургу. Кто первый в очереди сможет помочь — к тому и попадёте, дальше не идёте.",
      "output": "Метод из A\n['C', 'A', 'B', 'object']"
    },
    "inTests": {
      "text": "В тестах MRO пригодится при отладке: если у страницы несколько родителей-миксинов и вызывается «не тот» метод, напечатайте `Page.mro()` — сразу станет видно, откуда он берётся.",
      "code": "class Base:\n    def wait(self):\n        return \"Base.wait\"\n\nclass FastWait:\n    def wait(self):\n        return \"FastWait.wait\"\n\nclass Page(FastWait, Base):\n    pass\n\ndef test_wait_comes_from_mixin():\n    assert Page().wait() == \"FastWait.wait\"\n    assert [c.__name__ for c in Page.mro()][:3] == [\"Page\", \"FastWait\", \"Base\"]"
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "oop/encapsulation",
      "oop/inheritance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Полиморфизм",
    "lead": "Разные объекты отвечают на одну и ту же команду по-своему.",
    "sections": [
      {
        "title": "Одна команда — разное поведение",
        "paragraphs": [
          "Функция `notify` не знает, что ей передали — письмо или СМС. Она просто вызывает `send`. Каждый канал отправляет сообщение по-своему.",
          "Важно, чтобы методы совпадали не только по имени, но и по параметрам и смыслу: оба `send` принимают текст и отправляют его."
        ],
        "useWhen": [
          "Несколько реализаций выполняют одну операцию по-разному.",
          "Новые реализации должны подключаться без изменения общего алгоритма."
        ],
        "steps": [
          "Договоритесь об общем методе: имя, параметры, что он делает.",
          "Реализуйте его в каждом классе.",
          "Общий код вызывает метод и не проверяет тип объекта."
        ],
        "mistakes": [
          "Добавлять `if isinstance(...)` для каждого нового класса. Общий код придётся постоянно переписывать.",
          "Называть одинаково методы, которые на самом деле делают разное."
        ],
        "syntax": "def notify(channel, text):\n    channel.send(text)",
        "example": "class EmailChannel:\n    def send(self, text):\n        print(f\"Письмо: {text}\")\n\nclass SmsChannel:\n    def send(self, text):\n        print(f\"СМС: {text}\")\n\ndef notify(channel, text):\n    channel.send(text)\n\nnotify(EmailChannel(), \"Заказ готов\")\nnotify(SmsChannel(), \"Курьер выехал\")",
        "template": "def process(item):\n    return item.action()\n\nclass First:\n    def action(self):\n        return \"первый результат\"\n\nclass Second:\n    def action(self):\n        return \"второй результат\"",
        "id": "part-1",
        "output": "Письмо: Заказ готов\nСМС: Курьер выехал"
      },
      {
        "title": "Утиная типизация",
        "paragraphs": [
          "Python не спрашивает, кто чей наследник. Ему важно одно: есть ли у объекта нужный метод. Это называют «утиная типизация»: если что-то крякает как утка — значит, это утка.",
          "Добавили робота с методом `speak` — и он сразу работает в функции `concert`, хотя с собакой и кошкой его ничего не связывает."
        ],
        "syntax": "concert([Dog(), Cat(), Robot()])",
        "example": "class Robot:\n    def speak(self):\n        print(\"Робот: бип!\")\n\ndef concert(performers):\n    for performer in performers:\n        performer.speak()\n\nconcert([Robot()])",
        "note": "Если нужного метода у объекта нет, будет ошибка `AttributeError`.",
        "id": "part-2",
        "output": "Робот: бип!"
      },
      {
        "title": "Полиморфизм через наследование",
        "paragraphs": [
          "Второй способ — общий родитель с методом, который наследники заменяют своим. Так в коде явно записано правило: «у каждого животного есть `speak`».",
          "Работает так же: цикл вызывает один метод, а звук выбирает сам объект."
        ],
        "syntax": "class Animal:\n    def speak(self):\n        print(\"...\")",
        "example": "class Animal:\n    def speak(self):\n        print(\"Неизвестный звук\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Собака: гав!\")\n\nclass Cat(Animal):\n    def speak(self):\n        print(\"Кошка: мяу!\")\n\nfor animal in [Dog(), Cat(), Animal()]:\n    animal.speak()",
        "id": "part-3",
        "output": "Собака: гав!\nКошка: мяу!\nНеизвестный звук"
      }
    ],
    "id": "polymorphism",
    "quick": {
      "summary": "Если у разных объектов есть метод с одинаковым именем и смыслом, общий код может вызывать его, не разбираясь, что за объект перед ним. Каждый объект выполнит команду по-своему.",
      "code": "class EmailChannel:\n    def send(self, text):\n        print(f\"Письмо: {text}\")\n\nclass SmsChannel:\n    def send(self, text):\n        print(f\"СМС: {text}\")\n\ndef notify(channel, text):\n    channel.send(text)\n\nnotify(EmailChannel(), \"Заказ готов\")\nnotify(SmsChannel(), \"Курьер выехал\")",
      "takeaway": "Общий код не должен проверять тип через `if type(...)`. Он просто вызывает нужный метод — объект сам знает, что делать.",
      "analogy": "Команда «Голос!»: собака лает, кошка мяукает, попугай говорит «Привет». Вы даёте одну и ту же команду, а каждый отвечает по-своему.",
      "output": "Письмо: Заказ готов\nСМС: Курьер выехал"
    },
    "inTests": {
      "text": "Тест можно написать один раз и запустить для разных реализаций: например, для двух драйверов браузера или двух способов авторизации. `parametrize` передаёт разные объекты, а проверка одна.",
      "code": "import pytest\n\nclass Email:\n    def send(self, text):\n        return f\"email: {text}\"\n\nclass Sms:\n    def send(self, text):\n        return f\"sms: {text}\"\n\n@pytest.mark.parametrize(\"channel\", [Email(), Sms()])\ndef test_channel_sends_text(channel):\n    assert \"Заказ готов\" in channel.send(\"Заказ готов\")"
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "oop/encapsulation",
      "oop/inheritance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "title": "Абстракция",
    "lead": "Показать снаружи только главное, а сложные детали спрятать внутри.",
    "sections": [
      {
        "title": "Простая команда снаружи, детали внутри",
        "paragraphs": [
          "Тому, кто платит, не нужны подробности проверки и отправки запроса. Ему нужна одна понятная команда — `pay`.",
          "Технические шаги спрятаны в методах с подчёркиванием (`_send_request`). Для абстракции не обязательно использовать специальные модули — достаточно хорошо продуманных методов."
        ],
        "useWhen": [
          "Сложную подсистему нужно представить несколькими понятными операциями.",
          "Внутренние детали могут меняться без переписывания клиентского кода."
        ],
        "steps": [
          "Поймите, какую задачу решает пользователь объекта.",
          "Сделайте для неё минимум понятных методов.",
          "Все технические шаги спрячьте внутри."
        ],
        "mistakes": [
          "Выставлять наружу все внутренние методы.",
          "Думать, что абстракция — это только классы из модуля `abc`."
        ],
        "syntax": "class PaymentService:\n    def pay(self, amount):\n        ...",
        "example": "class PaymentService:\n    def pay(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        receipt = self._send_request(amount)\n        print(f\"Оплачено: {receipt}\")\n\n    def _send_request(self, amount):\n        return f\"{amount} руб.\"\n\nPaymentService().pay(500)",
        "template": "class Facade:\n    def operation(self, value):\n        prepared = self._prepare(value)\n        return self._perform(prepared)\n\n    def _prepare(self, value):\n        ...\n\n    def _perform(self, value):\n        ...",
        "id": "part-1",
        "output": "Оплачено: 500 руб."
      },
      {
        "title": "Забыли метод — ошибка сразу",
        "paragraphs": [
          "`ABC` и `@abstractmethod` фиксируют правило: «у каждого наследника обязан быть метод `area`».",
          "Если наследник его не написал, Python не даст создать объект — ошибка видна сразу, а не когда-нибудь потом."
        ],
        "syntax": "class Circle(Shape):\n    pass",
        "example": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        ...\n\nclass Circle(Shape):\n    pass\n\ntry:\n    Circle()\nexcept TypeError:\n    print(\"Ошибка: метод area не реализован\")",
        "id": "part-2",
        "output": "Ошибка: метод area не реализован"
      },
      {
        "title": "Общий код рядом с требованием",
        "paragraphs": [
          "В абстрактном классе могут быть и готовые методы. `describe` написан один раз и использует `self.area()` — метод, который обязан быть у каждого наследника.",
          "Родитель задаёт правила и общий код, а наследник дописывает только своё — формулу площади."
        ],
        "syntax": "def describe(self):\n    print(f\"Площадь: {self.area()}\")",
        "example": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\n    def describe(self):\n        print(f\"Площадь: {self.area()}\")\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\n    def area(self):\n        return self.side ** 2\n\nSquare(3).describe()",
        "note": "`abc` — лишь один из инструментов абстракции. Его польза — Python сразу ловит забытый обязательный метод.",
        "id": "part-3",
        "output": "Площадь: 9"
      }
    ],
    "id": "abstraction",
    "quick": {
      "summary": "Абстракция — у объекта есть простая понятная команда (`pay`), а все технические шаги (проверка, запрос к банку) спрятаны внутри. Пользователь знает «что», но не обязан знать «как».",
      "code": "class PaymentService:\n    def pay(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        receipt = self._send_request(amount)\n        print(f\"Оплачено: {receipt}\")\n\n    def _send_request(self, amount):\n        return f\"{amount} руб.\"\n\nPaymentService().pay(500)",
      "takeaway": "Хорошая абстракция отвечает на вопрос «что можно сделать», не заставляя разбираться, «как это устроено». Модуль `abc` помогает зафиксировать обязательные методы.",
      "analogy": "Как пульт от телевизора: кнопка «Громче» — и всё. Вам не нужно знать, как сигнал идёт по проводам и что происходит внутри динамика.",
      "output": "Оплачено: 500 руб."
    },
    "inTests": {
      "text": "Тест должен читаться как сценарий пользователя: `cart.add(item)`, `checkout.pay()`. Все клики, ожидания и локаторы спрятаны в классах страниц. Так тесты понятны даже тем, кто не пишет код.",
      "code": "class Checkout:\n    def pay(self, amount):\n        self._fill_card()\n        return self._submit(amount)\n\n    def _fill_card(self):\n        pass                       # детали спрятаны\n\n    def _submit(self, amount):\n        return f\"Оплачено: {amount}\"\n\ndef test_payment():\n    assert Checkout().pay(500) == \"Оплачено: 500\""
    },
    "level": "Следующий шаг",
    "aliases": [],
    "related": [
      "oop/encapsulation",
      "oop/inheritance"
    ],
    "source": "https://docs.python.org/3/tutorial/classes.html"
  }
];
