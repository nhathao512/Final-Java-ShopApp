import { Component, OnInit, inject } from '@angular/core';
import { Category } from '../../../models/category';
import { ApiResponse } from '../../../responses/api.response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from '../../base/base.component';
import Swal from 'sweetalert2'; // Import SweetAlert2 for popups

@Component({
  selector: 'app-category-admin',
  templateUrl: './category.admin.component.html',
  styleUrls: [
    './category.admin.component.scss',        
  ],
  standalone: true,
  imports: [   
    CommonModule,
    FormsModule,
  ]
})
export class CategoryAdminComponent extends BaseComponent implements OnInit {
  categories: Category[] = []; // Dữ liệu động từ categoryService

  ngOnInit() {
    this.getCategories(0, 100);
  }

  // Fetch categories with SweetAlert2 success/error feedback
   // Hàm gọi API để lấy danh sách category
   getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (apiResponse: ApiResponse) => {
        this.categories = apiResponse.data;

        // Sau khi lấy dữ liệu, sắp xếp danh mục theo thứ tự ID từ thấp đến cao
        this.sortCategories();
      },
    
      error: (error: HttpErrorResponse) => {
        // Hiển thị thông báo lỗi khi không thể tải danh mục
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to load catalog, please try again.',
        });
        console.error(error?.error?.message ?? '');
      }
    });
  }

  // Hàm để sắp xếp danh mục theo ID từ thấp đến cao
  sortCategories() {
    this.categories.sort((a, b) => a.id - b.id);  // Sắp xếp theo ID từ thấp đến cao
  }

  // Navigate to insert category page with SweetAlert2 info popup
  insertCategory() {
    this.router.navigate(['/admin/categories/insert']).then(() => {
    });
  }

  // Navigate to update category page with SweetAlert2 info popup
  updateCategory(categoryId: number) {
    this.router.navigate(['/admin/categories/update', categoryId]).then(() => {
    });
  }

  // Confirm and delete category with SweetAlert2 confirmation dialog
  deleteCategory(category: Category) {
    Swal.fire({
      title: 'Are you sure you want to delete this category?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category.id).subscribe({
          next: (apiResponse: ApiResponse) => {
            // Success notification after deleting the category
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'The category has been successfully deleted.',
            }).then(() => {
              location.reload(); // Reload page to reflect the changes
            });
          },
          error: (error: HttpErrorResponse) => {
            // Error notification for failed deletion
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Category deletion failed, please try again.',
            });
            console.error(error?.error?.message ?? '');
          }
        });
      }
    });
  }
}
