import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';

const HawksDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get('https://api.example.com/hawks/players');
        setPlayers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  const data = {
      labels: players.map(player => player.name),
      datasets: [
          {
              label: 'Points',
              data: players.map(player => player.points),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
          },
      ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading player data!</p>;

  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="home" title="Player Stats">
        <Bar data={data} />
      </Tab>
      <Tab eventKey="profile" title="Team Overview">
        <h2>Team Statistics</h2>
        <p>Additional team stats can go here.</p>
      </Tab>
      <Tab eventKey="contact" title="Player Profiles">
        <h2>Player Profiles</h2>
        {players.map(player => (
          <div key={player.id}>
            <h3>{player.name}</h3>
            <p>Points: {player.points}</p>
            <p>Rebounds: {player.rebounds}</p>
            <p>Assists: {player.assists}</p>
          </div>
        ))}
      </Tab>
    </Tabs>
  );
};

export default HawksDashboard;