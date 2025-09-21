import Nav from '../../Components/Nav';
import Create from './Create';
// import Delete from './Delete';
// import { useContext } from 'react';
// import { Customers } from '../../Contexts/Customers';
// import Create from './Create';
import List from './List';
import './StoryCard.scss';
// import Edit from './Edit';
// import Header from './Header';


export default function Layout() {
  // const { editCustomer, customers } = useContext(Customers);

  // if (customers === null) {
  //   return (
  //     <div className="loader">
  //       <div></div>
  //     </div>
  //   );
  // }

  return (
     <div className="page-container">
      <div className="left-col">
        <Create />
      </div>
      <div className="right-col">
        <List />
      </div>
    </div>
  );

}