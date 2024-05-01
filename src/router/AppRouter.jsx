import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '../components/header/Landing';
import { Login } from '../components/auth/Login';
import { Header } from '../components/header/Header';
import { RechargeList } from '../components/recharges/RechargeList';
import { ShopList } from '../components/commerce/ShopList';
import { OrderList } from '../components/orders/OrderList';
import { Pag1RegNeg } from '../components/register/Pag1RegNeg';
import { Pag2RegNeg } from '../components/register/Pag2RegNeg';
import { Pag3RegNeg } from '../components/register/Pag3RegNeg';
import { Pag4RegNeg } from '../components/register/Pag4RegNeg';
import { Pag5RegNeg } from '../components/register/Pag5RegNeg';
import { PagRules } from '../components/register/PagRules';
import { SearchList } from '../components/commerce/SearchList';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Login />} />
        <Route path='/pag1' element={<Pag1RegNeg />} />
        <Route path='/pag2' element={<Pag2RegNeg />} />
        <Route path='/pag3' element={<Pag3RegNeg />} />
        <Route path='/pag4' element={<Pag4RegNeg />} />
        <Route path='/pag5' element={<Pag5RegNeg />} />
        <Route path='/pag6' element={<PagRules />} />
        <Route path='/searchtext' element={<SearchList />} />
        <Route path='/header' element={<Header />}>
          <Route index element={<Landing />} />
          <Route path='landing' element={<Landing />} />
          <Route path='shoplist' element={<ShopList />} />
          <Route path='orderlist' element={<OrderList />} />
          <Route path='recharges' element={<RechargeList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
