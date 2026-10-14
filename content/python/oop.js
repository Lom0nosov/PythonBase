/* Материалы: редактируйте текст и примеры, сохраняйте постоянные id. */
window.PythonBase.content.oop = [
  {
    "title": "Инкапсуляция",
    "lead": "Объект сам хранит свои данные и не позволяет привести их в недопустимое состояние.",
    "sections": [
      {
        "title": "Суть: данные под контролем класса",
        "paragraphs": [
          "Инкапсуляция объединяет данные (атрибуты) и методы, работающие с ними, внутри одного класса и скрывает детали реализации. Снаружи пользуются понятным интерфейсом, а как всё устроено внутри — знает только класс.",
          "Зачем это нужно: если любое поле можно менять снаружи, объект не отвечает за свою правильность. Здесь кто-то записал отрицательный баланс, и класс об этом даже не узнал."
        ],
        "useWhen": [
          "У значения есть ограничения: сумма положительна, статус допустим, дата корректна.",
          "Внутреннее хранение может измениться, а публичный интерфейс нужно сохранить."
        ],
        "steps": [
          "Определите состояние, за правильность которого отвечает объект.",
          "Оставьте снаружи понятные свойства и методы.",
          "Проверяйте новое значение до изменения состояния."
        ],
        "mistakes": [
          "Проверять данные только во внешнем коде.",
          "Разрешать менять внутренний атрибут напрямую."
        ],
        "syntax": "acc.balance = -500  # ничто не мешает",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\naccount = BankAccount(100)\naccount.balance = -500\nprint(f\"Некорректный баланс: {account.balance}\")\n# Некорректный баланс: -500",
        "template": "class Model:\n    def __init__(self, value):\n        self.value = value\n\n    def change(self, value):\n        if value_is_invalid:\n            raise ValueError(\"Некорректное значение\")\n        self.value = value",
        "note": "Ошибки не случилось, но данные испорчены: счёта с минусом существовать не должно. Ниже — соглашения и инструменты, которыми это закрывают.",
        "id": "part-1"
      },
      {
        "title": "Одно подчёркивание: защищённый атрибут",
        "paragraphs": [
          "Одинарное подчёркивание `_protected` — только соглашение «внутренняя деталь, не используйте снаружи». Python не ограничивает доступ.",
          "Это сигнал другому разработчику, а не механизм безопасности. Снаружи на такое поле лучше не опираться: его могут переименовать в любой версии."
        ],
        "syntax": "self._protected = \"Защищённый\"",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self._protected = \"Защищённый\"\n        self._balance = balance\n\n    def get_balance(self):\n        return self._balance\n\nacc = BankAccount(100)\nprint(acc.get_balance())\nprint(acc._protected)\n# 100\n# Защищённый",
        "id": "part-2"
      },
      {
        "title": "Два подчёркивания: name mangling",
        "paragraphs": [
          "Двойное подчёркивание включает name mangling: атрибут `__private` внутри класса `BankAccount` превращается в `_BankAccount__private`.",
          "Поэтому обращение `account.__private` снаружи даёт ошибку, а `account._BankAccount__private` — работает. Доступ затруднён, но не запрещён. Главная польза не в секретности: так поле не столкнётся с одноимённым полем в классе-наследнике."
        ],
        "syntax": "self.__private = balance\n# снаружи: объект._BankAccount__private",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self.__private = balance\n\n    def get_balance(self):\n        return self.__private\n\naccount = BankAccount(100)\nprint(account.get_balance())\nprint(account._BankAccount__private)\n# 100\n# 100",
        "note": "Пароли и секреты так не прячут — это не защита. Обращаться к `_Класс__поле` снаружи не следует: раз имя пришлось искажать, поле точно не для внешнего кода.",
        "id": "part-3"
      },
      {
        "title": "Доступ через property",
        "paragraphs": [
          "Спрятать данные — половина дела: их нужно как-то читать и менять. Стандартный способ в Python — `@property`: снаружи это обычное поле, а внутри работает метод с проверкой.",
          "Начальное значение тоже должно пройти эту проверку: в `__init__` присваивают `self.balance = balance`, а не `self._balance = balance`. Иначе конструктор обойдёт setter."
        ],
        "useWhen": [
          "Нужна удобная запись `object.value`, но чтение или запись требуют логики."
        ],
        "steps": [
          "Getter возвращает внутреннее значение.",
          "Setter валидирует данные и только потом сохраняет их.",
          "Конструктор присваивает через публичное свойство и вызывает setter."
        ],
        "mistakes": [
          "В конструкторе писать прямо в `_balance` и обходить проверку.",
          "В setter присваивать `self.balance = value` и получить рекурсию."
        ],
        "syntax": "@property\ndef balance(self):\n    return self._balance\n\n@balance.setter\ndef balance(self, value):\n    ...",
        "example": "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    @balance.setter\n    def balance(self, value):\n        if value < 0:\n            raise ValueError(\"Баланс не может быть отрицательным\")\n        self._balance = value\n\naccount = BankAccount(100)\nprint(f\"Баланс: {account.balance}\")\ntry:\n    BankAccount(-1)\nexcept ValueError as error:\n    print(f\"Ошибка: {error}\")\n# Баланс: 100\n# Ошибка: Баланс не может быть отрицательным",
        "template": "class Model:\n    def __init__(self, value):\n        self.value = value\n\n    @property\n    def value(self):\n        return self._value\n\n    @value.setter\n    def value(self, value):\n        if value_is_invalid:\n            raise ValueError(\"Некорректное значение\")\n        self._value = value",
        "note": "используйте `property`, когда снаружи нужен атрибут, а внутри — единый контроль чтения или записи.",
        "id": "part-4"
      }
    ],
    "id": "encapsulation",
    "quick": {
      "summary": "Инкапсуляция объединяет данные и операции над ними. Публичный интерфейс проверяет изменения, внутренние детали помечаются `_`.",
      "code": "class Counter:\n    def __init__(self):\n        self._value = 0\n\n    @property\n    def value(self):\n        return self._value\n\n    def add(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Ожидали положительное число\")\n        self._value += amount\n\ncounter = Counter()\ncounter.add(2)\nprint(counter.value)  # 2",
      "takeaway": "Изменяйте состояние через `add`, читайте через `value`. Подчёркивание — соглашение, а не запрет доступа; проверки нужны в публичных операциях."
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
    "lead": "Наследование описывает отношение is-a, а композиция — has-a; связь выбирают по смыслу.",
    "sections": [
      {
        "title": "Поведение базового класса",
        "paragraphs": [
          "Наследование позволяет создать класс на основе другого: `class Dog(Animal)`. Методы и атрибуты класса доступны по цепочке наследования; состояние экземпляра создаётся при инициализации.",
          "Практический критерий — отношение is-a: собака является животным и может использоваться там, где ожидают животное. Наследование только ради готового метода обычно создаёт неверную модель."
        ],
        "useWhen": [
          "Наследник действительно является частным случаем базового типа.",
          "Его можно подставить вместо родителя без изменения смысла программы."
        ],
        "steps": [
          "Python ищет атрибут сначала в классе объекта, затем в базовых классах.",
          "Наследник получает общий интерфейс и может переопределить реализацию.",
          "`isinstance` учитывает всю цепочку наследования."
        ],
        "mistakes": [
          "Наследоваться только ради переиспользования нескольких строк.",
          "Строить глубокую иерархию для невзаимозаменяемых объектов."
        ],
        "syntax": "class Dog(Animal):\n    ...",
        "example": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def eat(self):\n        print(f\"{self.name} ест\")\n\nclass Dog(Animal):\n    pass\n\ndog = Dog(\"Рекс\")\ndog.eat()\nprint(f\"Рекс — животное: {isinstance(dog, Animal)}\")\n# Рекс ест\n# Рекс — животное: True",
        "template": "class Base:\n    def action(self):\n        return \"общее поведение\"\n\nclass Child(Base):\n    def own_action(self):\n        return \"своё поведение\"",
        "note": "наследование подходит только для устойчивого отношения is-a.",
        "id": "part-1"
      },
      {
        "title": "Переопределение метода",
        "paragraphs": [
          "В ребёнке пишут то, чего у родителя нет: собака умеет лаять, а животное в целом — нет.",
          "А если имя метода совпало с родительским, работать будет версия ребёнка — это называют переопределением. Родительский метод Python даже не посмотрит, потому что нашёл подходящий раньше."
        ],
        "syntax": "class Dog(Animal):\n    def voice(self):\n        print(\"Гав!\")",
        "example": "class Animal:\n    def voice(self):\n        print(\"Какой-то звук\")\n\nclass Dog(Animal):\n    def voice(self):\n        print(\"Гав!\")\n\nAnimal().voice()\nDog().voice()\n# Какой-то звук\n# Гав!",
        "id": "part-2"
      },
      {
        "title": "super(): дополнить, а не потерять",
        "paragraphs": [
          "Чем опасно переопределение, лучше всего видно на конструкторе. Написали свой `__init__` — родительский не вызовется, и заданные в нём поля просто не появятся.",
          "`super().__init__(name)` продолжает поиск в следующем классе по MRO, а не обязательно обращается к непосредственному родителю. После общей работы наследник добавляет свою."
        ],
        "syntax": "super().__init__(name)\nself.breed = breed",
        "example": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\nrex = Dog(\"Рекс\", \"корги\")\nprint(rex.name, rex.breed)\n# Рекс корги",
        "id": "part-3"
      },
      {
        "title": "Проверка «является»",
        "paragraphs": [
          "Объект наследника — это одновременно и экземпляр родителя: `isinstance(rex, Animal)` даёт `True`. Список родителей класса виден в `__bases__`.",
          "Отсюда и правило выбора: наследование читают словом «является». Собака является животным — верно. А машина является двигателем? Нет, хотя метод `start()` хочется взять готовым. В таких случаях объект кладут внутрь другого объекта как атрибут — это называют композицией."
        ],
        "syntax": "isinstance(объект, Родитель)",
        "example": "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nrex = Dog()\nprint(isinstance(rex, Dog))\nprint(isinstance(rex, Animal))\nprint(Dog.__bases__)\n# True\n# True\n# (<class '__main__.Animal'>,)",
        "id": "part-4"
      },
      {
        "title": "Композиция: объект имеет зависимость",
        "paragraphs": [
          "Практическая проблема: машине нужен двигатель, но машина не является двигателем. При композиции один объект хранит другой и поручает ему часть работы.",
          "Композиция выражает has-a: `Car` имеет `Engine`. Зависимость легко заменить без перестройки иерархии."
        ],
        "useWhen": [
          "Один объект использует другой как часть или сервис.",
          "Зависимость нужно отдельно настраивать, заменять или тестировать."
        ],
        "steps": [
          "Передайте зависимость в конструктор.",
          "Сохраните её в атрибуте.",
          "Делегируйте ей подходящую операцию."
        ],
        "mistakes": [
          "Писать `class Car(Engine)` ради метода `start`.",
          "Жёстко создавать зависимость внутри, когда её нужно подменять."
        ],
        "syntax": "class Car:\n    def __init__(self, engine):\n        self.engine = engine",
        "example": "class Engine:\n    def start(self):\n        return \"двигатель запущен\"\n\nclass Car:\n    def __init__(self, engine):\n        self.engine = engine\n\n    def start(self):\n        print(f\"Автомобиль: {self.engine.start()}\")\n\nCar(Engine()).start()\n# Автомобиль: двигатель запущен",
        "template": "class Client:\n    def __init__(self, service):\n        self.service = service\n\n    def run(self):\n        return self.service.action()",
        "note": "is-a — наследование; has-a или uses-a — композиция. При сомнении чаще начинают с композиции.",
        "id": "part-5"
      }
    ],
    "id": "inheritance",
    "quick": {
      "summary": "Наследование описывает отношение is-a, а композиция — has-a; связь выбирают по смыслу.",
      "code": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def eat(self):\n        print(f\"{self.name} ест\")\n\nclass Dog(Animal):\n    pass\n\ndog = Dog(\"Рекс\")\ndog.eat()\nprint(f\"Рекс — животное: {isinstance(dog, Animal)}\")\n# Рекс ест\n# Рекс — животное: True",
      "takeaway": "Наследование подходит только для устойчивого отношения is-a."
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
    "lead": "Продвинутая техника: класс получает поведение нескольких базовых классов, а конфликты решает MRO.",
    "sections": [
      {
        "title": "Несколько родителей через запятую",
        "paragraphs": [
          "В скобках перечисляют всех родителей. Класс получает методы каждого из них, даже если своего кода у него нет вообще.",
          "Практическое применение — небольшие независимые mixins. Это продвинутая техника: для обычных частей и сервисов композиция обычно понятнее."
        ],
        "useWhen": [
          "Фреймворк уже использует кооперативные mixins.",
          "Каждая примесь мала и добавляет одну чёткую возможность."
        ],
        "steps": [
          "Python строит общую MRO для всех базовых классов.",
          "Метод ищется по этой очереди до первого совпадения.",
          "Кооперативные методы передают вызов дальше через `super()`."
        ],
        "mistakes": [
          "Смешивать большие классы предметной области ради готового кода.",
          "Не проверять конфликты имён и сигнатур.",
          "Забывать, что порядок базовых классов влияет на результат."
        ],
        "syntax": "class Pegasus(Horse, Bird):\n    pass",
        "example": "class SaveMixin:\n    def save(self):\n        print(f\"Сохранено: {self.name}\")\n\nclass Product:\n    def __init__(self, name):\n        self.name = name\n\nclass SavedProduct(SaveMixin, Product):\n    pass\n\nSavedProduct(\"Книга\").save()\n# Сохранено: Книга",
        "template": "class FeatureMixin:\n    def feature(self):\n        return \"дополнительная возможность\"\n\nclass Model(FeatureMixin, BaseModel):\n    pass",
        "note": "множественное наследование подходит для небольших согласованных mixins; зависимости подключайте композицией.",
        "id": "part-1"
      },
      {
        "title": "Примеси (mixins)",
        "paragraphs": [
          "Самое частое применение — маленькие классы-добавки, каждый из которых даёт одну способность. Их называют примесями или миксинами и подмешивают к основному классу.",
          "Примесь не бывает самостоятельной вещью: `JsonMixin` — не объект предметной области, он только добавляет умение превращаться в текст. Поэтому его и не создают отдельно, а дописывают в скобки к нужному классу."
        ],
        "syntax": "class User(JsonMixin):\n    ...",
        "example": "import json\n\nclass JsonMixin:\n    def to_json(self):\n        return json.dumps(self.__dict__, ensure_ascii=False)\n\nclass User(JsonMixin):\n    def __init__(self, name):\n        self.name = name\n\nprint(User(\"Аня\").to_json())\n# {\"name\": \"Аня\"}",
        "id": "part-2"
      },
      {
        "title": "Конфликт одинаковых имён",
        "paragraphs": [
          "При совпадении имён используется первый найденный метод по MRO. В примере с независимыми `A` и `B` у `C(A, B)` будет выбран метод из `A`.",
          "Порядок поиска не случайный — Python строит для каждого класса очередь классов и идёт по ней. Эта очередь называется MRO, ей посвящена отдельная тема."
        ],
        "syntax": "class C(A, B):\n    pass",
        "example": "class A:\n    def method(self):\n        print(\"Метод из A\")\n\nclass B:\n    def method(self):\n        print(\"Метод из B\")\n\nclass C(A, B):\n    pass\n\nC().method()\n# Метод из A",
        "note": "Фраза «побеждает левый родитель» — упрощение. Точный порядок показывает `C.mro()`; `super()` всегда идёт к следующему классу в этой очереди.",
        "id": "part-3"
      }
    ],
    "id": "multiple-inheritance",
    "quick": {
      "summary": "Продвинутая техника: класс получает поведение нескольких базовых классов, а конфликты решает MRO.",
      "code": "class SaveMixin:\n    def save(self):\n        print(f\"Сохранено: {self.name}\")\n\nclass Product:\n    def __init__(self, name):\n        self.name = name\n\nclass SavedProduct(SaveMixin, Product):\n    pass\n\nSavedProduct(\"Книга\").save()\n# Сохранено: Книга",
      "takeaway": "Множественное наследование подходит для небольших согласованных mixins; зависимости подключайте композицией."
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
    "lead": "Продвинутая тема: MRO задаёт единственный порядок поиска методов во всей иерархии.",
    "sections": [
      {
        "title": "Очередь поиска метода",
        "paragraphs": [
          "Когда у объекта вызывают метод, Python идёт по списку классов и берёт первое совпадение. Этот список и есть MRO.",
          "Посмотрите порядок через `Класс.mro()`: сам класс стоит первым, `object` — последним. Между ними Python выстраивает всю иерархию по алгоритму C3. В простой иерархии `C(A, B)` это `C, A, B, object`, но сложное дерево нельзя читать просто слева направо."
        ],
        "useWhen": [
          "Нужно объяснить выбор метода при множественном наследовании.",
          "Нужно отладить кооперативную цепочку `super()`."
        ],
        "steps": [
          "Поиск начинается с фактического класса объекта.",
          "Python идёт по `mro()` до первого совпадения.",
          "`object` обычно завершает очередь."
        ],
        "mistakes": [
          "Рассуждать только по одному уровню родителей.",
          "Менять порядок базовых классов без проверки новой MRO."
        ],
        "syntax": "print(C.mro())",
        "example": "class A:\n    def method(self):\n        print(\"Метод из A\")\n\nclass B:\n    def method(self):\n        print(\"Метод из B\")\n\nclass C(A, B):\n    pass\n\nC().method()\nprint([cls.__name__ for cls in C.mro()])\n# Метод из A\n# ['C', 'A', 'B', 'object']",
        "template": "for cls in Model.mro():\n    print(cls.__name__)",
        "note": "MRO — инструмент диагностики. Если очередь трудно объяснить, упростите иерархию.",
        "id": "part-1"
      },
      {
        "title": "Алгоритм C3-линеаризации",
        "paragraphs": [
          "C3 сохраняет порядок базовых классов, заданный при объявлении, и согласованный порядок их предков. Наследник стоит перед своим предком. Получившаяся очередь содержит каждый класс один раз.",
          "Если непротиворечивый порядок построить невозможно, Python отказывается создавать класс. Здесь `Broken(A, B)` требует, чтобы `A` шёл раньше `B`, но `B` — наследник `A` и должен быть раньше. Ошибка возникает сразу, а не при вызове метода."
        ],
        "syntax": "class Broken(A, B):\n    pass",
        "example": "class A:\n    pass\n\nclass B(A):\n    pass\n\ntry:\n    class Broken(A, B):\n        pass\nexcept TypeError:\n    print(\"Ошибка: MRO построить нельзя\")\n# Ошибка: MRO построить нельзя",
        "note": "Правильный порядок — от частного к общему: `class Fixed(B, A)`. Наследник всегда левее своего родителя.",
        "id": "part-2"
      },
      {
        "title": "Ромб: общий предок вызывается один раз",
        "paragraphs": [
          "Классический случай — ромб: `D` наследует `B` и `C`, а те оба наследуют `A`. MRO получается `D, B, C, A`.",
          "Поэтому `super()` внутри `B` ведёт не в `A`, как кажется по скобкам, а в `C` — следующий класс по очереди. `super()` всегда смотрит на MRO того объекта, с которым работает. Благодаря этому общий предок `A` срабатывает один раз, а не дважды."
        ],
        "syntax": "super().method()\n# следующий класс в MRO объекта",
        "example": "class A:\n    def method(self):\n        print(\"Общий класс A\")\n\nclass B(A):\n    def method(self):\n        print(\"Ветка B\")\n        super().method()\n\nclass C(A):\n    def method(self):\n        print(\"Ветка C\")\n        super().method()\n\nclass D(B, C):\n    pass\n\nD().method()\nprint([cls.__name__ for cls in D.mro()])\n# Ветка B\n# Ветка C\n# Общий класс A\n# ['D', 'B', 'C', 'A', 'object']",
        "id": "part-3"
      }
    ],
    "id": "mro",
    "quick": {
      "summary": "Продвинутая тема: MRO задаёт единственный порядок поиска методов во всей иерархии.",
      "code": "class A:\n    def method(self):\n        print(\"Метод из A\")\n\nclass B:\n    def method(self):\n        print(\"Метод из B\")\n\nclass C(A, B):\n    pass\n\nC().method()\nprint([cls.__name__ for cls in C.mro()])\n# Метод из A\n# ['C', 'A', 'B', 'object']",
      "takeaway": "MRO — инструмент диагностики. Если очередь трудно объяснить, упростите иерархию."
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
    "lead": "Разные объекты используют через общий протокол поведения; обязательного родства между классами нет.",
    "sections": [
      {
        "title": "Единый интерфейс",
        "paragraphs": [
          "Практическая проблема: общий алгоритм должен работать с разными реализациями без цепочки `if type(...)`. Для этого объекты договариваются об одном поведении.",
          "Протокол включает не только имя метода, но и его параметры и смысл результата. Конкретный класс выбирает собственную реализацию."
        ],
        "useWhen": [
          "Несколько реализаций выполняют одну операцию по-разному.",
          "Новые реализации должны подключаться без изменения общего алгоритма."
        ],
        "steps": [
          "Определите минимальный протокол поведения.",
          "Реализуйте его в каждом подходящем классе.",
          "Общий код вызывает метод, не проверяя конкретный тип."
        ],
        "mistakes": [
          "Добавлять `if isinstance(...)` для каждой новой реализации.",
          "Считать методы общими, если их параметры или смысл различаются."
        ],
        "syntax": "def notify(channel, text):\n    channel.send(text)",
        "example": "class EmailChannel:\n    def send(self, text):\n        print(f\"Письмо: {text}\")\n\nclass SmsChannel:\n    def send(self, text):\n        print(f\"СМС: {text}\")\n\ndef notify(channel, text):\n    channel.send(text)\n\nnotify(EmailChannel(), \"Заказ готов\")\nnotify(SmsChannel(), \"Курьер выехал\")\n# Письмо: Заказ готов\n# СМС: Курьер выехал",
        "template": "def process(item):\n    return item.action()\n\nclass First:\n    def action(self):\n        return \"первый результат\"\n\nclass Second:\n    def action(self):\n        return \"второй результат\"",
        "note": "полиморфизм нужен, когда алгоритм зависит от поведения, а не от конкретного класса.",
        "id": "part-1"
      },
      {
        "title": "Утиная типизация",
        "paragraphs": [
          "Python не спрашивает, кто чей наследник. Важно только то, что у объекта есть нужный метод с ожидаемым поведением. Это называют утиной типизацией.",
          "Поэтому общий код не переписывают под новый класс. Добавили робота с методом `speak` — он встал в тот же цикл, а функцию `concert` не тронули. Родства с собакой и кошкой у него нет никакого."
        ],
        "syntax": "concert([Dog(), Cat(), Robot()])",
        "example": "class Robot:\n    def speak(self):\n        print(\"Робот: бип!\")\n\ndef concert(performers):\n    for performer in performers:\n        performer.speak()\n\nconcert([Robot()])\n# Робот: бип!",
        "note": "Если объект не поддерживает протокол, будет `AttributeError`. Родство классов для duck typing не требуется.",
        "id": "part-2"
      },
      {
        "title": "Полиморфизм через наследование",
        "paragraphs": [
          "Второй обычный приём — общий родитель с методом, который дети переопределяют. Так в коде записано правило: у каждого животного есть `speak`.",
          "Работает всё так же: цикл вызывает один и тот же метод, а звук выбирает сам объект. Разница лишь в том, что родство классов теперь видно явно, и общий код можно держать в родителе."
        ],
        "syntax": "class Animal:\n    def speak(self):\n        print(\"...\")",
        "example": "class Animal:\n    def speak(self):\n        print(\"Неизвестный звук\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Собака: гав!\")\n\nclass Cat(Animal):\n    def speak(self):\n        print(\"Кошка: мяу!\")\n\nfor animal in [Dog(), Cat(), Animal()]:\n    animal.speak()\n# Собака: гав!\n# Кошка: мяу!\n# Неизвестный звук",
        "id": "part-3"
      }
    ],
    "id": "polymorphism",
    "quick": {
      "summary": "Разные объекты используют через общий протокол поведения; обязательного родства между классами нет.",
      "code": "class EmailChannel:\n    def send(self, text):\n        print(f\"Письмо: {text}\")\n\nclass SmsChannel:\n    def send(self, text):\n        print(f\"СМС: {text}\")\n\ndef notify(channel, text):\n    channel.send(text)\n\nnotify(EmailChannel(), \"Заказ готов\")\nnotify(SmsChannel(), \"Курьер выехал\")\n# Письмо: Заказ готов\n# СМС: Курьер выехал",
      "takeaway": "Полиморфизм нужен, когда алгоритм зависит от поведения, а не от конкретного класса."
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
    "lead": "Абстракция оставляет существенные операции и скрывает детали; ABC лишь формализует контракт.",
    "sections": [
      {
        "title": "Абстракция возможна без ABC",
        "paragraphs": [
          "Практическая проблема: клиенту оплаты не нужны детали проверки и сетевого запроса. Ему нужна одна понятная операция `pay`.",
          "Абстракция выделяет существенный интерфейс и прячет технические шаги. Она возможна через функции, обычные классы, модули и протоколы — наследование от `ABC` не обязательно."
        ],
        "useWhen": [
          "Сложную подсистему нужно представить несколькими понятными операциями.",
          "Внутренние детали могут меняться без переписывания клиентского кода."
        ],
        "steps": [
          "Определите задачу пользователя объекта.",
          "Сформируйте минимальный публичный интерфейс.",
          "Спрячьте последовательность технических шагов внутри."
        ],
        "mistakes": [
          "Выдавать наружу все внутренние методы.",
          "Считать абстракцией только классы из модуля `abc`."
        ],
        "syntax": "class PaymentService:\n    def pay(self, amount):\n        ...",
        "example": "class PaymentService:\n    def pay(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        receipt = self._send_request(amount)\n        print(f\"Оплачено: {receipt}\")\n\n    def _send_request(self, amount):\n        return f\"{amount} руб.\"\n\nPaymentService().pay(500)\n# Оплачено: 500 руб.",
        "template": "class Facade:\n    def operation(self, value):\n        prepared = self._prepare(value)\n        return self._perform(prepared)\n\n    def _prepare(self, value):\n        ...\n\n    def _perform(self, value):\n        ...",
        "note": "хорошая абстракция говорит «что можно сделать», не заставляя клиента знать «как это устроено».",
        "id": "part-1"
      },
      {
        "title": "Забытый метод — ошибка сразу",
        "paragraphs": [
          "Если наследник не реализовал обязательный метод, Python не даст создать объект и скажет, чего не хватает.",
          "`ABC` и `@abstractmethod` — инструмент формального контракта: ошибку видно при создании объекта. Саму абстракцию можно построить и без ABC."
        ],
        "syntax": "class Circle(Shape):\n    pass",
        "example": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        ...\n\nclass Circle(Shape):\n    pass\n\ntry:\n    Circle()\nexcept TypeError:\n    print(\"Ошибка: метод area не реализован\")\n# Ошибка: метод area не реализован",
        "id": "part-2"
      },
      {
        "title": "Общий код рядом с требованием",
        "paragraphs": [
          "В абстрактном классе держат не только пустые требования, но и готовые методы. `describe` написан один раз и пользуется `self.area()` — тем самым методом, который обязан быть у каждого наследника.",
          "Получается удобно: родитель задаёт правила и даёт общий код, а наследник дописывает только своё — формулу площади."
        ],
        "syntax": "def describe(self):\n    print(f\"Площадь: {self.area()}\")",
        "example": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\n    def describe(self):\n        print(f\"Площадь: {self.area()}\")\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\n    def area(self):\n        return self.side ** 2\n\nSquare(3).describe()\n# Площадь: 9",
        "note": "Абстракция — выделение существенного интерфейса. Наследование от ABC — лишь один из инструментов его описания. На практике важно другое: `abc` фиксирует обязательные методы и ловит забытую реализацию сразу.",
        "id": "part-3"
      }
    ],
    "id": "abstraction",
    "quick": {
      "summary": "Абстракция оставляет существенные операции и скрывает детали; ABC лишь формализует контракт.",
      "code": "class PaymentService:\n    def pay(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сумма должна быть положительной\")\n        receipt = self._send_request(amount)\n        print(f\"Оплачено: {receipt}\")\n\n    def _send_request(self, amount):\n        return f\"{amount} руб.\"\n\nPaymentService().pay(500)\n# Оплачено: 500 руб.",
      "takeaway": "Хорошая абстракция говорит «что можно сделать», не заставляя клиента знать «как это устроено»."
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
