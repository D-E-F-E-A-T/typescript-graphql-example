import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class MovieOptions {
    @Field()
    title: string;

    @Field(() => Int)
    minutes: number;
}

@InputType()
export class MovieUpdateOptions {
    @Field()
    title?: string;

    @Field(() => Int, { nullable: true })
    minutes?: number;
}

@InputType()
export class DirectorOptions {
    @Field()
    name: string;

    @Field(() => Int)
    age: number;
}
