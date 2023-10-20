import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { fetchImages } from "./Api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMore } from "./LoadMore/LoadMore";
import { loadSpinner } from "./Loader/Loader";
import { ErrMsg } from "./ErrorMassage/ErrorMassage";
import toast, { Toaster } from 'react-hot-toast';
import { Layout } from "./Layout";

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  }

 const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    };

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const apiData = await fetchImages(query, page);
        const newImg = apiData.hits;
        setImages(prevState => ([...prevState, ...newImg]))

        if (newImg.length > 0) {
          toast.success(`Hooray! We found totalHits images: ${apiData.totalHits}`);
        } else {
          toast.error('Sorry, there are no images matching your search query. Please try again.');
        }
      
      } catch (error) {
        setError(error);
      
      } finally {
        setLoading(false);
      }
    }
    getImages()
  }, [query, page]);
    
    return (
      <Layout>
        <SearchBar onSubmit={handleSubmit} />
        {loading && (loadSpinner)}
        {error && <ErrMsg/>}
        {images.length > 0 && <ImageGallery addImages={images} />}
        {images.length > 0 && <LoadMore onClick={handleLoadMore} />}
        <Toaster position="top-right"/>
      </Layout>
    )
  }

