/* Единственная точка регистрации разделов. Порядок здесь = порядок навигации. */
window.PythonBase = {
  content: {},
  libraries: {},
  activeTechnology: 'python',
  catalog: {
    title: 'QA Base',
    tracks: [
      { id: 'qa', title: 'QA', description: 'Основа ручного тестирования', status: 'planned' },
      { id: 'aqa', title: 'AQA', description: 'Автоматизация тестирования', status: 'ready', technologies: [
        { id: 'python', title: 'Python', description: 'Понятная база языка: от первой переменной до декораторов.', status: 'ready', categories: [
          { id: 'topics', title: 'Основная теория', description: 'Типы, коллекции, функции и работа с ошибками', mark: '01' },
          { id: 'classes', title: 'Классы', description: 'Объекты, атрибуты и методы', mark: '02' },
          { id: 'oop', title: 'ООП', description: 'Интерфейсы, наследование и композиция', mark: '03' },
          { id: 'decorators', title: 'Декораторы', description: 'Обёртки, аргументы и порядок вызовов', mark: '04' },
          { id: 'contexts', title: 'Контекстные менеджеры', description: 'with, ресурсы и гарантированная уборка', mark: '05' },
          { id: 'builtins', title: 'Функции и стандартная библиотека', description: 'Готовые инструменты для повседневных задач', mark: '06' },
          { id: 'methods', title: 'Методы коллекций', description: 'Что вызвать, что вернётся и что изменится', mark: '07' },
        ] },
        { id: 'pytest', title: 'Pytest', description: 'Фикстуры, проверки и организация тестов', status: 'planned' },
        { id: 'playwright', title: 'Playwright', description: 'Автоматизация браузера и UI-тесты', status: 'planned' },
      ] },
    ],
  },
};

// Каждый учебный раздел хранит свои категории и материалы отдельно.
window.PythonBase.libraries.python = window.PythonBase.content;
