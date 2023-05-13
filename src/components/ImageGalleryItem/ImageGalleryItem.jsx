import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, largeUrl, tags, onSelect }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onSelect(largeUrl)}>
      <img className={css['ImageGalleryItem-image']} src={url} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
