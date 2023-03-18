import { useState } from "react";

function SmartList({ data, maxRows, renderItemFn }) {
    const [numRows, setNumRows] = useState(maxRows);
    // Chat GPT support
    function handleMoreClick() {
        if(numRows < data.length) {
            setNumRows(Math.min(data.length, numRows + maxRows));
        }
    }
      
    function handleLessClick() {
        if(numRows > maxRows) {
            setNumRows(Math.max(maxRows, numRows - maxRows));
        }
    }
  
    return (
      <div className="px-2 pt-4 pb-2 border shadow rounded">
        <ul>
          {data.slice(0, numRows).map((item, index) => (
            <li key={index}>{renderItemFn(item)}</li>
          ))}
        </ul>
        <hr />
        <div className="d-flex justify-content-between px-2">
            {
                (numRows > maxRows) && 
                <button className="btn btn-sm btn-info mr-auto" onClick={handleLessClick}>Show Less</button>
            }
            {
                (numRows < data.length) &&
                <button className="btn btn-sm btn-success ml-auto" onClick={handleMoreClick}>Show More</button>
            }
        </div>
      </div>
    );
}

function ListRequestResult({
    setShowResult = () => {},
    listResult = [],
    currentSelectedId = null,
    handleRemoveItem = () => {}
})
{

    const handleItemSelected = (item) => {
        setShowResult(item);
    }

    return ( 
        <>
            <h3>Histories</h3>
            <SmartList 
                data={listResult}
                maxRows={5}
                renderItemFn={(item) => (
                    <>
                    <span style={{ cursor: "pointer" }} onClick={(e) => handleItemSelected(item)} className={(currentSelectedId === item.instance_id) ? "text-primary" : "text-dark"}>
                        {item.module_name + " | " + new Date(item.upload_at).toLocaleString()}
                    </span>
                    <u style={{ cursor: "pointer" }} onClick={(e) => handleRemoveItem(item)} className="mx-2 fw-bold text-mute text-danger">Remove</u>
                    </>
                )}
            />
        </>
    );
}

export default ListRequestResult;