import { CaptchaModel } from "@client/shared";

export interface ForgetPasswordModel {
    nationalId: string;
    captcha: CaptchaModel;
}

