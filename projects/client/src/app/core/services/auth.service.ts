import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { IdentityService, ProfileManagementService } from '@client/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private identityService: IdentityService, private router: Router, private modalService: NgbModal,
        private toastservice: ToastService,private profileManagementService: ProfileManagementService) { }

    logout() {

        this.identityService.logout().subscribe(res => {
            this.modalService.dismissAll()
            localStorage.removeItem('sejam-status');
            localStorage.removeItem('step');
            localStorage.removeItem('inquiry-api-called');
            this.toastservice.toasts = []
            this.profileManagementService.clean()
            this.router.navigate(['/auth/login'], {
                replaceUrl: true
            })
        })
    }

}