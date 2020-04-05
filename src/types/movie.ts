import { Movie } from '../entities';

export interface MovieDataToUpdate {
    id: number;
    title: string;
    minutes: number;
}

export type MovieDataToCreate = Omit<MovieDataToUpdate, 'id'>;

export interface EntityService {
    getAll(): Promise<Movie[]>;
    create(data: MovieDataToCreate): Promise<Movie | undefined>;
    update(data: MovieDataToUpdate): Promise<Movie | undefined>;
    delete(id: number): Promise<Movie | undefined>;
    getById(id: number): Promise<Movie | undefined>;
}
