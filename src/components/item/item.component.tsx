import './item.styles.scss';

const Item: React.FC<any> = ({ recipe, handlePreview }) => {
  const { name, thumbnail_url: thumbnailUrl, description, id } = recipe;
  return (
    <div className="item" id={id} onClick={handlePreview}>
      <div className="image">
        <img src={thumbnailUrl} className="photo" />
        <div className="description">
          <p className="text">{description}</p>
        </div>
      </div>
      <span className="name">{name}</span>
    </div>
  );
};

export default Item;
