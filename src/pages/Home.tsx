import {FormEvent, useState} from 'react';
import { database } from '../services/firebese';
import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleImg from '../assets/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
export function Home(){
  const history = useHistory();

  const {user,signWithGoogle} = useAuth();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if(!user){
      await signWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();
    if(roomCode.trim() === ''){
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exists.');
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration" />
        <strong>Crie salasde Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="Logo do google" />
            <span>Crie sua sala com o Google</span>
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode} 
            />
            <Button type="submit" >
              Entrar em uma sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}