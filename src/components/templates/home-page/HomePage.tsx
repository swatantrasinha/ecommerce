import {useState, useEffect} from 'react';
import Dropdown from '../../atoms/Dropdown'
import useDataFetchQuery from '../../custom-hook/useDataFetchQuery'
import ProductList from '../../organisms/product-list/ProductList';
import useLocalStorage from '../../custom-hook/useLocalStorage';
import {type CategoryDataType, type ProductDataType, type StateType} from '../../types/ecommerce'
const HomePage = () => {
  const baseUri= import.meta.env.VITE_BACKEND_BASE_URI;

  const categotyDataResponse = useDataFetchQuery(`${baseUri}/categories`) as  StateType;
  const {loading: categoryLoading, error: categoryFetchError} = categotyDataResponse;
  const categoryOptions  = categotyDataResponse.data as  CategoryDataType[];
  
  const productListDataResponse = useDataFetchQuery(`${baseUri}/products`);
  const {loading: productListoading, error: productListError} = productListDataResponse;
  const productListData  = productListDataResponse.data as  ProductDataType[];
  


  const [category, setCategory]= useLocalStorage('categoryData', null);
  const [products, setProducts]=  useState<[] | ProductDataType[]>([]);
  
  
  useEffect(() => {  
    if(category?.categoryId &&  productListData) {
      const productsByCategory : ProductDataType[] =  productListData.filter(( ele : ProductDataType) =>  ele.categoryId.toString() === category.categoryId.toString());
      setProducts(productsByCategory);
    }
  }, [productListData, category?.categoryId])

  const setCategoryOption = (val: string) => {    
    const filteredCategory= categoryOptions.filter((ele: CategoryDataType) => ele.id.toString() === val.toString());
    if(filteredCategory && filteredCategory.length) {
      const selectedCategory= filteredCategory[0];
      const {id, name}= selectedCategory;
      const newCategorySelected= {categoryId:id, categoryName: name};
      setCategory(newCategorySelected);
    }
  }
  
  return (
    <div>
        <h1>HomePage</h1>
        {categoryFetchError && (<h2>Something went wrong in fetching categories ......</h2>)}
        {categoryLoading && (<div> Categories Are Loading ....</div>)}
        {categoryOptions && categoryOptions.length && (
          <section>
            <Dropdown 
              options={categoryOptions} 
              label='Select Categories'
              setCategoryOption={setCategoryOption} 
              category={category}
            />
          </section>
        )}
        {productListError && (<h3>Something went wrong- Products cannot be fetched</h3>)}
        {productListoading && (<h2>Loading Product List ...</h2>)}
        {category && (
          <div>
              <ProductList category={category} products={products}  />
          </div>
        )}
       
    </div>
  )
}

export default HomePage;