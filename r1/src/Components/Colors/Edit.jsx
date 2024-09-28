import { useEffect, useState } from 'react';

export default function Edit({ editData, setEditData, setUpdateData }) {

    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    useEffect(_ => {
        if (null === editData) {
            return;
        }
        setColor(editData.color);
        setSize(editData.size);
    }, [editData]);

    const save = _ => {
        setUpdateData(
            { 
                ...editData,
                color,
                size: parseInt(size),
        });
    }

    if (null === editData) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit</h5>
                        <button type="button" className="btn-close" onClick={_ => setEditData(null)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Color code</label>
                            <input type="color" className="form-control form-control-color" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Square size: {size} px</label>
                            <input type="range" className="form-range" min="100" max="300" value={size} onChange={e => setSize(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="green" onClick={save}>Save</button>
                        <button type="button" className="black" onClick={_ => setEditData(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );

}