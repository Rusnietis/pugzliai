import { useState } from "react";

export default function Create({ setCreateData }) {

    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState(100);

    const handleSubmit = _ => {
        setCreateData(
            {
                color,
                size: +size,  //size convert string to number
            });
        setColor('#000000');
        setSize(100);
    }

    return (
        <div className="card">

            <div className="card-header">
                <h2>Create new Color</h2>
            </div>
            <div className="card-body">
                <label className="form-label">Color code</label>
                <input type="color" className="form-control form-control-color" value={color} onChange={e => setColor(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label" >Square size: {size} px</label>
                <input type="range" className="form-range" min="100" max="300" value={size} onChange={e => setSize(e.target.value)} />

            </div>
            <div className="mb-3">
                <button className="green" onClick={handleSubmit}>Create</button>
            </div>

        </div>

    );

}