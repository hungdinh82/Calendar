import classNames from 'classnames/bind';
import styles from './LabelForm.module.scss';

const cx = classNames.bind(styles)

const LabelForm = ({ content, required }) => {
    return (
        <div className={cx("label", "c-3")} >
            <div className={cx("label_content")}>
                {content} :
                {required ? <div className={cx("required")}>*</div> : null}
            </div>
        </div>
    )
}

export default LabelForm