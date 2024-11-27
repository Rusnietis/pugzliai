export default function Fruit({fruit}){
    return(
        <div className={`fruit ${fruit.form.toLowerCase()}`} style={{backgroundColor: fruit.color}}>
            {fruit.name}
        </div>
    )
}