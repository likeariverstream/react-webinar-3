/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Пагинация
 * @param totalPages {Number}
 * @param currentPage {Number}
 * @returns {Array} массив ссылок на страницы
 */
export function getPageLinks(totalPages, currentPage = 1) {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);
  const links = [];

  if (totalPages <= 5) {
    // если всего 5 страниц или меньше, отображаем все страницы
    links.push(...pages);
  } else if (currentPage <= 3) {
    // если текущая страница ближе к началу, отображаем первые 5 страниц
    links.push(...pages.slice(0, 5));
    links.push('...');
    links.push(totalPages);
  } else if (currentPage >= totalPages - 2) {
    // если текущая страница ближе к концу, отображаем последние 5 страниц
    links.push(1);
    links.push('...');
    links.push(...pages.slice(totalPages - 5));
  } else {
    // иначе отображаем текущую страницу и две соседние с ней, а также многоточия и первую/последнюю страницы
    links.push(1);
    links.push('...');
    links.push(currentPage - 1);
    links.push(currentPage);
    links.push(currentPage + 1);
    links.push('...');
    links.push(totalPages);
  }
  
  return links;

};
