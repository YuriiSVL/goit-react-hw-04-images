import css from 'components/Button/Button.module.css';

const Button = ({ fech }) => {
  return (
    <button className={css.Button} type="button" onClick={fech}>
      Load more
    </button>
  );
};

export default Button;
