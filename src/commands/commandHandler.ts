import Command from "./command";

export default class CommandHandler {
  private command: Command | null = null;

  setCommand(command: Command): void {
    this.command = command;
  }

  handleCommand(): void {
    if (this.command) {
      this.command.execute();
    }
    this.command = null;
  }
}
