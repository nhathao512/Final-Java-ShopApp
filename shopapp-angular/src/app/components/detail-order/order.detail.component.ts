import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../responses/order/order.response';
import { environment } from '../../../environments/environment';
import { OrderDetail } from '../../models/order.detail';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from '../base/base.component';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order.detail.component.html',
  styleUrls: ['./order.detail.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule
  ]
})
export class OrderDetailComponent extends BaseComponent implements OnInit {
  orderId: number = 0;  
  orderResponse: OrderResponse = {
    id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [] // Một mảng rỗng
  };  
    

  ngOnInit(): void {
    this.getOrderDetails();
  }
  
  getOrderDetails(): void {
    // debugger
    this.orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (apiResponse: ApiResponse) => {        
        // debugger;   
        const response = apiResponse.data   
        console.log(response); 
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address; 
        this.orderResponse.note = response.note;
        this.orderResponse.total_money = response.total_money;
        this.orderResponse.order_date = new Date(
          response.order_date[0], 
          response.order_date[1] - 1, 
          response.order_date[2]
        );        
        console.log(response)
        this.orderResponse.order_details = response.order_details
        .map((order_detail: any) => {
          console.log(order_detail)
          if (order_detail.product_name && order_detail.thumbnail) {
            console.log("Yes")
            
            order_detail.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.thumbnail}`;
          } else {
            console.log("No")
            // Xử lý trường hợp product hoặc thumbnail không tồn tại
            order_detail.product = order_detail.product || {};
            order_detail.product.thumbnail = 'default-image-path'; // Đường dẫn hình ảnh mặc định nếu thumbnail không tồn tại
          }
          order_detail.number_of_products = order_detail.number_of_products;
          order_detail.total_money = order_detail.total_money;
          return order_detail;
        });
        this.orderResponse.payment_method = response.payment_method;
        if (response.shipping_date) {
          this.orderResponse.shipping_date = new Date(
            response.shipping_date[0],
            response.shipping_date[1] - 1,
            response.shipping_date[2]
          );
        }
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.status = response.status;
        // debugger
      },
      complete: () => {
        // debugger;        
      },
      error: (error: HttpErrorResponse) => {
        // debugger;
        console.error(error);
      } 
    });
  }
}

