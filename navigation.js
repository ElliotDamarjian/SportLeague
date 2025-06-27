document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const homeButton = document.getElementById('homeButton');
    const teamRegButton = document.getElementById('teamRegButton');

    function showHomePage() {
        content.innerHTML = `
            <div class="home-container">
                <h1>Welcome to Wolverine Soccer League</h1>
                
                
                <div class="league-info">
                    <h2>Our Leagues</h2>
                    <ul>
                        <li>Pro League - For elite players</li>
                        <li>College League - Showcasing university talent</li>
                        <li>High School League - Developing young stars</li>
                    </ul>
                </div>
                
                <div class="features">
                    <h2>League Features</h2>
                    <ul>
                        <li>Team Management - Register and manage your soccer teams</li>
                        <li>Player Profiles - Detailed information on all registered players</li>
                        <li>Match Scheduling - Stay updated with the latest game schedules</li>
                        <li>News and Announcements - Get the latest league updates</li>
                    </ul>
                </div>
                
                <div class="cta">
                    <p>Join the Wolverine Soccer League today and be part of the action!</p>
                    
                </div>
            </div>
        `;
    }

    function showTeamRegistration() {
        content.innerHTML = `
            <div class="registration-container">
                <div class="upcoming-events">
                    <h2>Upcoming Events</h2>
                    <ul id="eventsList"></ul>
                </div>
                <div class="registration-form">
                    <h2>Team Registration</h2>
                    <form id="addTeamForm">
                        <div class="form-group">
                            <label for="teamName">Team Name</label>
                            <input type="text" id="teamName" required>
                        </div>
                        <div class="form-group">
                            <label for="coachId">Coach</label>
                            <select id="coachId" required></select>
                        </div>
                        <div class="form-group">
                            <label for="leagueId">League</label>
                            <select id="leagueId" required></select>
                        </div>
                        <div class="form-group">
                            <label for="teamMotto">Team Motto</label>
                            <input type="text" id="teamMotto">
                        </div>
                        <div class="form-group">
                            <label for="teamNotes">Team Notes</label>
                            <textarea id="teamNotes"></textarea>
                        </div>
                        <button type="submit">Add Team</button>
                    </form>
                </div>
            </div>
            <div class="teams-list">
                <h2>Teams List</h2>
                <table id="teamsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Coach</th>
                            <th>League</th>
                            <th>Motto</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        `;
        populateDropdowns();
        fetchTeams();
        displayUpcomingEvents();
    }
    
    

    window.showPlayersList = function() {
        content.innerHTML = `
            <h2>Players List</h2>
            <table id="playersTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        fetchPlayers();
    };

    function showNewsFeed() {
        content.innerHTML = `
            <h2>Soccer News</h2>
            <div id="newsFeed"></div>
        `;
        displayNews();
    }


    function showMatchesInfo() {
        content.innerHTML = `
            <div class="match-schedule-container">
                <h2>Wolverine Soccer League Match Schedule</h2>
                <div class="league-schedules">
                    <div class="league-schedule">
                        <h3>Pro League</h3>
                        <p><strong>Match Day:</strong> Every Saturday</p>
                        <p><strong>Time:</strong> 7:00 PM</p>
                        <p><strong>Venue:</strong> City Stadium</p>
                        <div class="upcoming-matches">
                            <h4>Upcoming Matches</h4>
                            <ul>
                                <li>Sharks vs Pufferfish - Dec 21, 2024</li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="league-schedule">
                        <h3>College League</h3>
                        <p><strong>Match Day:</strong> Every Friday</p>
                        <p><strong>Time:</strong> 6:00 PM</p>
                        <p><strong>Venue:</strong> University Field</p>
                        <div class="upcoming-matches">
                            <h4>Upcoming Matches</h4>
                            <ul>
                                <li>Tigers vs Falcons - Dec 20, 2024</li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="league-schedule">
                        <h3>High School League</h3>
                        <p><strong>Match Day:</strong> Every Thursday</p>
                        <p><strong>Time:</strong> 5:00 PM</p>
                        <p><strong>Venue:</strong> Local High School Grounds</p>
                        <div class="upcoming-matches">
                            <h4>Upcoming Matches</h4>
                            <ul>
                                <li>Bears vs Alligators - Dec 19, 2024</li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="schedule-notes">
                    <h3>Important Notes</h3>
                    <ul>
                        <li>All times are in Mountain Standard Time (MST)</li>
                        <li>Please arrive at least 30 minutes before match time</li>
                        <li>In case of severe weather, check the league website for updates</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    
    function showMediaGallery() {
        content.innerHTML = `
            <h2>Media Gallery</h2>
            <div class="media-container">
                <div class="media-item">
                    <img src="img/soccerscore.jpg" alt="Soccer Score">
                    <p>Exciting goal from the Pro League finals</p>
                </div>
                <div class="media-item">
                    <img src="img/soccerteam.webp" alt="Team Photo">
                    <p>College League champions group photo</p>
                </div>
                <div class="media-item">
                    <img src="img/soccershot.jpg" alt ="Soccer Shot">
                    <p>High School League tournament highlights</p>
                </div>
                
            </div>
        `;
    }
    
    const mediaButton = document.getElementById('mediaButton');
    mediaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showMediaGallery();
    });
    

    const matchesButton = document.getElementById('matchesButton');
    matchesButton.addEventListener('click', (e) => {
        e.preventDefault();
        showMatchesInfo();
    });
    
    
    const newsButton = document.getElementById('newsButton');
    newsButton.addEventListener('click', (e) => {
        e.preventDefault();
        showNewsFeed();
    });
    

    const playersButton = document.getElementById('playersButton');
    playersButton.addEventListener('click', (e) => {
        e.preventDefault();
        showPlayersList();
    });


    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        showHomePage();
    });

    teamRegButton.addEventListener('click', (e) => {
        e.preventDefault();
        showTeamRegistration();
    });

    showHomePage();
});
