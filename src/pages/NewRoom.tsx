import {FormEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebese';
import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
export function NewRoom(){
  const {user} = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();
  async function handleCreateRoom(event : FormEvent){
    event.preventDefault();
    if(newRoom.trim() === ''){
      return;
    }
    const roomRef = database.ref('rooms');

    const firebeseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebeseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom} 
            />
            <Button type="submit" >
              Criar uma nova sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente?<Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}