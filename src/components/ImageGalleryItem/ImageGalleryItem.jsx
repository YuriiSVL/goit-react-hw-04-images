import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, largeUrl, tags, onSelect }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onSelect(largeUrl)}>
      <img className={css['ImageGalleryItem-image']} src={url} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  largeUrl: PropTypes.string,
  tags: PropTypes.string,
  onSelect: PropTypes.func,
};

export default ImageGalleryItem;
