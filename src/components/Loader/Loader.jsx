import css from 'components/Loader/Loader.module.css';

const Loader = ({ children }) => {
  return <div className={css.Loader}>{children}</div>;
};

export default Loader;
