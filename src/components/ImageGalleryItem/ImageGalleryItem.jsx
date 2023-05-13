const ImageGalleryItem = ({ url, tags }) => {
  console.log(url);
  return (
    <li className="gallery-item">
      <img src={url} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
