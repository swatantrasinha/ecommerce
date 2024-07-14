import {useState, useEffect} from 'react';
import Dropdown from '../../atoms/dropdown/Dropdown'
import useDataFetchQuery from '../../custom-hook/useDataFetchQuery'
import ProductList from '../../organisms/product-list/ProductList';
import useLocalStorage from '../../custom-hook/useLocalStorage';
import {type CategoryDataType, type ProductDataType, type StateType} from '../../types/ecommerce'
const HomePage = () => {
  const baseUri= import.meta.env.VITE_BACKEND_BASE_URI;

  const categotyDataResponse = useDataFetchQuery(`${baseUri}/categories`) as  StateType; // Category Data - to shown in Dropdown
  const {loading: categoryLoading, error: categoryFetchError} = categotyDataResponse;
  const categoryOptions  = categotyDataResponse.data as  CategoryDataType[];
  
  const productListDataResponse = useDataFetchQuery(`${baseUri}/products`); // Products Data - to show in product list
  const {loading: productListoading, error: productListError} = productListDataResponse;
  const productListData  = productListDataResponse.data as  ProductDataType[];
  
  const [category, setCategory]= useLocalStorage('categoryData', null); 
  // initially set null in localStorage once option is selected in dropdown it will save the selected value in local storage

  const [products, setProducts]=  useState<[] | ProductDataType[]>([]);
  // product lists to show as per category selected in dropdpwn
  
  useEffect(() => {  
    // change value in product list based on option in category dropdown
    if(category?.categoryId &&  productListData) {
      const productsByCategory : ProductDataType[] =  productListData.filter(( ele : ProductDataType) =>  ele.categoryId.toString() === category.categoryId.toString());
      setProducts(productsByCategory);
    }
  }, [productListData, category?.categoryId])

  const setCategoryOption = (val: string) => {    // val is option selected in dropdown
    const filteredCategory= categoryOptions.filter((ele: CategoryDataType) => ele.id.toString() === val.toString());
    if(filteredCategory && filteredCategory.length) {
      const selectedCategory= filteredCategory[0];
      const {id, name}= selectedCategory;
      const newCategorySelected= {categoryId:id, categoryName: name}; 
      setCategory(newCategorySelected); // this will save new selected value of dropdown in localstorage
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
              setDropdownValue={setCategoryOption} 
              initialValue={category?.categoryId}
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