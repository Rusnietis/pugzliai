export default function Fruit({ fruit }) {
    return (
        <div className={`fruit ${fruit.form.toLowerCase()}`} style={{
            backgroundColor: fruit?.temp ? '#777777' : fruit.color
        }}>
            <div>{fruit.name}</div>
            {
                fruit.temp
                    ?
                    <span>
                        <b>Edit</b>
                        <b>Delete</b>
                    </span>
                    :
                    <span>
                        <b><a href={'#fruits/edit/' + fruit.id}>Edit</a></b>
                        <b><a href="">Delete</a></b>
                    </span>
            }
        </div>
    )
}