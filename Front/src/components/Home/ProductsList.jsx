import { Products } from "./Products"

export const ProductsList = ({items}) =>{
    return items.map((item) => <Products key={item._id} item={item} />)
}