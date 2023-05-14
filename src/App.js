import { Component } from "react";
import Bookslist from "./components/Books/index.js";
import book from "./books.json";


import "./App.css";

localStorage.setItem("myData", JSON.stringify(book.Books));

class App extends Component {
  state = {
    data: JSON.parse(localStorage.getItem("myData") || "[]"),
    newBookTitle: "",
    newBookAuthor: "",
    newImage:"",
    newDescription:'',
    currentPage: 1,
    booksPerPage: 6,
  };

  onChangeSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  onChangeAuthor = (event) => {
    this.setState({
      newBookAuthor: event.target.value,
    });
  };

  onChangeTitle = (event) => {
    this.setState({
      newBookTitle: event.target.value,
    });
  };

  onChangeImage = (event) => {
    this.setState({
      newImage: event.target.value,
    });
  };

  onChangeDescription = (event) => {
    this.setState({
      newDescription: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { data, newBookTitle, newBookAuthor,newImage,newDescription } = this.state;
    if (newBookTitle===""){
      alert("enter book name")
    }
    if (newBookAuthor===""){
      alert("enter author name")
    }
    if (newImage===""){
      alert("enter image url")
    }
    if (newDescription===""){
      alert("enter description")
    }
    
    if (newBookAuthor !=='' && newBookTitle!=='' && newImage !=='' && newDescription!==''){
    const newBook = {
      uniqueNo: Math.random().toString(36).substr(2, 9),
      name: newBookTitle,
      author: newBookAuthor,
      image:newImage,
      description:newDescription
    };
    const updatedData = [...data, newBook];
    this.setState({
      data: updatedData,
      newBookTitle: "",
      newBookAuthor: "",
      newImage:'',
      newDescription:'',
    });
    localStorage.setItem("myData", JSON.stringify(updatedData));
  }
  };

  handlePageChange = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };
  

  
  render() {
    const {
      currentPage,
      booksPerPage,
      data,
      newBookAuthor,
      newBookTitle,
      newImage,
      newDescription
    } = this.state;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    
    const searchResults = data.slice(indexOfFirstBook, indexOfLastBook);

    const npage=Math.ceil(data.length/booksPerPage)
    const numbers=[...Array(npage+1).keys()].slice(1)

    const renderPageNumbers = numbers.map((number) => {
      return (
        <li key={number} id={number} onClick={this.handlePageChange}>
          {number}
        </li>
      );
    });

    return (
      <div className="app-container">
        <div className="user-con">
          <h3 className="title">Enter Book Details</h3>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={newBookAuthor}
            className="input-field"
            placeholder="Enter Author name"
            onChange={this.onChangeAuthor}
          />{" "}
          <br />
          <input
            type="text"
            value={newBookTitle}
            className="input-field"
            placeholder="Enter Book Title"
            onChange={this.onChangeTitle}
          />{" "}
          <br />
          <input
            type="text"
            value={newImage}
            className="input-field"
            placeholder="Enter Image url"
            onChange={this.onChangeImage}
          />{" "}
          <br />
          <input
            type="text"
            value={newDescription}
            className="input-field"
            placeholder="Enter Description"
            onChange={this.onChangeDescription}
          />{" "}
          <br />
          <button type="submit" className="button">Add</button>
        </form>
        </div>
        <div>
        <h1 className="title">The List Of Books</h1>
        
        <ul className="list-container">
          {searchResults.map((eachUser) => (
            <Bookslist
              userDetails={eachUser}
              key={eachUser.uniqueNo}
              
            />
          ))}
        </ul>
        </div>
        <nav>
        <ul id="page-numbers">
          <li>prev</li>
          {renderPageNumbers}
          <li >Next</li>
          </ul>
        </nav>
        
      </div>
    );
  }
}

export default App;
