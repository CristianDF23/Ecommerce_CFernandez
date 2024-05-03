import { Command } from 'commander'
import dotenv from 'dotenv'

const program = new Command();

export const commandAndDotenvConfig = () => {
    program.option('--mode <mode>', 'Ambiente de trabajo', 'dev')
    program.parse()
    console.log(program.opts());
    dotenv.config({ path: program.opts().mode == 'dev' ? './src/.env.dev' : './src/.env.prod' })
}
