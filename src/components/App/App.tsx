import { useEffect, useState, FormEvent } from 'react'

// import css from './App.module.css'
import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from "../ImageGallery/ImageGallery"
import ErrorMassage from "../ErrorMassage/ErrorMassage"
import Loader from "../Loader/Loader"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import ImageModal from "../ImageModal/ImageModal"
import { Image } from '../../type' 
import axios , { AxiosResponse } from 'axios'



export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<null | Image>(null);


  const handleSubmit = (e: FormEvent<HTMLFormElement>, input: string): void => {
    e.preventDefault();
    setQuery(input);
    setPage(1);
    setImages([]);

      };

  const fetchSearchedImages = async(query: string, page: number): Promise<void> => {
    try {
      setLoading(true);
      setError(false);
      const response: AxiosResponse<{ results: Image[] }> = await axios.get(`https://api.unsplash.com/search/photos`, {
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
      const data = response.data;
      console.log(data);
      setImages(prevImages => [...prevImages, ...data.results]);
    } catch(err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = (): void => {
    setPage(prevPage => prevPage + 1);
    
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
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
