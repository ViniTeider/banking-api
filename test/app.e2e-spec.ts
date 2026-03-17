import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { NotFoundFilter } from '../src/filters/domain-exception-filter';
import { App } from 'supertest/types';

describe('Banking API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new NotFoundFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /reset', async () => {
    await request(app.getHttpServer()).post('/reset').expect(200);
  });

  it('GET /balance — non-existing account returns 404 with body 0', async () => {
    await request(app.getHttpServer())
      .get('/balance?account_id=1234')
      .expect(404)
      .expect('0');
  });

  it('POST /event — deposit creates account with initial balance', async () => {
    await request(app.getHttpServer())
      .post('/event')
      .send({ type: 'deposit', destination: '100', amount: 10 })
      .expect(201)
      .expect({ destination: { id: '100', balance: 10 } });
  });

  it('POST /event — deposit into existing account accumulates balance', async () => {
    await request(app.getHttpServer())
      .post('/event')
      .send({ type: 'deposit', destination: '100', amount: 10 })
      .expect(201)
      .expect({ destination: { id: '100', balance: 20 } });
  });

  it('GET /balance — existing account returns balance', async () => {
    await request(app.getHttpServer())
      .get('/balance?account_id=100')
      .expect(200)
      .expect({ balance: 20 });
  });

  it('POST /event — withdraw from non-existing account returns 404 with body 0', async () => {
    await request(app.getHttpServer())
      .post('/event')
      .send({ type: 'withdraw', origin: '200', amount: 10 })
      .expect(404)
      .expect('0');
  });

  it('POST /event — withdraw from existing account', async () => {
    await request(app.getHttpServer())
      .post('/event')
      .send({ type: 'withdraw', origin: '100', amount: 5 })
      .expect(201)
      .expect({ origin: { id: '100', balance: 15 } });
  });

  it('POST /event — transfer from existing account', async () => {
    await request(app.getHttpServer())
      .post('/event')
      .send({ type: 'transfer', origin: '100', amount: 15, destination: '300' })
      .expect(201)
      .expect({
        origin: { id: '100', balance: 0 },
        destination: { id: '300', balance: 15 },
      });
  });

  it('POST /event — transfer from non-existing account returns 404 with body 0', async () => {
    await request(app.getHttpServer())
      .post('/event')
      .send({ type: 'transfer', origin: '200', amount: 15, destination: '300' })
      .expect(404)
      .expect('0');
  });
});
