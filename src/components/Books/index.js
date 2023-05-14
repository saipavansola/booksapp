import "./index.css";

const Bookslist = (props) => {
  const { userDetails} = props;
  const { name, author,image ,description} = userDetails;
  
  return (
    <li className="user-card-container">
      
      <img src={image} className="book-image" alt="book" />
      <div className="user-details-container">
        <h1 className="user-name"> Title :{name} </h1>
        <p className="user-designation">Author name: {author} </p>
        <p>Summary :{description}</p>
      </div>
      
    </li>
  );
};

export default Bookslist;
