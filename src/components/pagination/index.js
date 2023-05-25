import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {getPageLinks} from '../../utils';

function Pagination({ totalPages, currentPage = 1 }) {
  const cn = bem('Pagination');
  return (
    <nav className={cn()}>
      {getPageLinks(totalPages, currentPage).map((page, index) => (
        <li key={index} className={cn(`item${page === currentPage ? '_active' : ''}`)}>
          {page === '...' ? (
            <span className={cn('span')}>...</span>
          ) : (
            <Link to={`/${page}`} className={cn('link')}>{page}</Link>
          )}
        </li>
      ))}
    </nav>
  );
};

export default memo(Pagination)
