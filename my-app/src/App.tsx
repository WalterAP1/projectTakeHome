import './App.css';
import { ProductList } from './products/productPage';
import { ProjectAppBar } from './menu/appBar';

export const App = () => {
  return (
    <div className="App">
        <ProjectAppBar />
        <ProductList />
    </div>
  )
}

