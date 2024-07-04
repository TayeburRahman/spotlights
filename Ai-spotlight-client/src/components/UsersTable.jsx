import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const UsersTable = ({ item, index, handleMakeAdmin, handleMakeUser, route }) => {

  const navigate = useNavigate()
  // component code here
  return (
    <tr className="text-left">
      <td>{index + 1}</td>

      <td className="flex items-center gap-4">
        <img
          className="rounded-full h-10 w-10 object-cover"
          src={item?.userImage}
          alt={item?.userName}
        />
        <strong className="capitalize">{item?.userName}</strong>
      </td>

      <td>{item?.userEmail}</td>

      {
        route === 'publication' && (
          <td>{item?.invoice_date}</td>
        )
      }

{
        route === 'publication' ? (
          <td className="capitalize">{item?.payment && item?.payment }</td>
        ):(
          <td className="capitalize">{item?.role }</td>
        )
      }

      

     

      {route === 'publication' && (
        <td>
          <Button 
            size="small"
            colors="transparent"
            onClick={e => navigate(`/dashboard/manage-order/${item?._id}`) }
          >
            Go Publication
          </Button>
        </td>
      )}

      {route !== 'publication' && item?.role === "user" && (
        <td>
          <Button
            onClick={() => handleMakeAdmin(item?._id)}
            size="small"
            colors="transparent"
          >
            Admin
          </Button>
        </td>

      )}

      {route !== 'publication' && item?.role === "admin" && (
        <td>
          <Button
            onClick={() => handleMakeUser(item?._id)}
            size="small"
            colors="transparent"
          >
            User
          </Button>
        </td>

      )}


    </tr>
  );
};

UsersTable.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleMakeAdmin: PropTypes.func.isRequired,
  handleMakeUser: PropTypes.func.isRequired,
};

export default UsersTable;