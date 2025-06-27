const newsItems = [
    {
        title: "Pro League: Sharks Dominate in Season Opener",
        content: "The Sharks, led by coach Michael Thompson, showcased their prowess in a thrilling 3-1 victory against the Pufferfish. Alex Martinez scored a spectacular hat-trick, living up to the team's motto 'Sharkin'!' Coach Thompson praised his team's performance, stating, 'We're here to make waves this season.'",
        date: "2024-12-11"
    },
    {
        title: "College Rivalry Heats Up: Tigers vs Falcons",
        content: "In a nail-biting match, the Tigers, coached by Sarah Rodriguez, narrowly defeated the Falcons 2-1. Emma Wilson's last-minute goal secured the win for the Tigers, embodying their 'Roar!' spirit. Falcons' coach Robert Johnson remains optimistic, saying, 'We'll be swooping in for revenge next time.'",
        date: "2024-12-10"
    },
    {
        title: "High School Showdown: Bears Maul Alligators",
        content: "The Bears, under the guidance of David Chen, lived up to their 'Unblockable!' motto by crushing the Alligators 4-0. Olivia Brown's stellar defense kept the Alligators at bay, while Noah Taylor netted two goals. Alligators' coach Emily Baxter commented, 'We'll bounce back stronger.'",
        date: "2024-12-09"
    },
    {
        title: "Player Spotlight: Charlotte Clark's Rising Star",
        content: "Pufferfish's Charlotte Clark is making waves in the Pro League. Despite her team's recent loss, Clark's impressive performance has caught the eye of several scouts. Coach Amanda Lee praised her, saying, 'Charlotte embodies our 'Got spikes!' attitude perfectly.'",
        date: "2024-12-08"
    },
    {
        title: "Transfer Rumors: College to Pro League?",
        content: "Rumors are swirling about a potential transfer of Mason Jackson from the Falcons to the Sharks. Coach Michael Thompson remained tight-lipped but hinted at 'exciting developments' in the team's future lineup.",
        date: "2024-12-07"
    }
];

function displayNews() {
    const newsFeed = document.getElementById('newsFeed');
    newsItems.forEach(item => {
        const newsItem = `
            <div class="news-item">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <p class="date">Published on: ${item.date}</p>
            </div>
        `;
        newsFeed.innerHTML += newsItem;
    });
}
