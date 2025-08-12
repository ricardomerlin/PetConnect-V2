import { useEffect, useState } from 'react'

function Profile({ profile }) {
    const [animals, setAnimals] = useState([]);

    function handleDeletedAnimal(deletedAnimal) {
        setAnimals(animals.filter(animal => animal.id !== deletedAnimal.id));
    }

    const reformattedDate = new Date(profile.birthday).toLocaleDateString();

    return (
        <div className='profile-card'>
            <div className='profile-top-bar'></div>
            <img className='profile-pic' src={`data:image/jpeg;base64,${profile.profile_picture}`} alt="Profile"/>
            <div className='profile-information'>
                <h1>{profile.name}</h1>
                <h2>Birthday: {reformattedDate}</h2>
                <h3>{profile.description}</h3>
            </div>    
            <h2 style={{marginBottom: '0'}}><u>Saved Animals:</u></h2>
            <ProfileAnimalCard animals={animals} onDelete={handleDeletedAnimal}/>
        </div>
    );    
}

export default Profile;