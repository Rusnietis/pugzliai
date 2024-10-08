export default function Delete({deleteData, setDeleteData, setDestroyData}) {

    if(null === deleteData) {
        return null
    }

    return (
        <div className="modal" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Patvirtinkite</h5>
                        <button type="button" className="btn-close" onClick={_=> setDeleteData(null)} ></button>
                    </div>
                    <div className="modal-body">
                        <p>Ar jus esate tikras?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="red" onClick={_=>setDestroyData(deleteData)}>Delete</button>
                        <button type="button" className="blue" onClick={_=> setDeleteData(null)}  >Cancel</button>

                    </div>
                </div>
            </div>
        </div>

    )
}