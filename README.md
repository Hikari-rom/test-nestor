# Test technique Chez Nestor

## Description

Il a été réalisé en NestJs et a été effectué en approximativement 20 heures.

## Installation

Il est nécessaire d'avoir Docker pour faire fonctionner les 2 bases de données ( pour l'API et les tests end-to-end )

```bash
$ yarn install
$ docker-compose up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

## Test

```bash
# e2e tests
$ yarn run test:e2e

```

