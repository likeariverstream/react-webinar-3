import { memo, useCallback, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Spinner from '../../components/spinner';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions'
import CommentForm from '../../components/comment-form';
import CommentList from '../../components/comment-list';
import { transformComments } from '../../utils/transform-comments';
import { Link } from 'react-router-dom';
import CommentsLayout from '../../components/comments-layout';

function CommentsSection() {
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  const [values, setValues] = useState({
    text: '',

  });
  const select = useSelectorRedux(state => ({
    items: state.comments.items,
    count: state.comments.count,
    waiting: state.comments.waiting,
    open: state.comments.open,
    item: state.comments.item
  }), shallowequal);
  useInit(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(commentsActions.openArticleCommentForm(params.id))
  }, [params.id]);
  const exists = useSelector(state => state.session.exists)
  const user = useSelector(state => state.session.user.profile)
  const { t } = useTranslate();

  const options = {
    comments: useMemo(() => (transformComments(select.items)), [select.items]),
  }

  const callbacks = {
    // Добавление комментария
    addComment: useCallback((id, type) => {
      const data = {
        text: values.text,
        parent: {
          _id: id,
          _type: type
        }
      }
      if (values.text !== '') {
        dispatch(commentsActions.createComment(data))
        .then(() => setValues({text: ''}))
        .then(() => {
          dispatch(commentsActions.openArticleCommentForm(params.id))
        })
      }
    }, [select.items, values.text, select.item]),
    // Колбэк на ввод в формe
    onChange: useCallback((value, name) => {
      setValues(prevValues => ({ ...prevValues, [name]: value }));
    }, [values.text]),

    openForm: useCallback((id) => {
      dispatch(commentsActions.openCommentForm(id));
    }, [select.open]),

    closeForm: useCallback(() => {
      dispatch(commentsActions.openArticleCommentForm(params.id));
      setValues({text: ''})
    }, [select.open])
  }

  return (
    <CommentsLayout side='start' padding='medium'>
      <h2>{`${t('comments.title')} (${select.count || 0})`}</h2>
      <Spinner active={select.waiting}>
        <CommentList
          data={options.comments}
          onClick={callbacks.addComment}
          value={values.text}
          name='text'
          onChange={callbacks.onChange}
          type='comment'
          path='/login'
          exists={exists}
          open={select.open}
          openForm={callbacks.openForm}
          closeForm={callbacks.closeForm}
          cancel={t('comments.form.cancel')}
          login={t('comments.login')}
          title={t('comments.form.answer')}
          button={t('comments.form.button')}
          descriptionAnswer={t('comments.form.answer')}
          cancelSend={t('comments.form.cancel')}
          answer={t('comments.answer.answer')}
          user={user?.name} />
      </Spinner>
      {exists ? (select.open === params.id && <CommentForm
        id={params.id}
        value={values.text}
        onChange={callbacks.onChange}
        onClick={callbacks.addComment}
        type='article' name='text'
        title={t('comments.form.title')}
        button={t('comments.form.button')} />) : (
        <span><Link to='/login' state={{ back: location.pathname }}>{t('comments.login')}</Link>{t('comments.description')}</span>)}
    </CommentsLayout>
  );
}

export default memo(CommentsSection);
