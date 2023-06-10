import listToTree from '../../utils/list-to-tree';

// Начальное состояние
const initialState = {
    items: [],
    count: null,
    waiting: false, // признак ожидания загрузки
    open: null
  }

  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'comments/load-start':
        return { ...state, items: [], count: 0, waiting: true};

      case 'comments/load-success':
        return { 
          ...state, 
          items: action.payload.data.items, 
          count: action.payload.data.count, 
          waiting: false};;

      case 'comments/load-error':
        return { ...state, items: [], count: null, waiting: false}; //@todo текст ошибки сохранить?

      case 'comment/create-start':
        return { ...state, waiting: true};

      case 'comment/create-success':
        return { ...state, 
          item: action.payload.data,
          items: [...state.items, action.payload.data],
          waiting: false};

      case 'comment/create-error':
        return { ...state, waiting: false}; //@todo текст ошибки сохранить?

      case 'comment/open-comment-form':
        return { ...state, open: action.payload.id};

      case 'comment/open-article-form':
        return { ...state, open: action.payload.id};

      default:
        // Нет изменений
        return state;
    }
  }

  export default reducer;
