
const CoinNameRow = ({ name, icon, clicked }) => {
    return <div className="flex" onClick={clicked}>
        <img src={icon} alt={name} width={20} height={20} />
        <p>{name}</p>
    </div>
}

export default CoinNameRow