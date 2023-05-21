DZ3 INFSUS

## Upute za instalaciju i pokretanje:

Potrebno kreirati .env.local datoteku u korijenskom direktoriju repozitorija (ispod naveden primjer):

```bash
DB_USER=admin
DB_PASSWORD=password
DB_HOST=dpg-chkdk13hp8uej77s49ag-a.frankfurt-postgres.render.com
DB_NAME=sharestory
```

Zatim u konzoli upisati sljedeće naredbe za instalaciju dependencyja i pokretanje web aplikacije

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Upute za pokretanje jediničnih testova:

```bash
yarn test
```

## Upute za pokretanje e2e testova:

```bash
yarn cypress
```

## SQL skripta za kreiranje i punjenje baze nalazi se u korijenskom direktoriju repozitorija (DB_INIT.SQL)
