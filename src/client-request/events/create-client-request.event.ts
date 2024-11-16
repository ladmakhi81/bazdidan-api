export class CreateClientRequestEvent {
  constructor(
    public advertisingHomeId: number,
    public requestId: number,
  ) {}
}
