import path from 'path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import routes from './core/rest';
import passport from './core/passport';

import { RATE_LIMIT } from './env';
import { loadDb } from './shared/loadDb';
import { authenticate } from './shared/authenticate';

const app = express();
const swaggerDocument = YAML.load(path.resolve('./src/config/swagger.yaml'));

app.use(helmet());
app.use(cors());
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }));
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(loadDb);
app.use(authenticate);

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;
