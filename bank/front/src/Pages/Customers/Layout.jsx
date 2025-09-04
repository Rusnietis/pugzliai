import Nav from '../../Components/Nav';
import Delete from './Delete';
import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';
import Create from './Create';
import List from './List';
import Edit from './Edit';
import Header from './Header';


export default function Layout() {
  const { editCustomer, customers } = useContext(Customers);

  if (customers === null) {
    return (
      <div className="loader">
        <div></div>
      </div>
    );
  }

  return (
    <div className="layout">
      <Nav />
      <main className="content">

        <section className="header-panel">
          <Header />
        </section>

        <section className="create-panel">
          <Create />
        </section>
        <section className="list-panel">
          <List  />
        </section>
      </main>
      <Delete />
      {editCustomer && <Edit />}
    </div>
  );
}