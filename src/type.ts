export interface Image {
    id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
    description: string;
    likes: number;
    user: {
      location: string;
      name: string }
  
  }