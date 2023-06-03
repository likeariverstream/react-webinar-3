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

export function createTree(flatArray) {
  const tree = [];

  const nodes = flatArray.reduce((acc, cur) => {
    acc[cur._id] = {
      ...cur,
      children: []
    };
    return acc;
  }, {});
  flatArray.forEach(node => {
    const parent = node.parent;
    if (parent) {
      nodes[parent._id].children.push(nodes[node._id]);
    } else {
      tree.push(nodes[node._id]);
    }
  });

  const addPrefixes = (node, prefix) => {
    node.prefix = prefix;
    node.children.forEach((child, index) => {
      const newPrefix = prefix + '-';
      addPrefixes(child, newPrefix);
    });
  };

  tree.forEach(node => {
    addPrefixes(node, '');
  });

  return tree;
}

export function createFlatArray(tree) {
  const flatArray = [];

  const addNode = (node) => {
    flatArray.push({
      ...node,
      parent: node.parent ? node.parent._id : null
    });
    node.children.forEach(child => {
      addNode(child);
    });
  };

  tree.forEach(node => {
    addNode(node);
  });

  return flatArray;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props = {}) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp).toUTCString) {
    props.expires = (exp).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, '', { expires: -1 });
}
