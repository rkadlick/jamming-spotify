const clientId: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Insert client ID here.
const redirectUri: string = import.meta.env.VITE_SPOTIFY_REDIRECT_URL; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken: string | null = null;

interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

interface SpotifyApiTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
  uri: string;
}

const Spotify = {
  getAccessToken(): string | null {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = null), expiresIn * 1000);
      window.history.pushState('Access Token', '', '/'); // Clears the parameters, allowing a new token to be grabbed when it expires.
      return accessToken;
    }

    return null;
  },

  async search(term: string): Promise<SpotifyTrack[]> {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      throw new Error("Access token is missing.");
    }

    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) {
      return [];
    }

    return jsonResponse.tracks.items.map((track: SpotifyApiTrack) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async savePlaylist(name: string, trackUris: string[]): Promise<void> {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = this.getAccessToken();
    if (!accessToken) {
      throw new Error("Access token is missing.");
    }

    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch('https://api.spotify.com/v1/me', { headers });
    const jsonResponse = await response.json();

    const userId = jsonResponse.id;

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    const playlistJson = await playlistResponse.json();
    const playlistId = playlistJson.id;

    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ uris: trackUris }),
    });
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  initiateLogin(): void {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  },
};

export default Spotify;
