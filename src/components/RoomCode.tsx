import copyImg from '../assets/copy.svg';
import '../styles/room-code.scss';
type RoomCodeProps = {
  code: string;
}
export function RoomCode(props: RoomCodeProps){
  function copyToClipboard(){
    navigator.clipboard.writeText(props.code);
  }
  return (
    <button className="room-code" onClick={copyToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" style={{height: '40px'}}/>
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}