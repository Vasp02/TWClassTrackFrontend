import './RoundButton.css'
const RoundButton = ({ icon, onClick }) => {
    return (
        <button className="round-button" onClick={onClick}>
            {icon}
        </button>
    );
}

export default RoundButton;