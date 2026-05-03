
import mongoose from "mongoose";
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const connectDB = async () => {
  try {
    process.stdout.write(chalk.gray('  ⌛ Connecting to MongoDB... '));

    const conn = await mongoose.connect(process.env.MONGO_URI);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    
    console.log(
      `${chalk.bgGreen.black(' MONGO ')} ${chalk.green('✔')} ${chalk.bold('Database Connected Successfully')}`
    );
    
    console.log(
      `${chalk.gray('  └─ Host: ')}${chalk.cyan.italic(conn.connection.host)}\n`
    );

  } catch (error) {
    console.log('\n' + chalk.bgRed.white.bold(' DB ERROR '));
    console.error(chalk.red(`  ✘ Message: ${error.message}`));
    
    process.exit(1);
  }
};

export default connectDB;
