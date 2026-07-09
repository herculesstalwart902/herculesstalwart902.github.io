async function fetchNews() {
    const rssUrl = "https://rss.app/feeds/t0yMjPknbcSjLVy8.xml";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok') {
            const newsContainer = document.getElementById('news-container');
            const now = new Date();
            
            const newsItems = data.items.map(item => {
                const pubDate = new Date(item.pubDate);
                const diffMin = Math.floor((now - pubDate) / 60000);
                const diffHour = Math.floor(diffMin / 60);
                const diffDay = Math.floor(diffHour / 24);

                let timeAgo = "";
                if (diffMin < 60) timeAgo = `${diffMin}m`;
                else if (diffHour < 24) timeAgo = `${diffHour}h`;
                else timeAgo = `${diffDay}d`;

                return `<a href="${item.link}" target="_blank">${item.title} <small>(${timeAgo})</small></a>`;
            }).join(" ••• ");
            
            newsContainer.innerHTML = `<span>${newsItems}</span>`;
        } else {
            console.error("API Error:", data.message);
            document.getElementById('news-container').innerHTML = "<span>News feed format error.</span>";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        document.getElementById('news-container').innerHTML = "<span>Could not load news.</span>";
    }
}

fetchNews();
