import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../responses/user/user.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from '../../base/base.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user.admin',    
  templateUrl: './user.admin.component.html',
  styleUrl: './user.admin.component.scss',
  standalone: true,
  imports: [   
    CommonModule,
    FormsModule,
  ]
})
export class UserAdminComponent extends BaseComponent implements OnInit{  
  route = inject(ActivatedRoute);
  
  users: UserResponse[] = [];        
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages:number = 0;
  visiblePages: number[] = [];
  keyword:string = "";
  localStorage?:Storage;
  
  constructor(){
    super()
    this.localStorage = document.defaultView?.localStorage;
  }
  ngOnInit(): void {
    this.currentPage = Number(this.localStorage?.getItem('currentUserAdminPage')) || 0;
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }
  
  searchUsers() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.getUsers(this.keyword.trim(), this.currentPage, this.itemsPerPage);
  }
  
  getUsers(keyword: string, page: number, limit: number) {
    this.userService.getUsers({ keyword, page, limit }).subscribe({      
      next: (apiResponse: ApiResponse) => {        
        debugger
        const response = apiResponse.data
        this.users = response.users;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        // Handle complete event
        debugger
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      } 
    });
  }
  
  onPageChange(page: number) {
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentUserAdminPage', String(this.currentPage));
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }         
    // Hàm xử lý sự kiện khi thêm mới sản phẩm
    insertUser() {
      debugger
      // Điều hướng đến trang detail-user với userId là tham số
      this.router.navigate(['/admin/users/insert']);
    } 

    // Hàm xử lý sự kiện khi sản phẩm được bấm vào
    updateUser(userId: number) {
      debugger
      // Điều hướng đến trang detail-user với userId là tham số
      this.router.navigate(['/admin/users/update', userId]);
    }  
    resetPassword(userId: number) {
      // Hiển thị popup xác nhận trước khi đặt lại mật khẩu
      // Swal.fire({
      //   title: 'Xác nhận đặt lại mật khẩu',
      //   text: 'Bạn có chắc chắn muốn đặt lại mật khẩu cho người dùng này không?',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#d33',
      //   cancelButtonColor: '#3085d6',
      //   confirmButtonText: 'Đúng, đặt lại!',
      //   cancelButtonText: 'Hủy'
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     // Gọi API để đặt lại mật khẩu nếu người dùng xác nhận
      //     this.userService.resetPassword(userId).subscribe({
      //       next: (apiResponse: ApiResponse) => {
      //         // Hiển thị mật khẩu mới từ phản hồi API
      //         const newPassword = apiResponse.data;
      //         Swal.fire({
      //           icon: 'success',
      //           title: 'Thành công',
      //           html: `Mật khẩu đã được đặt lại thành công. <br><strong>Mật khẩu mới:</strong> ${newPassword}`,
      //         });
      //       },
      //       error: (error: HttpErrorResponse) => {
      //         console.error(error?.error?.message ?? '');
      //         Swal.fire({
      //           icon: 'error',
      //           title: 'Lỗi',
      //           text: 'Đặt lại mật khẩu không thành công, vui lòng thử lại.',
      //         });
      //       }
      //     });
      //   }
      // });
    }
    
  
    toggleUserStatus(user: UserResponse) {
      if (user.is_active) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Are you sure you want to block this user?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, block user!',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            const params = {
              userId: user.id,
              enable: !user.is_active
            };
    
            this.userService.toggleUserStatus(params).subscribe({
              next: (response: any) => {
                Swal.fire('Blocked!', 'The user has been blocked.', 'success');
                location.reload();
              },
              error: (error: HttpErrorResponse) => {
                console.error(error?.error?.message ?? '');
                Swal.fire('Error', 'Failed to block the user.', 'error');
              }
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Are you sure you want to enable this user?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#28a745',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, enable user!',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            const params = {
              userId: user.id,
              enable: !user.is_active
            };
    
            this.userService.toggleUserStatus(params).subscribe({
              next: (response: any) => {
                Swal.fire('Enabled!', 'The user has been enabled.', 'success');
                location.reload();
              },
              error: (error: HttpErrorResponse) => {
                console.error(error?.error?.message ?? '');
                Swal.fire('Error', 'Failed to enable the user.', 'error');
              }
            });
          }
        });
      }
    }
    
}
