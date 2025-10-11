import Nav from '../../Components/Nav';
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
    <div>
      <div className="page-container" >
        <div>
          <List />
        </div>
      </div>
    </div>
  );

}