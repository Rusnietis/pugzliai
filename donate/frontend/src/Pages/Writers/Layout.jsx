import Nav from '../../Components/Nav';
import Create from './Create';
import List from './List';
import '../../Style/StoryCard.scss';




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