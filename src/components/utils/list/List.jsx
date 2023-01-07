import "./list.scss"
import Datatable from "../datatable/Datatable"

const AddList = ({columns, apipath}) => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable columns={columns} apipath={apipath}/>
      </div>
    </div>
  )
}
export default AddList