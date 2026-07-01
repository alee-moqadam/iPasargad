import { CaptchaModel } from "@client/shared";

export interface ChangePasswordWithOtp {
    otp: string;
    nationalId: string;
    newPassword: string;
    confirmPassword: string;
    captcha: CaptchaModel;
}
