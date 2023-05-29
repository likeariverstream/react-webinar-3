import React, {memo} from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Spinner() {
  const cn = bem('Spinner');
  return(
    <div className={cn()}></div>
  )
}

export default memo(Spinner);
