export type CategoryDataType= {
    id: string,
    name: string 
}

export type ProductDataType= {
    id: string,
    name: string 
    imageUrl: string,
    categoryId: string
}

export type StoredCategoryData= {
    categoryId: string, 
    categoryName: string
}
export type StateType = {
    data:  ValidResponseDataType;
    loading: boolean;
    error: null | Error;
};
export type ValidResponseDataType= ProductDataType | ProductDataType[] | CategoryDataType[];

export type ActionType = { type: 'LOADING' }   | { type: 'SUCCESS'; payload: ValidResponseDataType }   | { type: 'ERROR'; payload: Error };

