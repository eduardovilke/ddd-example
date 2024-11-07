import { EventHandlerInterface } from '../../@shared/interfaces/event-handler.interface'
import CustomerCreatedEvent from '../customer-created.event'

export default class EnviaConsoleLog2Handler implements EventHandlerInterface {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated', event)
  }
}
