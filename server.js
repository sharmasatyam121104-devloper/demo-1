
import connectDB from "./src/config/db.js";
connectDB();

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import chalk from 'chalk'; 
import boxen from 'boxen';

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to MyProject API',
    timestamp: new Date(),
    status: 'Server is running'
  });
});

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  const isDev = ENV.toLowerCase() === 'dev' || ENV.toLowerCase() === 'development';
  const envLabel = isDev ? ' DEVELOPMENT ' : ' PRODUCTION ';

  const message = [
    `${chalk.white('Server is up and running!')}`,
    '',
    `${chalk.gray('Mode:    ')} ${isDev ? chalk.bgYellow.black(envLabel) : chalk.bgMagenta.white(envLabel)}`,
    `${chalk.gray('Port:    ')} ${chalk.cyan(PORT)}`,
    `${chalk.gray('Local:   ')} ${chalk.blue.underline(`http://localhost:${PORT}`)}`,
    '',
    `${chalk.dim('Logs are being recorded...')}`
  ].join('\n');

  const boxOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: isDev ? 'yellow' : 'magenta',
    title: chalk.greenBright(' ⚡ Your Project '),
    titleAlignment: 'center'
  };

  console.log(boxen(message, boxOptions));
});
