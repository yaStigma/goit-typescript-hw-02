import { useEffect, useState } from 'react'

// import css from './App.module.css'
import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from "../ImageGallery/ImageGallery"
import ErrorMassage from "../ErrorMassage/ErrorMassage"
import Loader from "../Loader/Loader"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import ImageModal from "../ImageModal/ImageModal"

import axios from 'axios'


export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const handleSubmit = (e, input) => {
    e.preventDefault();
    setQuery(input);
    setPage(1);
    setImages([]);

      };

  const fetchSearchedImages = async(query, page) => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          page: page,
          query: query,
          per_page: 12, 
        },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1"
        }
      })
      console.log(data);
      setImages(prevImages => [...prevImages, ...data.results]);
    } catch(err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };


  useEffect(() => {
    if (query) {
      fetchSearchedImages(query, page);
    }
  }, [page, query]);

  



   return(
    <>
     <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <ErrorMassage />}
      <ImageGallery images={images} onImageClick={openModal}/>
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage}/>
  

      

    </>
  )
}
