config 모듈를 정의하여 환경변수를 불러올 때 사용한다.(process.env 대신!)

### .env 파일에 환경변수를 정의하고, config 모듈에서 configService 를 불러와서 app.module.ts 파일에

```js
imports: [
  ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
  }),
],
```

형태로 넣으면 환경 변수를 사용할 수 있다.

### 또는 별도의 파일에서 불러와서 사용할 수도 있다.

```js
export default () => ({
  app: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
```

위에 처럼 configuration이라는 파일에 정의하고

```js
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
  ],
```

에 넣으면 app.module.ts 파일이 configuration 내용을 읽을 수 있고

configService를 통해 해당 값을 접근할 수 있다.

### configService 대신 더 안전하게 할 수 있는 방법이 있는데 configType을 사용하면 된다.

우선 configuration을 별도로 분리한다.

```js
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
}));
```

```js
import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}));
```
