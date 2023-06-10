
export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс тeкущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
      }
    },

  createComment: (data) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({ type: 'comment/create-start' });
      
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: 'POST',
          body: JSON.stringify(data)
        });
        // Комментарий создан успешно

        dispatch({ type: 'comment/create-success', payload: {data: res.data.result} });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/create-error' });
      }
    }
  },

  openCommentForm: (id) => {
    return { type: 'comment/open-comment-form', payload: {id} };
  },

  openArticleCommentForm: (id) => {
    return { type: 'comment/open-article-form', payload: {id} };
  }
}
