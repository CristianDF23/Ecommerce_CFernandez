import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('--persist <mode>', 'Modo de persistencia', "fileSystem")
    .option('--mode <mode>', 'Modo de trabajo', 'dev')
program.parse();

//console.log("Options: ", program.opts());
console.log("Environment Mode Option: ", program.opts().mode);
console.log("Persistence Mode Option: ", program.opts().persist);

const environment = program.opts().mode;

dotenv.config({
    path: environment === "prod" ? "./src/config/.env.prod" : "./src/config/.env.dev"
});


export default {
    mode: program.opts().mode,
    port: process.env.PORT,
    mongoUrl: process.env.DB_URL,
    persistence: program.opts().persist,
};