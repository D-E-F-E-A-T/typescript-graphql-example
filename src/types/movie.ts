export interface IMovieDataToUpdate {
    id: number;
    title: string;
    minutes: number;
}

export type MovieDataToCreate = Omit<IMovieDataToUpdate, 'id'>;
