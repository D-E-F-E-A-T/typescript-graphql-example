# Typescript Graphql Example

This example demonstrate how to use graphql in typescript

## Prerequisites

You will need a Redis database running.

## Getting Started

```bash
git clone https://github.com/arastu/typescript-graphql-example.git
cd typescript-graphql-example
npm install
npm run start
```

Visit http://localhost:4000/graphql

## Structure

```
├── README.md
├── database.sqlite
├── ormconfig.js
├── package-lock.json
├── package.json
├── prettier.config.js
├── src
│ ├── entity
│ │ ├── Director.ts
│ │ ├── Movie.ts
│ │ └── User.ts
│ ├── graphql-types
│ │ ├── AuthInput.ts
│ │ ├── FieldError.ts
│ │ ├── MovieInput.ts
│ │ ├── MovieResponse.ts
│ │ ├── MyContext.ts
│ │ └── UserResponse.ts
│ ├── index.ts
│ ├── middleware
│ │ └── isAuth.ts
│ └── resolvers
│ ├── AuthResolver.ts
│ └── MovieResolver.ts
└── tsconfig.json
```

src/index.ts is entypoint of app.

## Graphql
### Queries

you must loged in before run queries
```gql
query {
  movies {
    id
    title
    minutes
    director {
      name
      age
    }
  }
}

query {
  me {
    id,
    email
  }
}
```

### Mutations

```gql
mutation {
  register(input: { email: "jo@google.com", password: "123qwe" }) {
    user {
      id
      email
    }
    errors {
      path
      message
    }
  }
}

mutation {
  login(input: { email: "jo@google.com", password: "123qwe" }) {
    user {
      id
      email
    }
    errors {
      path
      message
    }
  }
}

mutation {
  logout
}

mutation {
  createMovie(
    director: {
      name: "david",
      age: 52
    }
    movie: {
      title: "mio mio",
      minutes: 120
    }
  ) {
    id
    title
    director {
      name
    }
  }
}
```


