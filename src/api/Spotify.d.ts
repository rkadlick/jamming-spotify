import { TrackType } from '../types/TrackType' 

declare module 'spotify' {
	const Spotify: {
	  getAccessToken(): string | null;
	  search(term: string): Promise<TrackType[]>;
	  savePlaylist(name: string, trackUris: string[]): Promise<void>;
	  isAuthenticated(): boolean;
	  initiateLogin(): void;
	};
  
	export default Spotify;
  }