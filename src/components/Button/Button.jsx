import css from 'components/Button/Button.module.css';

const Button = ({ onFech }) => {
  return (
    <button className={css.Button} type="button" onClick={onFech}>
      Load more
    </button>
  );
};

export default Button;
