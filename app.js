const API_URL = 'http://localhost:8080';

function populateDropdowns() {
    fetch(`${API_URL}/lookups/coaches`)
        .then(response => response.json())
        .then(data => {
            const coachSelect = document.getElementById('coachId');
            coachSelect.innerHTML = '<option value="">Select a coach</option>';
            data.forEach(coach => {
                coachSelect.innerHTML += `<option value="${coach.value}">${coach.label}</option>`;
            });
        })
        .catch(error => console.error('Error fetching coaches:', error));

    fetch(`${API_URL}/lookups/leagues`)
        .then(response => response.json())
        .then(data => {
            const leagueSelect = document.getElementById('leagueId');
            leagueSelect.innerHTML = '<option value="">Select a league</option>';
            data.forEach(league => {
                leagueSelect.innerHTML += `<option value="${league.value}">${league.label}</option>`;
            });
        })
        .catch(error => console.error('Error fetching leagues:', error));
}

function fetchTeams() {
    fetch(`${API_URL}/teams`)
        .then(response => response.json())
        .then(responseData => {
            const tableBody = document.querySelector('#teamsTable tbody');
            tableBody.innerHTML = '';
            const promises = responseData.data.map(team => {
                return Promise.all([
                    fetch(`${API_URL}/coaches/${team.coach_id}`).then(res => res.json()),
                    fetch(`${API_URL}/lookups/leagues`).then(res => res.json())
                ]).then(([coachData, leaguesData]) => {
                    const coach = coachData.data[0];
                    const league = leaguesData.find(l => l.value === team.league_id);
                    return `
                        <tr>
                            <td>${team.id}</td>
                            <td>${team.name}</td>
                            <td>${coach.first_name} ${coach.last_name}</td>
                            <td>${league ? league.label : 'Unknown'}</td>
                            <td>${team.motto || ''}</td>
                            <td>
                                <button onclick="deleteTeam(${team.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
            });

            Promise.all(promises).then(rows => {
                tableBody.innerHTML = rows.join('');
            });
        })
        .catch(error => console.error('Error fetching teams:', error));
}


function handleFormSubmission(e) {
    e.preventDefault();
    const team = {
        name: document.getElementById('teamName').value,
        coach_id: document.getElementById('coachId').value,
        league_id: document.getElementById('leagueId').value,
        motto: document.getElementById('teamMotto').value,
        notes: document.getElementById('teamNotes').value
    };

    fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchTeams();
        document.getElementById('addTeamForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



function deleteTeam(id) {
    if (confirm("Are you sure you want to delete this team?")) {
        fetch(`${API_URL}/teams/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchTeams();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

function fetchPlayers() {
    fetch(`${API_URL}/players`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#playersTable tbody');
            tableBody.innerHTML = '';
            data.data.forEach(player => {
                const row = `
                    <tr>
                        <td>${player.first_name} ${player.last_name}</td>
                        <td>${player.team_id}</td>
                        <td>
                            <button onclick="showPlayerDetails(${player.id})">Details</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching players:', error));
}


function uploadPlayerPhoto(playerId) {
    const fileInput = document.getElementById('photoInput');
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('photo', file);
  
    fetch(`${API_URL}/players/${playerId}/photo`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('Photo uploaded successfully');
      showPlayerDetails(playerId);
    })
    .catch(error => console.error('Error uploading photo:', error));
  }
  

  function displayUpcomingEvents() {
    const eventsList = document.getElementById('eventsList');
    const events = [
        { name: "Season Kickoff", date: "January 15, 2025", description: "Opening ceremony for the new season" },
        { name: "Youth Training Camp", date: "February 1-5, 2025", description: "Special training camp for young players" },
        { name: "Wolverine Cup", date: "March 20-22, 2025", description: "Annual tournament for all league teams" }
    ];

    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${event.name}</strong><br>
            Date: ${event.date}<br>
            ${event.description}
        `;
        eventsList.appendChild(listItem);
    });
}

function showPlayerDetails(id) {
    fetch(`${API_URL}/players/${id}`)
        .then(response => response.json())
        .then(data => {
            const player = data.data[0];
            const content = document.getElementById('content');
            content.innerHTML = `
                <h2>Player Details</h2>
                <div class="player-profile">
                    <img src="${player.logo_path || 'placeholder.jpg'}" alt="${player.first_name} ${player.last_name}" class="player-image">
                    <div class="player-info">
                        <p><strong>Name:</strong> ${player.first_name} ${player.last_name}</p>
                        <p><strong>Email:</strong> ${player.email}</p>
                        <p><strong>Phone:</strong> ${player.phone}</p>
                        <p><strong>Address:</strong> ${player.address1} ${player.address2 || ''}, ${player.city}, ${player.state} ${player.zip}</p>
                        <p><strong>Team ID:</strong> ${player.team_id}</p>
                        <p><strong>Notes:</strong> ${player.notes}</p>
                    </div>
                </div>
                <form id="photoUploadForm">
                    <input type="file" id="photoInput" accept="image/*">
                    <button type="submit">Upload Photo</button>
                </form>
                <button id="backToPlayersListButton">Back to Players List</button>
            `;

            document.getElementById('photoUploadForm').addEventListener('submit', (e) => {
                e.preventDefault();
                uploadPlayerPhoto(id);
            });

            document.getElementById('backToPlayersListButton').addEventListener('click', () => {
                window.showPlayersList();
            });
        })
        .catch(error => console.error('Error fetching player details:', error));
}

  







document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('submit', function(e) {
        if (e.target && e.target.id === 'addTeamForm') {
            handleFormSubmission(e);
        }
    });
});
