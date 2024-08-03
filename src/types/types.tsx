export interface MovieCardType {
    title: string;
    portraitImgUrl: string;
    landscapeImgUrl: string;
    _id: string;
    rating: number;
    genre: string[];
    description: string;
    duration: number;
    cast: CelebrityCardType[];
    crew: CelebrityCardType[];

}

export interface CelebrityCardType{
    name: string;
    imageUrl: string;
    _id: string;
    role: string;
}


export interface Screen {
    _id?: string; 
    name: string;
    location: string;
    seats?: { row: string; col: number }[];
  }



  export interface Booking {
    _id?: string;
    showTime: string;
    showDate: Date;
    movieId: string;
    screenId: string;
    seats: {
      row: string;
      col: number;
      seat_id: string;
      price: number;
    }[];
    totalPrice: number;
    paymentId: string;
    paymentType: string;
    userId: string;
  }
  