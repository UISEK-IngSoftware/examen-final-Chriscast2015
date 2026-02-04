import {
  IonCard,
  IonCardContent,
  IonAvatar,
  IonItem,
  IonLabel
} from "@ionic/react";

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
}

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <img src={character.image} alt={character.name} />
        </IonAvatar>
        <IonLabel>
          <h2>{character.name}</h2>
          <p>Género: {character.gender}</p>
          <p>Estado: {character.status}</p>
        </IonLabel>
      </IonItem>
    </IonCard>
  );
};

export default CharacterCard;
