import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonText,
  IonItem,
  IonAvatar,
  IonLabel
} from '@ionic/react';
import './Home.css';

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
}

const Home: React.FC = () => {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://futuramaapi.com/api/characters',
        {
          params: {
            orderBy: 'id',
            orderByDirection: 'asc',
            page: 1,
            size: 50
          }
        }
      );
      setCharacters(response.data.items);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const refresh = async (e: CustomEvent) => {
    await loadCharacters();
    e.detail.complete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personajes de Futurama</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonLoading isOpen={loading} message="Cargando personajes..." />

        {error && (
          <IonText color="danger">
            <p style={{ padding: '16px' }}>
              Error al cargar los personajes.
            </p>
          </IonText>
        )}

        {!loading && !error && characters.length === 0 && (
          <IonText>
            <p style={{ padding: '16px' }}>
              No hay personajes disponibles.
            </p>
          </IonText>
        )}

        <IonList>
          {characters.map((character) => (
            <IonItem key={character.id}>
              <IonAvatar slot="start">
                <img src={character.image} alt={character.name} />
              </IonAvatar>
              <IonLabel>
                <h2>{character.name}</h2>
                <p>Género: {character.gender}</p>
                <p>Estado: {character.status}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
