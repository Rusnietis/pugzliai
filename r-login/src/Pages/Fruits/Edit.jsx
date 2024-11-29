import { useContext, useEffect, useState } from "react";
import TopNav from "../TopNav";
import { Fruits } from "../../Contexts/Fruits";
import { v4 as uuidv4 } from 'uuid';
import { Router } from "../../Contexts/Router";

export default function Edit() {

   

    
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [form, setForm] = useState('');

    const {fruits, setCreateFruit, setFruits } = useContext(Fruits)
    const params = useContext(Router);

    useEffect(_=>{
        if (null == fruits) {
            return
        }
        const fruit = fruits.find(fruit => fruit.id === +params[1]);
        if (null == fruit) {
            return
        }
        setName(fruit.name);
        setColor(fruit.color);
        setForm(fruit.form.toLowerCase());
    },[fruits, params[1]], setName, setColor, setForm)


    const add = _ => {
        const fruit = {
            name,
            color,
            form,
            id: uuidv4(),
            authorized: false
        }
        console.log(fruit);
        setFruits(f => [...f, {...fruit, temp: true }]);
        setCreateFruit(fruit);
        window.location.href = '#fruits';
    }

    if (!fruits) return (
        <div>
            <TopNav />
            <h1>Loading...</h1>
        </div>
    );

    return (
        <div>
            <TopNav />
            <h1>Edit fruit</h1>
            <div className="fruit-bin">
                <div className="form">
                    <div className="form-group">
                        <label>name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>color</label>
                        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Form</label>
                        <div className="checkboxes">
                            <div>
                                <input id="s" type="checkbox" checked={'square' === form} onChange={_ => setForm('square')} />
                                <label htmlFor="s">Square</label>
                            </div>
                            <div>
                                <input id="c" type="checkbox" checked={'circle' === form} onChange={_ => setForm('circle')} />
                                <label htmlFor="c">Circle</label>
                            </div>
                            <div>
                                <input id="r" type="checkbox" checked={'rounded' === form} onChange={_ => setForm('rounded')} />
                                < label htmlFor="r">Rounded</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="green" onClick={add}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}