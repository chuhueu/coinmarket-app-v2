
const CoinNameRow = ({ name, icon }) => {
    return <div className="flex">
        <img src={icon} alt={name} width={20} height={20} />
        <p>{name}</p>
    </div>
}

export default CoinNameRow