import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { OrderToCreate } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';
import { firstValueFrom } from 'rxjs';
import { Address } from 'src/app/shared/models/user';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper;
  @Input() checkoutForm?: FormGroup

  constructor(private basketService: BasketService, 
    private toastr: ToastrService,private checkoutService: CheckoutService
    , private router: Router) {}

 

  async submitOrder() {
    debugger
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    try {
      const createdOrder = await this.createOrder(basket);
      this.basketService.deleteBasket(basket);
      const navigationExtras: NavigationExtras = {state: createdOrder};
      this.router.navigate(['checkout/success'], navigationExtras);
    } catch (error: any) {
      console.log(error);
      this.toastr.error(error.message)
    } 
  }

  private async createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const orderToCreate = this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
    if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }

}
