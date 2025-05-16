// Fetch all HTML files from the GitHub repo
async function fetchHtmlFiles() {
    // Adjust the owner/repo/branch as needed
    const apiUrl = "https://api.github.com/repos/GipsonTheDev/GamesGamesGames/git/trees/main?recursive=1";
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Filter for .html files only
    const htmlFiles = data.tree.filter(file => file.path.endsWith('.html'));
    return htmlFiles;
}
