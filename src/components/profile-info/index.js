import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileInfo(props) {
    const { options } = props
    const cn = bem('ProfileInfo');

    return (
        <div className={cn()}>
            <h2 className={cn('title')}>{options.translations.title}</h2>
            <div className={cn('prop')}>
                <div className={cn('label')}>{options.translations.name}:</div>
                <div className={cn('value')}>{options.name}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>{options.translations.phone}:</div>
                <div className={cn('value')}>{options.phone}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>{options.translations.email}:</div>
                <div className={cn('value')}>{options.email}</div>
            </div>
        </div>
    );
}

ProfileInfo.propTypes = {
    options: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string,
        translations: PropTypes.shape({
            title: PropTypes.string,
            name: PropTypes.string,
            phone: PropTypes.string,
            email: PropTypes.string
        }).isRequired
    })
}

export default memo(ProfileInfo);
