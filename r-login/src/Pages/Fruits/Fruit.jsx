export default function Fruit({fruit}){
    return(
        <div className={`fruit ${fruit.form.toLowerCase()}`} style={{
            backgroundColor: fruit?.temp ? '#777777' : fruit.color
            }}>
            {fruit.name}
        </div>
    )
}