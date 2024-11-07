import { EventHandlerInterface } from '../../@shared/interfaces/event-handler.interface'
import CustomerCreatedEvent from '../customer-created.event'

export default class EnviaConsoleLog1Handler implements EventHandlerInterface {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated', event)
  }
}
