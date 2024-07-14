import {useEffect} from 'react';
import { type DropdownPropsType } from './Dropdown.type';

// Dropdown component 
const Dropdown = ({options, label, setDropdownValue, initialValue}: DropdownPropsType) => {
  /* initalSelectedValue ->  if some value is saved in localstorage it will be picked from there
  else th first option in json file is considered as default value */

  const initalSelectedValue= initialValue || options[0].id;  

    useEffect(() => {
      /* set value in dropdpwn for first time 
      once user press back button on product-detail page 
      initalSelectedValue will have data from localStorage and the value will be set  */
      
      setDropdownValue(initalSelectedValue);  
    }, [])
    
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue= event.target.value; 
        setDropdownValue(selectedValue);
    }

  return (
    <div className='dropdown-container'>
       <label htmlFor='dropdown'> {label} </label>

        <select id='dropdown'  defaultValue={initalSelectedValue} onChange={handleChange}>
            {options && options.map((option, index) => 
                <option key={`option-${option.id}-${index}}`} value={option.id}>{option.name}</option>
            )}
        </select>
    </div>
  )
}

export default Dropdown