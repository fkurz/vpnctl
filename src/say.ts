import { Command } from "commander";

export default (): Command =>
  new Command()
    .name("say")
    .description("Say the word passed as the first argument")
    .argument("<word>")
    .action((word: string) => console.log(word));
